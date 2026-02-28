import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PredictTest from '../components/PredictTest';

// (임시) 하드코딩 - API 적용 시 서버 데이터로 교체 예정
const productData = {
    vegetables: [
        { id: 1, image: "img/product-1.jpg", title: "토마토", price: 19, oldPrice: 29, badge: "New" },
        { id: 2, image: "img/product-2.jpg", title: "파인애플", price: 19, oldPrice: 29, badge: "New" },
        { id: 3, image: "img/product-3.jpg", title: "Fresh Tomato", price: 19, oldPrice: 29, badge: "New" },
        { id: 4, image: "img/product-4.jpg", title: "Fresh Tomato", price: 19, oldPrice: 29, badge: "New" },
        { id: 5, image: "img/product-5.jpg", title: "Fresh Tomato", price: 19, oldPrice: 29, badge: "New" },
        { id: 6, image: "img/product-6.jpg", title: "Fresh Tomato", price: 19, oldPrice: 29, badge: "New" },
        { id: 7, image: "img/product-7.jpg", title: "Fresh Tomato", price: 19, oldPrice: 29, badge: "New" },
        { id: 8, image: "img/product-8.jpg", title: "Fresh Tomato", price: 19, oldPrice: 29, badge: "New" },
    ],
    fruits: [
        { id: 1, image: "img/product-1.jpg", title: "Apple", price: 10, oldPrice: 15, badge: "New" },
        { id: 2, image: "img/product-2.jpg", title: "Banana", price: 8, oldPrice: 12, badge: "New" },
        { id: 3, image: "img/product-3.jpg", title: "Orange", price: 12, oldPrice: 18, badge: "New" },
        // ... 필요시 추가
    ],
    etc: [
        { id: 1, image: "img/product-1.jpg", title: "Rice", price: 30, oldPrice: 40, badge: "New" },
        { id: 2, image: "img/product-2.jpg", title: "Corn", price: 15, oldPrice: 22, badge: "New" },
        { id: 3, image: "img/product-3.jpg", title: "Beans", price: 14, oldPrice: 20, badge: "New" },
        // ... 필요시 추가
    ]
};

// 상품 카드 렌더링 함수
const renderProducts = (list) => {
    return list.map(item => (
        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" key={item.id}>
            <div className="product-item">
                <div className="position-relative bg-light overflow-hidden">
                    <img className="img-fluid w-100" src={item.image} alt={item.title} />
                    <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        {item.badge}
                    </div>
                </div>
                <div className="text-center p-4">
                    <a className="d-block h5 mb-2">{item.title}</a>
                    <span className="text-primary me-1">${item.price}</span>
                    <span className="text-body text-decoration-line-through">${item.oldPrice}</span>
                </div>
                <div className="d-flex border-top">
                    <small className="w-50 text-center border-end py-2">
                        <a className="text-body"><i className="fa fa-eye text-primary me-2"></i>상세보기</a>
                    </small>
                    <small className="w-50 text-center py-2">
                        <a className="text-body"><i className="fa fa-shopping-bag text-primary me-2"></i>찜하기</a>
                    </small>
                </div>
            </div>
        </div>
    ));
};

const Product = () => {

    return (
        <div>
            {/* Navbar Start */}
            <Navbar />
            {/* Navbar End */}

            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container">
                    <h1 className="display-3 mb-3 animated slideInDown" style={{ marginRight: '300px' }}>
                        농산물 직거래
                    </h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a className="text-body" href="/">홈페이지</a></li>
                            <li className="breadcrumb-item text-dark active" aria-current="page">농산물</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            {/* Product Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-0 gx-5 align-items-end">
                        <div className="col-lg-6">
                            <div className="section-header text-start mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
                                <h1 className="display-5 mb-3">직거래 농산물</h1>
                                <p>유통마진이 없는 직거래로 신선한 농산물을 저렴한 가격에 구입하세요.</p>
                                <div>총 <span style={{fontWeight: 'bold', color: 'green'}}>{productData.vegetables.length}</span>개의 상품이 있습니다.</div>
                            </div>
                        </div>

                        <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                            <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                                <li className="nav-item me-2">
                                    <a className="btn btn-outline-primary border-2 active" data-bs-toggle="pill" href="#tab-1">채 소</a>
                                </li>
                                <li className="nav-item me-2">
                                    <a className="btn btn-outline-primary border-2" data-bs-toggle="pill" href="#tab-2">과 일</a>
                                </li>
                                <li className="nav-item me-0">
                                    <a className="btn btn-outline-primary border-2" data-bs-toggle="pill" href="#tab-3">곡물&기타</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="tab-content">
                        {/* 채소 */}
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                {renderProducts(productData.vegetables)}
                            </div>
                        </div>

                        {/* 과일 */}
                        <div id="tab-2" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {renderProducts(productData.fruits)}
                            </div>
                        </div>

                        {/* 기타 */}
                        <div id="tab-3" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                {renderProducts(productData.etc)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Product End */}


            {/* Footer */}
            <Footer />

            {/* Back to top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top">
                <i className="bi bi-arrow-up"></i>
            </a>
        </div>
    );
};

export default Product;
