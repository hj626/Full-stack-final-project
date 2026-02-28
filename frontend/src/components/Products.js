// src/components/Products.jsx
import React from "react";
import './product.css';

//상품 이미지 밑
const ProductItem = ({ image, name, price, oldPrice }) => (
    <div className="col-md-3">
        <div className="product-item mx-2">
            <div className="position-relative bg-light overflow-hidden">
                <img className="img-fluid w-100" src={image} alt="" />
                <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-3 py-1 px-3">
                    New
                </div>
            </div>
            <div className="text-center p-3">
                <a className="d-block h5 mb-2">{name}</a>
                <span className="text-primary me-1">{price} 원</span>
                <span className="text-body text-decoration-line-through">{oldPrice} 원</span>
            </div>
        </div>
    </div>
);

const Products = () => {
    const products = [
        { image: "/img/product-1.jpg", name: "토마토", price: "1900", oldPrice: "2900" },
        { image: "/img/product-2.jpg", name: "파인애플", price: "1900", oldPrice: "2900" },
        { image: "/img/product-3.jpg", name: "청양고추", price: "1900", oldPrice: "2900" },
        { image: "/img/product-4.jpg", name: "딸기", price: "1900", oldPrice: "2900" },
        { image: "/img/product-5.jpg", name: "오이", price: "1900", oldPrice: "2900" },
        { image: "/img/product-6.jpg", name: "단감", price: "1900", oldPrice: "2900" },
        { image: "/img/product-7.jpg", name: "감자", price: "1900", oldPrice: "2900" },
        { image: "/img/product-8.jpg", name: "바나나", price: "1900", oldPrice: "2900" },
    ];

    // 4개씩 끊어서 Carousel 슬라이드 만들기
    const chunked = [];
    for (let i = 0; i < products.length; i += 4) {
        chunked.push(products.slice(i, i + 4));
    }

    return (
        <div className="container-xxl py-5">
            <div className="container">

                <div className="text-start mb-5">
                    <h1 className="display-5 mb-3">제철 농산물</h1>
                    <p>요즘 제철인 농산물을 슬라이드로 확인하세요.</p>
                </div>

                {/* 🔥 캐러셀 시작 */}
                <div id="seasonCarousel" className="carousel slide" data-bs-ride="carousel">

                    {/* 슬라이드들 */}
                    <div className="carousel-inner">

                        {chunked.map((group, idx) => (
                            <div
                                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                key={idx}
                            >
                                <div className="row justify-content-center">
                                    {group.map((product, index) => (
                                        <ProductItem key={index} {...product} />
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* 좌우 화살표 */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#seasonCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#seasonCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon"></span>
                    </button>

                </div>
                {/* 🔥 캐러셀 끝 */}

            </div>
        </div>
    );
};

export default Products;
