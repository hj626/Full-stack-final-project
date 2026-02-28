// src/pages/ProductDetailPage.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import "../css/productDetailPage.scss";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

/* 설정 */
const API_BASE = "http://localhost:8080"; // 필요 시 변경
const MOCK_PRODUCT = {
  id: "691bcac29ae55329a780219a",
  name: "테스트 사과 (샘플)",
  price: 12310,
  unit: "kg",
  origin: "한국",
  originDetail: "경기도 ○○농장",
  farmingType: "유기농",
  harvestDate: "2025-10-31",
  expirationDate: "2025-11-26",
  description:
    "신선한 사과입니다. 달고 아삭한 맛이 특징이며, 샘플 설명 텍스트입니다.",
  images: [
    "https://picsum.photos/1200/900?random=1",
    "https://picsum.photos/1200/900?random=2",
    "https://picsum.photos/1200/900?random=3",
    "https://picsum.photos/1200/900?random=4",
  ],
  discountRate: 13,
  storageMethod: "서늘한 곳 보관",
  stock: 123,
  tags: ["과일", "제철", "유기농"],
  shippingConditions: "샛별배송/택배배송 가능",
  sellerName: "테스트 판매자",
};

/* 유틸 */
const formatPrice = (v) => (typeof v === "number" ? `${v.toLocaleString()}원` : v);

