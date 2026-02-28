import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import '../css/sellerProductForm.scss';
import BacktoTop from '../components/BacktoTop';
import GotoBack from '../components/GotoBack';

const categories = ["과일", "채소", "곡류", "기타"];
const farmingTypes = ["관행재배", "유기농", "무농약", "수경재배", "기타"];
const DRAFT_KEY = "sellerProductDraft";

function formatKoreanWon(num) {
    if(!num) return "";

    const clean = num.toString().replace(/\D/g, "");
    if(!clean) return "";
    if (clean.length > 16) return "최대 999조까지 입력 가능";

    const bigUnits = ["", "만", "억", "조"];
    const parts = [];
    let groupIdx = 0;

    for (let i = clean.length; i > 0; i -= 4) {
        const chunk = clean.substring(Math.max(i - 4, 0), i);
        const numericChunk = parseInt(chunk, 10);
        if (numericChunk) {
            parts.unshift(`${numericChunk}${bigUnits[groupIdx]}`);
        }
        groupIdx++;
    }

    return parts.length ? parts.join(" ") + "원" : "0원";
}

const SellerProductForm = () => {
    // 상품 기본 정보
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [priceDisplay, setPriceDisplay] = useState(""); 
    const [stock, setStock] = useState("");
    const [unit, setUnit] = useState("kg");
    const [origin, setOrigin] = useState("");
    const [originDetail, setOriginDetail] = useState("");
    const [farmingType, setFarmingType] = useState("");
    const [harvestDate, setHarvestDate] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [storageMethod, setStorageMethod] = useState("");
    const [shippingConditions, setShippingConditions] = useState("");
    const [discountRate, setDiscountRate] = useState("");
    const [discountStart, setDiscountStart] = useState("");
    const [discountEnd, setDiscountEnd] = useState("");
    const [bulkMinQuantity, setBulkMinQuantity] = useState("");
    const [bulkDiscountRate, setBulkDiscountRate] = useState("");
    const [stockWarningThreshold, setStockWarningThreshold] = useState("");
    const [shippingFreeThreshold, setShippingFreeThreshold] = useState("");
    const [additionalShippingFee, setAdditionalShippingFee] = useState("");
    const [certifications, setCertifications] = useState([]);
    const [certFileNames, setCertFileNames] = useState([]);
    const [certFileUrls, setCertFileUrls] = useState([]);

    // 이미지 업로드
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [mainIndex, setMainIndex] = useState(0);
    const fileInputRef = useRef(null);
    const [showPreview, setShowPreview] = useState(false);
    const [isDraftLoaded, setIsDraftLoaded] = useState(false);

    const buildDraftPayload = () => ({
        name,
        price,
        priceDisplay,
        stock,
        unit,
        origin,
        originDetail,
        farmingType,
        harvestDate,
        expirationDate,
        category,
        description,
        tags,
        tagInput,
        storageMethod,
        shippingConditions,
        discountRate,
        discountStart,
        discountEnd,
        bulkMinQuantity,
        bulkDiscountRate,
        stockWarningThreshold,
        shippingFreeThreshold,
        additionalShippingFee,
        imageUrls,
        mainIndex,
        certFileNames,
    });

    const applyDraftPayload = (draft) => {
        if (!draft) return;
        setName(draft.name || "");
        setPrice(draft.price || "");
        setPriceDisplay(draft.priceDisplay || "");
        setStock(draft.stock || "");
        setUnit(draft.unit || "kg");
        setOrigin(draft.origin || "");
        setOriginDetail(draft.originDetail || "");
        setFarmingType(draft.farmingType || "");
        setHarvestDate(draft.harvestDate || "");
        setExpirationDate(draft.expirationDate || "");
        setCategory(draft.category || "");
        setDescription(draft.description || "");
        setTags(draft.tags || []);
        setTagInput(draft.tagInput || "");
        setStorageMethod(draft.storageMethod || "");
        setShippingConditions(draft.shippingConditions || "");
        setDiscountRate(draft.discountRate || "");
        setDiscountStart(draft.discountStart || "");
        setDiscountEnd(draft.discountEnd || "");
        setBulkMinQuantity(draft.bulkMinQuantity || "");
        setBulkDiscountRate(draft.bulkDiscountRate || "");
        setStockWarningThreshold(draft.stockWarningThreshold || "");
        setShippingFreeThreshold(draft.shippingFreeThreshold || "");
        setAdditionalShippingFee(draft.additionalShippingFee || "");
        setImageUrls(draft.imageUrls || []);
        setMainIndex(draft.mainIndex || 0);
        setCertFileNames(draft.certFileNames || []);
    };

    useEffect(() => {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                applyDraftPayload(parsed);
            } catch (err) {
                console.error("초안 불러오기 실패", err);
            }
        }
        setIsDraftLoaded(true);
    }, []);

    useEffect(() => {
        if (!isDraftLoaded) return;
        const payload = buildDraftPayload();
        localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    }, [
        isDraftLoaded,
        name,
        price,
        priceDisplay,
        stock,
        unit,
        origin,
        originDetail,
        farmingType,
        harvestDate,
        expirationDate,
        category,
        description,
        tags,
        tagInput,
        storageMethod,
        shippingConditions,
        discountRate,
        discountStart,
        discountEnd,
        bulkMinQuantity,
        bulkDiscountRate,
        stockWarningThreshold,
        shippingFreeThreshold,
        additionalShippingFee,
        imageUrls,
        mainIndex,
        certFileNames,
    ]);

    const handleSaveDraft = () => {
        const payload = buildDraftPayload();
        localStorage.setItem(DRAFT_KEY, JSON.stringify(buildDraftPayload()));
        console.log("임시 저장 완료:", payload);
        alert("임시 저장이 완료되었습니다.");
    };

    const resetForm = () => {
        setName(""); setPrice(""); setStock(""); 
        setUnit("kg"); setOrigin(""); setOriginDetail("");
        setCategory(""); setDescription(""); setTags([]);
        setTagInput("");
        setImages([]); setMainIndex(0); setImageUrls([]);
        setPriceDisplay("");
        setFarmingType(""); setHarvestDate(""); setExpirationDate("");
        setStorageMethod(""); setShippingConditions("");
        setDiscountRate(""); setDiscountStart(""); setDiscountEnd("");
        setBulkMinQuantity(""); setBulkDiscountRate("");
        setStockWarningThreshold(""); setShippingFreeThreshold("");
        setAdditionalShippingFee("");
        setCertifications([]); setCertFileNames([]); setCertFileUrls([]);
    };

    const handleClearDraft = () => {
        localStorage.removeItem(DRAFT_KEY);
        resetForm();
    };

    const handlePreviewOpen = () => setShowPreview(true);
    const handlePreviewClose = () => setShowPreview(false);

    const validationWarnings = useMemo(() => {
        const warnings = [];
        if (harvestDate && expirationDate && harvestDate > expirationDate) {
            warnings.push({ level: "error", message: "수확일이 유통기한보다 늦습니다." });
        }
        if (discountStart && discountEnd && discountStart > discountEnd) {
            warnings.push({ level: "error", message: "할인 종료일이 시작일보다 빠릅니다." });
        }
        if (discountRate && Number(discountRate) > 90) {
            warnings.push({ level: "warn", message: "할인율이 90%를 초과했습니다. 입력값을 확인하세요." });
        }
        if (bulkDiscountRate && Number(bulkDiscountRate) > 90) {
            warnings.push({ level: "warn", message: "대량 구매 할인율이 90%를 초과했습니다." });
        }
        if (stockWarningThreshold && stock && Number(stockWarningThreshold) > Number(stock)) {
            warnings.push({ level: "warn", message: "재고 경고선이 실제 재고보다 큽니다." });
        }
        return warnings;
    }, [
        harvestDate,
        expirationDate,
        discountStart,
        discountEnd,
        discountRate,
        bulkDiscountRate,
        stockWarningThreshold,
        stock,
    ]);

    const hasBlockingValidation = validationWarnings.some((w) => w.level === "error");

    const previewData = useMemo(() => {
        const mainImageUrl = imageUrls[mainIndex] || imageUrls[0] || "https://placehold.co/360x240?text=Preview";
        return {
            mainImage: mainImageUrl,
            name: name || "상품명 미입력",
            priceText: priceDisplay || formatKoreanWon(price),
            unit: unit || "단위 미입력",
            origin: origin || "원산지 정보 없음",
            tags,
            description: description || "상세 설명이 아직 작성되지 않았습니다.",
            storageMethod,
            shippingConditions,
        };
    }, [
        imageUrls,
        mainIndex,
        name,
        priceDisplay,
        price,
        unit,
        origin,
        tags,
        description,
        storageMethod,
        shippingConditions,
    ]);

    // 이미지 선택
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        const newUrls = files.map(file => URL.createObjectURL(file));
        setImageUrls(prev => [...prev, ...newUrls]);
    };

    // 드래그&드롭으로 이미지 선택
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setImages(files);
        const urls = files.map(file => URL.createObjectURL(file));
        setImageUrls(urls);
    };
    const handleDragOver = (e) => e.preventDefault();

    // 태그 공통 처리
    const handleTagKeyDown = (e, currentTags, setCurrentTags, currentInput, setCurrentInput) => {
        if ((e.key === "Enter" || e.key === ",") && currentInput.trim() !== "") {
            e.preventDefault();
            const newTag = currentInput.replace(",", "").trim();
            if (!currentTags.includes(newTag)) {
                setCurrentTags([...currentTags, newTag]);
            }
            setCurrentInput("");
        }
    };

    const handleTagRemove = (tag, currentTags, setCurrentTags) => {
        setCurrentTags(currentTags.filter(t => t !== tag));
    };

    const handleNumericChange = (setter, maxLength = 12) => (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (maxLength && value.length > maxLength) value = value.slice(0, maxLength);
        setter(value);
    };

    const addTag = (e) => handleTagKeyDown(e, tags, setTags, tagInput, setTagInput);
    const removeTag = (tag) => handleTagRemove(tag, tags, setTags);

    // 이미지 삭제
    const removeImage = (idx) => {
        const newImages = [...images];
        const newUrls = [...imageUrls];
        newImages.splice(idx, 1);
        newUrls.splice(idx, 1);
        setImages(newImages);
        setImageUrls(newUrls);
        if (mainIndex === idx) setMainIndex(0);
    }

    // 인증서 파일
    const handleCertChange = (e) => {
        const files = Array.from(e.target.files);
        setCertifications(prev => [...prev, ...files]);
        setCertFileNames(prev => [...prev, ...files.map(file => file.name)]);
    };

    const removeCertFile = (idx) => {
        const updatedFiles = [...certifications];
        updatedFiles.splice(idx, 1);
        setCertifications(updatedFiles);

        const updatedNames = [...certFileNames];
        updatedNames.splice(idx, 1);
        setCertFileNames(updatedNames);
    };

    // 파일 업로드 (이미지/인증 공용)
    const uploadFiles = async (files) => {
        if(!files || files.length === 0) return [];

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        try {
            const res = await axios.post(
                "http://localhost:8080/files/upload", 
                formData, 
                { headers: {"Content-Type": "multipart/form-data"} }
            );
            return res.data;
        } catch (err) {
            console.error("파일 업로드 실패", err)
            return [];
        }
    }

    const toInt = (value) => value ? parseInt(value, 10) : null;
    const toFloat = (value) => value ? parseFloat(value) : null;

    // 상품 등록
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (hasBlockingValidation) {
            alert("입력값을 다시 확인해 주세요. (날짜 순서 등)");
            return;
        }

        const uploadedImageUrls = await uploadFiles(images);
        if (uploadedImageUrls.length) setImageUrls(uploadedImageUrls);

        const uploadedCertUrls = await uploadFiles(certifications);
        if (uploadedCertUrls.length) setCertFileUrls(uploadedCertUrls);

        const finalImageUrls = uploadedImageUrls.length
            ? uploadedImageUrls
            : (images.length ? [] : imageUrls);
        const finalCertUrls = uploadedCertUrls.length
            ? uploadedCertUrls
            : (certifications.length ? [] : certFileUrls);
        const safeMainImage = finalImageUrls[mainIndex] || finalImageUrls[0] || "";

        const productData = {
            name,
            price: parseInt(price),
            stock: parseInt(stock),
            unit,
            origin,
            originDetail,
            farmingType,
            harvestDate,
            expirationDate,
            category,
            description,
            tags,
            storageMethod,
            shippingConditions,
            discountRate: toFloat(discountRate),
            discountStart,
            discountEnd,
            bulkMinQuantity: toInt(bulkMinQuantity),
            bulkDiscountRate: toFloat(bulkDiscountRate),
            stockWarningThreshold: toInt(stockWarningThreshold),
            shippingFreeThreshold: toInt(shippingFreeThreshold),
            additionalShippingFee: toInt(additionalShippingFee),
            images: finalImageUrls,
            mainImage: safeMainImage,
            certificates: finalCertUrls,
        };

        try {
            await axios.post("http://localhost:8080/seller/products", productData, {
                headers: { Authentication: `Bearer ${localStorage.getItem("token")}` },
            });
            alert("상품 등록 완료!");

            resetForm();
            localStorage.removeItem(DRAFT_KEY);
        } catch (err) {
            console.error("상품등록 실패", err);
            alert("상품 등록 중 오류가 발생했습니다.");
        }
    }

    // 가격 입력 처리: 숫자만 허용, 최대 16자리 제한 (~999조까지)
    const handlePriceChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if(value.length > 16) value = value.slice(0,16);
        setPrice(value);
        setPriceDisplay(formatKoreanWon(value));
    }

    // 재고 입력 처리
    const handleStockChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setStock(value);
        if(!unit) setUnit("개"); 
    };

    return (
        <div className="product-form-container">
            <GotoBack/>
            <h2>판매자 상품 등록</h2>

            <form onSubmit={handleSubmit}>

                {/* 상품 기본정보 */}
                <div className="section">
                    <div className="section-header">
                        <h3>상품 기본정보</h3>
                        <p className="section-description">상품의 기본적인 정보를 입력해주세요</p>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="text" 
                            value={name}
                            placeholder="예: 신선한 사과 1kg" 
                            onChange={(e)=>setName(e.target.value)} 
                            required />
                            <label>상품명 <span>*</span></label>
                        </div>
                        <div className="input-group">
                            <select 
                            value={category} 
                            className={category ? "has-value" : ""}
                            onChange={(e)=>setCategory(e.target.value)} required>
                                <option value="">카테고리 선택</option>
                                {categories.map((c, idx)=><option key={idx} value={c}>{c}</option>)}
                            </select>
                            <label>카테고리 <span>*</span></label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group price"> 
                            <input placeholder="예: 15000" type="text" value={price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={handlePriceChange} required />
                            <label>가격(원) <span>*</span></label>
                            {priceDisplay && <div className="price-display">{priceDisplay}</div>}
                        </div>
                        <div className="input-group">
                            <input placeholder="예: 경상북도 안동시" type="text" value={origin} onChange={(e)=>setOrigin(e.target.value)} required />
                            <label>원산지 <span>*</span></label>
                        </div>
                       
                    </div>

                    <div className="row">
                        <div className="input-group stock-unit">
                            <div className="stock-unit-wrapper">
                                <input 
                                type="text"
                                value={stock}
                                onChange={handleStockChange}
                                placeholder="100"
                                required
                                />
                                <span className="unit-separator">/</span>
                                <input 
                                type="text"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                placeholder="kg"
                                required
                                />
                            </div>
                            <label>재고 / 단위 <span>*</span></label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="text"
                            value={originDetail}
                            onChange={(e)=>setOriginDetail(e.target.value)}
                            placeholder="예: 안동시 풍산면 유명리"
                            />
                            <label>산지 상세정보</label>
                        </div>
                        <div className="input-group">
                            <select 
                            value={farmingType}
                            className={farmingType ? "has-value" : ""}
                            onChange={(e)=>setFarmingType(e.target.value)}
                            >
                                <option value="">재배 방식 선택</option>
                                {farmingTypes.map((type, idx)=><option key={idx} value={type}>{type}</option>)}
                            </select>
                            <label>재배 방식</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="date"
                            value={harvestDate}
                            onChange={(e)=>setHarvestDate(e.target.value)}
                            className={harvestDate ? "has-value" : ""}
                            />
                            <label>수확일</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="date"
                            value={expirationDate}
                            onChange={(e)=>setExpirationDate(e.target.value)}
                            className={expirationDate ? "has-value" : ""}
                            />
                            <label>유통기한</label>
                        </div>
                    </div>
                </div>

                {/* 보관/배송 정책 */}
                <div className="section">
                    <div className="section-header">
                        <h3>보관 · 배송 정책</h3>
                        <p className="section-description">고객에게 안내할 보관 방법과 배송 조건을 설정해주세요</p>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="text"
                            value={stockWarningThreshold}
                            onChange={handleNumericChange(setStockWarningThreshold, 6)}
                            placeholder="예: 10"
                            />
                            <label>재고 경고선 (수량)</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="text"
                            value={shippingFreeThreshold}
                            onChange={handleNumericChange(setShippingFreeThreshold, 9)}
                            placeholder="예: 50000"
                            />
                            <label>무료배송 기준 (원)</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="text"
                            value={additionalShippingFee}
                            onChange={handleNumericChange(setAdditionalShippingFee, 7)}
                            placeholder="예: 3000"
                            />
                            <label>지역 추가 배송비 (원)</label>
                        </div>
                    </div>
                    <div className="textarea-grid">
                        <div className="textarea-wrapper">
                            <textarea 
                            className={storageMethod ? "has-value" : ""}
                            placeholder=''
                            value={storageMethod}
                            onChange={(e)=>setStorageMethod(e.target.value)}
                            />
                            <label>보관 방법</label>
                        </div>
                        <p className="helper-text">예: 0~5℃ 냉장 보관, 개봉 후 2일 이내 섭취</p>
                        <div className="textarea-wrapper">
                            <textarea 
                            placeholder=''
                            value={shippingConditions}
                            onChange={(e)=>setShippingConditions(e.target.value)}
                            />
                            <label>배송 조건/제한</label>
                        </div>
                        <p className="helper-text">예: 월~목 출고, 도서산간 2~3일 추가, 냉장 배송</p>
                    </div>
                </div>

                {/* 프로모션 */}
                <div className="section">
                    <div className="section-header">
                        <h3>프로모션 · 할인</h3>
                        <p className="section-description">할인 및 프로모션 정보를 설정해주세요 (선택사항)</p>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="text"
                            value={discountRate}
                            onChange={handleNumericChange(setDiscountRate, 3)}
                            placeholder="예: 10"
                            />
                            <label>기본 할인율 (%)</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="date"
                            value={discountStart}
                            onChange={(e)=>setDiscountStart(e.target.value)}
                            className={discountStart ? "has-value" : ""}
                            />
                            <label>할인 시작일</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="date"
                            value={discountEnd}
                            onChange={(e)=>setDiscountEnd(e.target.value)}
                            className={discountEnd ? "has-value" : ""}
                            />
                            <label>할인 종료일</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="text"
                            value={bulkMinQuantity}
                            onChange={handleNumericChange(setBulkMinQuantity, 6)}
                            placeholder="예: 5"
                            />
                            <label>대량 구매 최소 수량</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="text"
                            value={bulkDiscountRate}
                            onChange={handleNumericChange(setBulkDiscountRate, 3)}
                            placeholder="예: 15"
                            />
                            <label>대량 구매 할인율 (%)</label>
                        </div>
                    </div>
                </div>

                {/* 태그 */}
                <div className="section">
                    <div className="section-header">
                        <h3>태그</h3>
                        <p className="section-description">상품 검색에 도움이 되는 태그를 입력해주세요 (선택사항)</p>
                    </div>
                    <div className="tag-sets">
                        <div className="tag-box">
                            {tags.map(tag=>(
                                <span key={tag} className="tag">{tag} <b onClick={()=>removeTag(tag)}>×</b></span>
                            ))}
                            <input placeholder="태그 입력 후 Enter 또는 쉼표(,) 입력" value={tagInput} onChange={(e)=>setTagInput(e.target.value)} onKeyDown={addTag}/>
                        </div>
                    </div>
                </div>

                {/* 상세설명 */}
                <div className="section">
                    <div className="section-header">
                        <h3>상품 상세설명</h3>
                        <p className="section-description">상품에 대한 자세한 설명을 작성해주세요</p>
                    </div>
                    <div className="textarea-wrapper">
                        <textarea 
                        placeholder="상품의 특징, 재배 과정, 맛과 영양 정보 등을 자세히 작성해주세요"
                        value={description} onChange={(e)=>setDescription(e.target.value)} required />
                        <label>상세설명 <span>*</span></label>
                    </div>
                </div>

                {/* 인증서 */}
                <div className="section">
                    <div className="section-header">
                        <h3>품질 인증 · 검사서</h3>
                        <p className="section-description">유기농 인증서, 검사서 등을 첨부해주세요 (선택사항)</p>
                    </div>
                    <div className="cert-upload">
                        <input 
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        onChange={handleCertChange}
                        />
                        <p className="info-note">📎 PDF 또는 이미지 파일로 인증서를 첨부할 수 있습니다.</p>
                    </div>
                    {certFileNames.length > 0 && (
                        <ul className="file-list">
                            {certFileNames.map((name, idx)=>(
                                <li key={`${name}-${idx}`}>
                                    <span>{name}</span>
                                    <button type="button" onClick={()=>removeCertFile(idx)}>삭제</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 이미지 */}
                <div className="section">
                    <div className="section-header">
                        <h3>상품 이미지</h3>
                        <p className="section-description">상품을 잘 보여줄 수 있는 이미지를 등록해주세요</p>
                    </div>
                    <div
                        className="dropzone"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <div className="dropzone-icon">📷</div>
                        <div className="dropzone-text">
                            <strong>이미지를 드래그하거나 클릭하여 업로드</strong>
                            <span>JPG, PNG 파일을 지원합니다</span>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className="preview">
                        {imageUrls.map((url, idx) => (
                            <div key={idx} className={`img-box ${mainIndex === idx ? "main" : ""}`}>
                                <img src={url} alt={`상품이미지-${idx}`} />
                                
                                {/* 대표 이미지 배지 */}
                                {mainIndex === idx && <span className="badge">대표</span>}

                                {/* 삭제 버튼 */}
                                <span className="remove-btn" onClick={() => removeImage(idx)}>×</span>

                                {/* 대표 이미지 선택 버튼 */}
                                {mainIndex !== idx && (
                                    <span
                                        className="set-main-btn"
                                        onClick={() => setMainIndex(idx)}
                                    >
                                        대표선택
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {validationWarnings.length > 0 && (
                    <div className="validation-box">
                        <p>확인 필요한 항목</p>
                        <ul>
                            {validationWarnings.map((warning, idx) => (
                                <li key={`${warning.message}-${idx}`} className={warning.level === "error" ? "error" : ""}>
                                    {warning.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="form-actions">
                    <div className="action-buttons">
                        <button type="button" className="secondary-btn" onClick={handlePreviewOpen}>
                            미리보기
                        </button>
                        <button type="button" className="secondary-btn" onClick={handleSaveDraft}>
                            임시 저장
                        </button>
                        <button type="button" className="ghost-btn" onClick={handleClearDraft}>
                            초기화
                        </button>
                    </div>
                    <div>
                        <button className="submit-btn" type="submit">상품 등록하기</button>
                    </div>
                    
                </div>
            </form>

            <BacktoTop/>

            {showPreview && (
                <div className="preview-modal">
                    <div className="preview-modal__content">
                        <button type="button" className="close-btn" onClick={handlePreviewClose}>×</button>
                        <div className="preview-card">
                            <div className="preview-card__image">
                                <img src={previewData.mainImage} alt="상품 미리보기" />
                            </div>
                            <div className="preview-card__body">
                                <h4>{previewData.name}</h4>
                                <p className="price">{previewData.priceText || "가격 정보 없음"}</p>
                                <p className="meta">{previewData.origin} · {previewData.unit}</p>
                                <div className="preview-tags">
                                    {previewData.tags && previewData.tags.length > 0 ? (
                                        previewData.tags.map((tag) => <span key={tag}>#{tag}</span>)
                                    ) : (
                                        <span className="muted">태그 없음</span>
                                    )}
                                </div>
                                <p className="desc">
                                    {previewData.description}
                                </p>
                                <div className="preview-extra">
                                    <div>
                                        <strong>보관</strong>
                                        <p>{previewData.storageMethod || "정보 없음"}</p>
                                    </div>
                                    <div>
                                        <strong>배송</strong>
                                        <p>{previewData.shippingConditions || "정보 없음"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SellerProductForm;
