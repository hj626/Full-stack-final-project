import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 리뷰 데이터 (나중에 API로 교체하면 됨)
const reviews = [
    {
        id: 1,
        user: "홍길동",
        avatar: "img/testimonial-1.jpg",
        seller: "강원배추농가",
        product: "강원도 고산지대 배추 5kg",
        rating: 5,
        date: "2025-01-10",
        content: "배송이 정말 빠르고 신선도가 좋아요! 다음에도 다시 구매하고 싶어요."
    },
    {
        id: 2,
        user: "김유정",
        avatar: "img/testimonial-2.jpg",
        seller: "제주감귤농가",
        product: "제주 친환경 감귤 3kg",
        rating: 4,
        date: "2025-01-08",
        content: "유기농 인증 제품이라 믿고 먹을 수 있었습니다. 품질도 훌륭해요."
    },
    {
        id: 3,
        user: "이지훈",
        avatar: "img/testimonial-3.jpg",
        seller: "전라쌀농가",
        product: "전라도 유기농 쌀 10kg",
        rating: 5,
        date: "2025-01-05",
        content: "직접 재배한 싱싱한 농산물이라 그런지 맛이 기가 막힙니다."
    },
    {
        id: 4,
        user: "박수민",
        avatar: "img/testimonial-4.jpg",
        seller: "충청고구마농가",
        product: "충청 꿀고구마 3kg",
        rating: 3,
        date: "2024-12-29",
        content: "친절한 판매자님 덕분에 기분 좋게 거래했어요. 추천합니다!"
    },
];

// 별점 출력 함수
const renderStars = (count) => (
    <div>
        {Array.from({ length: 5 }).map((_, i) => (
            <span
                key={i}
                style={{
                    color: i < count ? "#FFD700" : "#ddd",
                    fontSize: "20px",
                    marginRight: "3px"
                }}
            >
                ★
            </span>
        ))}
    </div>
);

const Testimonial = () => {
    return (
        <div>
            <Navbar />

            {/* Page Header */}
            <div className="container-fluid page-header wow fadeIn" data-wow-delay="0.1s">
                <div className="container">
                    <h1 className="display-3 mb-3 animated slideInDown" style={{marginRight:'300px'}}>고객 리뷰</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a className="text-body" href="/">홈페이지</a></li>
                            <li className="breadcrumb-item"><a className="text-body" href="#">판매정보</a></li>
                            <li className="breadcrumb-item text-dark active" aria-current="page">고객 리뷰</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Review Area */}
            <div className="container py-6">
                <div
                    className="section-header text-center mx-auto mb-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                    style={{ maxWidth: "500px" }}
                >
                    <h1 className="display-5 mb-3">구매자 리뷰</h1>
                    <p>실제 고객들의 구매 후기와 평가입니다.</p>
                </div>

                <div className="row g-4">
                    {reviews.map((review, idx) => (
                        <div
                            key={review.id}
                            className="col-lg-6 col-md-12 wow fadeInUp"
                            data-wow-delay={`${0.1 * (idx + 1)}s`}
                        >
                            <div className="bg-white p-4 rounded shadow-sm h-100 position-relative">

                                {/* ⭐ 오른쪽 상단 별점 */}
                                <div
                                    className="position-absolute"
                                    style={{ top: "20px", right: "20px" }}
                                >
                                    {renderStars(review.rating)}
                                </div>

                                {/* 고객 정보 */}
                                <div className="d-flex align-items-center mb-3">
                                    <img
                                        src={review.avatar}
                                        alt={review.user}
                                        className="rounded-circle"
                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                    />
                                    <div className="ms-3">
                                        <h5 className="mb-1">{review.user}</h5>
                                        <small className="text-muted">{review.date}</small>
                                    </div>
                                </div>

                                {/* 리뷰 내용 (가운데 정렬) */}
                                <p className="text-center my-4">{review.content}</p>

                                {/* 판매자 & 상품 (아래 정렬) */}
                                <div className="mt-3"
                                    style={{textAlign: 'left'}}>
                                    <p className="mb-1"><strong>판매자 &nbsp;&nbsp;&nbsp;&nbsp;</strong> {review.seller}</p>
                                    <p className="mb-0"><strong>구매상품 &nbsp;</strong> {review.product}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>     
            </div>

            <Footer />

            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top">
                <i className="bi bi-arrow-up"></i>
            </a>
        </div>
    );
};

export default Testimonial;