/* 라이트박스(간단) */
function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    <div className="pd-lightbox" onClick={onClose}>
      <div className="pd-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="lightbox" />
        <button className="pd-lightbox-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {

    const leftRef = useRef(null);
    const stickyRef = useRef(null);

  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const fadeTimerRef = useRef(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const adjustStickyHeight = () => {
        if(leftRef.current && stickyRef.current) {
            stickyRef.current.style.minHeight = `${leftRef.current.offsetHeight}px`;
        }
    };

    adjustStickyHeight();
    window.addEventListener("resize", adjustStickyHeight);

    return () => window.removeEventListener("resize", adjustStickyHeight);
  },[product])

  // 리뷰: 각 리뷰에 pics 배열 허용
  const [reviews, setReviews] = useState([
    { id: "r1", author: "사용자A", rating: 5, content: "정말 맛있어요!", pics: [], createdAt: "2025-11-17" },
    { id: "r2", author: "사용자B", rating: 4, content: "신선합니다.", pics: [], createdAt: "2025-11-15" },
  ]);
  const [reviewSort, setReviewSort] = useState("recent");
  const [newReview, setNewReview] = useState({ author: "", rating: 5, content: "", pics: [] });

  // 리뷰 이미지 업로드(프론트 모킹)
  const reviewFileInputRef = useRef(null);

  // QnA
  const [qnas, setQnas] = useState([
    { id: "q1", author: "고객1", question: "포장상태는 어떤가요?", answer: "완충 포장으로 발송됩니다.", createdAt: "2025-11-10" },
  ]);
  const [related, setRelated] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  /* 데이터 로드 */
  useEffect(() => {
    if (!productId) {
      setProduct(MOCK_PRODUCT);
      setRelated(makeRelatedMock(MOCK_PRODUCT));
      return;
    }
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products/detail/${productId}`);
        setProduct(res.data || MOCK_PRODUCT);
        setRelated(makeRelatedMock(res.data || MOCK_PRODUCT));
      } catch (err) {
        console.warn("상품 API 호출 실패, mock 사용:", err?.message || err);
        setProduct(MOCK_PRODUCT);
        setRelated(makeRelatedMock(MOCK_PRODUCT));
      }
    };
    fetchProduct();
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [productId]);

  const totalPrice = product ? product.price * quantity : 0;

  /* 이미지 페이드 전환: 인덱스 바꿀 때 트리거 */
  const showImageIndex = (idx) => {
    if (idx === mainIndex) return;
    setMainIndex(idx);
  };

  /* 수량 */
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));

  /* 리뷰: 이미지 선택(프론트 미리보기) */
  const onReviewFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setNewReview((prev) => ({ ...prev, pics: [...(prev.pics || []), ...urls] }));
    // reset input to allow same file reselect
    e.target.value = "";
  };

  const removeNewReviewPic = (idx) => {
    setNewReview((prev) => {
      const copy = { ...prev, pics: prev.pics.filter((_, i) => i !== idx) };
      return copy;
    });
  };

  const submitReview = () => {
    if (!newReview.author || !newReview.content) {
      alert("작성자와 내용은 필수입니다.");
      return;
    }
    const id = `r${Date.now()}`;
    const createdAt = new Date().toISOString();
    // pics는 로컬 URL들로 서브미션
    const payload = {
      id,
      author: newReview.author,
      rating: newReview.rating,
      content: newReview.content,
      pics: (newReview.pics || []).map((p) => p.url),
      createdAt,
    };
    setReviews((prev) => [payload, ...prev]);
    setNewReview({ author: "", rating: 5, content: "", pics: [] });
  };

  /* QnA 작성 */
  const addQna = (author, question) => {
    const id = `q${Date.now()}`;
    setQnas((prev) => [{ id, author, question, answer: null, createdAt: new Date().toISOString() }, ...prev]);
  };

  /* 관련상품 클릭 -> 상세 페이지 이동 */
  const onRelatedClick = (id) => {
    // navigate to product detail route
    navigate(`/products/detail/${id}`);
    // 스크롤 상단으로
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* 리뷰 정렬 */
  const sortedReviews = useMemo(() => {
    const copy = [...reviews];
    if (reviewSort === "recent") {
      return copy.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
    }
    if (reviewSort === "high") return copy.sort((a, b) => b.rating - a.rating);
    if (reviewSort === "low") return copy.sort((a, b) => a.rating - b.rating);
    return copy;
  }, [reviews, reviewSort]);

  const getDiscountedPrice = (price, discountRate) => {
    if(!discountRate) return price;
    return Math.round(price * (100 - discountRate) / 100);
  };

  if (!product) return <div className="pd-loading">Loading...</div>;

  return (
    <div className="pd-page-wrapper">
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <div className="pd-container">
        {/* TOP */}
        <div className="pd-top">
          {/* LEFT */}
          <div className="pd-left" ref={leftRef}>
            <div className={`pd-main-image ${isFading ? "fading" : "visible"}`}>
              <button className="pd-img-prev" onClick={() => showImageIndex((mainIndex - 1 + product.images.length) % product.images.length)}>‹</button>  
              <img src={product.images?.[mainIndex]} alt={product.name} onClick={() => setLightboxSrc(product.images?.[mainIndex])} />
              <button className="pd-img-next" onClick={() => showImageIndex((mainIndex + 1) % product.images.length)}>›</button>
            </div>

            <div className="pd-thumb-row">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  className={`pd-thumb ${idx === mainIndex ? "active" : ""}`}
                  onClick={() => showImageIndex(idx)}
                >
                  <img src={img} alt={`thumb-${idx}`} />
                </button>
              ))}
            </div>

            {/* 요약 */}
            <div className="pd-short-desc">
              <h3>상품 요약</h3>
              <p>{product.description}</p>
            </div>
          </div>

          {/* RIGHT sticky */}
          <aside className="pd-right">
            <div className="pd-sticky" ref={stickyRef}>
              <div className="pd-title">{product.name}</div>

              <div className="pd-price-row">
                {product.discountRate ? (
                    <>
                    
                    <div className="pd-discount">{product.discountRate}%</div>
                    <div className="pd-price">{formatPrice(getDiscountedPrice(product.price, product.discountRate))}
                        <div className="pd-price-old">{formatPrice(product.price)}</div>
                    </div>
                    
                    </>
                ) : (
                    <div className="pd-price">{formatPrice(product.price)}</div>
                )}
              </div>

              <div className="pd-seller">
                <span className="label">판매자</span> {product.sellerName || "판매자 정보 없음"}
              </div>

              <div className="pd-info">
                <div><span>원산지</span> {product.origin}</div>
                <div><span>유통기한</span> {product.expirationDate}</div>
                <div><span>보관방법</span> {product.storageMethod}</div>
              </div>

              <div className="pd-option">
                <label>단위</label>
                <select defaultValue={product.unit}>
                  <option value={product.unit}>{product.unit}</option>
                </select>
              </div>

              <div className="pd-quantity">
                <span>수량</span>
                <div className="pd-counter">
                  <button onClick={decrease}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increase}>+</button>
                </div>
              </div>

              <div className="pd-total">
                <span>총 상품금액</span>
                <strong>{formatPrice(getDiscountedPrice(product.price, product.discountRate)*quantity)}</strong>
              </div>

              <div className="pd-buttons">
                <button className="btn-buy">구매하기</button>
                <button className="btn-cart">장바구니</button>
              </div>

              <div className="pd-delivery-summary">
                <div className="badge">샛별배송</div>
                <div>오늘 주문 시 도착 가능 / 일부 지역 제외</div>
              </div>
            </div>
          </aside>
        </div>
        <br/>

        {/* MID */}
        <div className="pd-mid">
          <section className="pd-delivery">
            <h4>배송 안내</h4>
            <div className="pd-delivery-item"><strong>샛별배송</strong> : 오전 7시 이전 주문 시 오늘 도착 (일부 지역 제외)</div>
            <div className="pd-delivery-item"><strong>택배배송</strong> : 기본 3,000원 (40,000원 이상 무료)</div>
            <div className="pd-delivery-item">{product.shippingConditions}</div>
          </section>

          <section className="pd-essential">
            <h4>상품 필수 정보</h4>
            <table>
              <tbody>
                <tr><th>제품명</th><td>{product.name}</td></tr>
                <tr><th>원산지</th><td>{product.origin}</td></tr>
                <tr><th>유통기한</th><td>{product.expirationDate}</td></tr>
                <tr><th>보관방법</th><td>{product.storageMethod}</td></tr>
                <tr><th>판매자</th><td>{product.sellerName}</td></tr>
              </tbody>
            </table>
          </section>

          <section className="pd-price-history">
            <h4>가격 변동 안내</h4>
            <p>최근 1개월 최저가: <strong>11,000원</strong> · 현재가: <strong>{formatPrice(product.price)}</strong></p>
          </section>

          <section className="pd-checkpoints">
            <h4>구매 전 확인사항</h4>
            <div className="pd-checkpoint">냉장상품은 새벽배송/샛별배송이 우선입니다.</div>
            <div className="pd-checkpoint">자연산 특성상 약간의 크기/색차가 있을 수 있습니다.</div>
            <div className="pd-checkpoint">신선상품은 반품 규정이 다를 수 있으니 유의하세요.</div>
          </section>
        </div>

        {/* 리뷰 */}
        <div className="pd-reviews">
          <div className="pd-section-head">
            <h4>리뷰 ({reviews.length})</h4>
            <div className="pd-review-controls">
              <select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)}>
                <option value="recent">최신순</option>
                <option value="high">평점 높은순</option>
                <option value="low">평점 낮은순</option>
              </select>
            </div>
          </div>

          <div className="pd-review-write">
            <input placeholder="작성자" value={newReview.author} onChange={(e) => setNewReview({ ...newReview, author: e.target.value })} />
            <textarea placeholder="리뷰를 작성하세요." value={newReview.content} onChange={(e) => setNewReview({ ...newReview, content: e.target.value })} />
            <div className="pd-review-tools">
              <label className="pd-file-label">
                사진업로드
                <input ref={reviewFileInputRef} type="file" accept="image/*" multiple onChange={onReviewFiles} />
              </label>
              <div className="pd-upload-preview">
                {(newReview.pics || []).map((p, i) => (
                  <div key={i} className="pd-upload-thumb">
                    <img src={p.url} alt={`up-${i}`} />
                    <button onClick={() => removeNewReviewPic(i)}>✕</button>
                  </div>
                ))}
              </div>
              <div className="pd-review-actions">
                <button onClick={submitReview}>리뷰 등록 (모킹)</button>
              </div>
            </div>
          </div>

          <div className="pd-review-list">
            {sortedReviews.map((r) => (
              <div key={r.id} className="pd-review-item">
                <div className="pd-review-meta">
                  <strong>{r.author}</strong>
                  <span className="pd-rating">★ {r.rating}</span>
                  <span className="pd-date">{r.createdAt?.slice(0, 10)}</span>
                </div>
                <div className="pd-review-content">{r.content}</div>
                {r.pics?.length > 0 && (
                  <div className="pd-review-pics">
                    {r.pics.map((u, idx) => (
                      <img key={idx} src={u} alt={`rev-${idx}`} onClick={() => setLightboxSrc(u)} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 연관상품 */}
        <div className="pd-related">
          <h4>함께 보면 좋은 상품</h4>
          <div className="pd-related-row">
            {related.map((p) => (
              <div key={p.id} className="pd-related-card" onClick={() => onRelatedClick(p.id)}>
                <img src={p.images?.[0]} alt={p.name} />
                <div className="r-info">
                  <div className="r-name">{p.name}</div>
                  <div className="r-price">{formatPrice(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QnA */}
        <div className="pd-qna">
          <div className="pd-section-head"><h4>상품 문의</h4></div>
          <div className="pd-qna-write">
            <QnaForm onAdd={addQna} />
          </div>
          <div className="pd-qna-list">
            {qnas.map((q) => (
              <div key={q.id} className="pd-qna-item">
                <div className="q-left">
                  <div className="q-author">{q.author}</div>
                  <div className="q-question">{q.question}</div>
                </div>
                <div className="q-right">
                  <div className="q-answer">{q.answer || <em>아직 답변이 없습니다.</em>}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 상세 이미지 그리드 */}
        <div className="pd-detail-images">
          <h4>상세 이미지</h4>
          <div className="pd-detail-img-grid">
            {product.images?.map((src, idx) => (
              <div key={idx} className="pd-detail-img" onClick={() => setLightboxSrc(src)}>
                <img src={src} alt={`detail-${idx}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* QnA 폼 컴포넌트 */
function QnaForm({ onAdd }) {
  const [author, setAuthor] = useState("");
  const [question, setQuestion] = useState("");
  const submit = () => {
    if (!author || !question) return alert("작성자/문의 내용을 입력하세요.");
    onAdd(author, question);
    setAuthor("");
    setQuestion("");
  };
  return (
    <div className="qna-form">
      <input placeholder="이름" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <textarea placeholder="문의 내용을 입력하세요." value={question} onChange={(e) => setQuestion(e.target.value)} />
      <div className="qna-form-actions">
        <button onClick={submit}>문의등록</button>
      </div>
    </div>
  );
}

/* 연관상품 모킹 */
function makeRelatedMock(product) {
  if (!product) return [];
  return new Array(8).fill(0).map((_, i) => ({
    id: `${product.id}-rel-${i}`,
    name: `${product.name} - 추천 ${i + 1}`,
    price: Math.round(product.price * (0.6 + Math.random() * 0.8)),
    images: [`https://picsum.photos/300/300?random=${i + 10}`],
  }));
}
