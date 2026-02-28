// src/components/Blog.jsx
import React from "react";
import "./Blog.css";

const BlogItem = ({ image, title }) => (
    <div className="col-md-4">
        <div className="blog-item mx-2">
            <img className="img-fluid" src={image} alt="" />
            <div className="bg-light p-4">
                <a className="d-block h5 lh-base mb-4">{title}</a>
                <div className="text-muted border-top pt-4">
                    <small className="me-3">
                        <i className="fa fa-user text-primary me-2"></i>판매자
                    </small>
                    <small className="me-3">
                        <i className="fa fa-calendar text-primary me-2"></i>판매 시작일 : 2025-11-17
                    </small>
                </div>
            </div>
        </div>
    </div>
);

const Blog = () => {
    const blogs = [
        { image: "/img/blog-1.jpg", title: "겨울철 김장 제철 배추 판매중입니다." },
        { image: "/img/blog-2.jpg", title: "대한민국에서 가장 유명한 쌀! 이천쌀 10Kg 단위로 판매합니다." },
        { image: "/img/blog-3.jpg", title: "바로 재배한 당근 1Kg 단위로 판매합니다." },
        { image: "/img/blog-1.jpg", title: "신선한 양파 수확 즉시 판매!" },
        { image: "/img/blog-3.jpg", title: "오늘 아침에 딴 상추! 빠른 판매중!" },
        { image: "/img/blog-2.jpg", title: "대한민국에서 가장 유명한 쌀! 이천쌀 10Kg 단위로 판매합니다." },
    ];

    // 3개씩 묶기
    const chunked = [];
    for (let i = 0; i < blogs.length; i += 3) {
        chunked.push(blogs.slice(i, i + 3));
    }

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div
                    className="section-header text-center mx-auto mb-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                    style={{ maxWidth: "500px" }}
                >
                    <h1 className="display-5 mb-3">추천! 오늘의 가게</h1>
                    <p>Farm에서 추천하는 오늘의 가게!</p>
                </div>

                {/* 🔥 캐러셀 시작 */}
                <div id="blogCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        {chunked.map((group, idx) => (
                            <div
                                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                key={idx}
                            >
                                <div className="row justify-content-center">
                                    {group.map((blog, index) => (
                                        <BlogItem key={index} {...blog} />
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* 좌우 화살표 */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#blogCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#blogCarousel"
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

export default Blog;
