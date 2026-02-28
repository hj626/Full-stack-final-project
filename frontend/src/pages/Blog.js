import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 필터용 데이터
const regions = ["전체", "강원도", "경기도", "충청도", "전라도", "경상도", "제주도"];
const categories = ["전체", "채소", "과일", "곡물", "기타"];

// 판매자 데이터 (나중에 API로 대체 가능)
const sellerData = [
    {
        id: 1,
        image: "img/blog-1.jpg",
        title: "강원도 고산지대 배추",
        author: "강원배추",
        date: "2025-11-17",
        region: "강원도",
        category: "채소"
    },
    {
        id: 2,
        image: "img/blog-2.jpg",
        title: "제주 감귤 농가",
        author: "제주감귤",
        date: "2025-10-01",
        region: "제주도",
        category: "과일"
    },
    {
        id: 3,
        image: "img/blog-3.jpg",
        title: "전라도 유기농 쌀",
        author: "전라쌀",
        date: "2025-08-21",
        region: "전라도",
        category: "곡물"
    },
    {
        id: 4,
        image: "img/blog-2.jpg",
        title: "경기도 친환경 딸기",
        author: "경기딸기",
        date: "2025-10-11",
        region: "경기도",
        category: "과일"
    },
    {
        id: 5,
        image: "img/blog-3.jpg",
        title: "충청 고구마 농가",
        author: "충청고구마",
        date: "2025-09-01",
        region: "충청도",
        category: "기타"
    }
];

// 판매자 카드 렌더링 컴포넌트
const renderSeller = (list) => {
    return list.map((item) => (
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={item.id}>
            <img className="img-fluid" src={item.image} alt={item.title} />
            <div className="bg-light p-4">
                <a className="d-block h5 lh-base mb-4" href="">
                    {item.title}
                </a>
                <div className="text-muted border-top pt-4">
                    <small className="me-3">
                        <i className="fa fa-user text-primary me-2"></i>
                        {item.author}
                    </small>
                    <small className="me-3">
                        <i className="fa fa-calendar text-primary me-2"></i>
                        판매시작일: {item.date}
                    </small>
                </div>
            </div>
        </div>
    ));
};

const Blog = () => {
    // 드롭다운 상태
    const [openRegion, setOpenRegion] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    // 선택된 필터
    const [selectedRegion, setSelectedRegion] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");

    // 필터링된 리스트
    const filteredSellers = sellerData.filter((seller) => {
        const matchRegion = selectedRegion === "전체" || seller.region === selectedRegion;
        const matchCategory = selectedCategory === "전체" || seller.category === selectedCategory;
        return matchRegion && matchCategory;
    });

    return (
        <div>
            <Navbar />

            {/* Header */}
            <div className="container-fluid page-header wow fadeIn" data-wow-delay="0.1s">
                <div className="container">
                    <h1 className="display-3 mb-3 animated slideInDown" style={{ marginRight: '300px' }}>판매자</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a className="text-body" href="/">홈페이지</a></li>
                            <li className="breadcrumb-item"><a className="text-body" href="#">판매정보</a></li>
                            <li className="breadcrumb-item text-dark active" aria-current="page">판매자</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container-xxl py-6">
                <div className="container">

                    {/* Section Header */}
                    <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
                        <h1 className="display-5 mb-3">판매자 정보</h1>
                        <p>지역과 품목을 선택하여 원하는 판매자를 찾아보세요.</p>
                    </div>

                    {/* 🔽 필터: 지역 + 품목 */}
                    <div className="d-flex gap-3 justify-content-center mb-5">

                        {/* 지역 필터 */}
                        <div className="dropdown position-relative">
                            <button
                                className="btn btn-outline-primary d-flex align-items-center"
                                onClick={() => setOpenRegion(!openRegion)}
                            >
                                지역 선택 ▼
                            </button>

                            {openRegion && (
                                <ul className="dropdown-menu show p-2 border rounded mt-1" style={{ position: 'absolute' }}>
                                    {regions.map((r) => (
                                        <li
                                            key={r}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSelectedRegion(r);
                                                setOpenRegion(false);
                                            }}
                                        >
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* 품목 필터 */}
                        <div className="dropdown position-relative">
                            <button
                                className="btn btn-outline-primary d-flex align-items-center"
                                onClick={() => setOpenCategory(!openCategory)}
                            >
                                품목 선택 ▼
                            </button>

                            {openCategory && (
                                <ul className="dropdown-menu show p-2 border rounded mt-1" style={{ position: 'absolute' }}>
                                    {categories.map((c) => (
                                        <li
                                            key={c}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSelectedCategory(c);
                                                setOpenCategory(false);
                                            }}
                                        >
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* 선택된 조건 표시 */}
                    <div className="text-center mb-4">
                        <span className="badge bg-secondary me-2">지역: {selectedRegion}</span>
                        <span className="badge bg-secondary">품목: {selectedCategory}</span>
                    </div>

                    {/* 판매자 리스트 출력 */}
                    <div className="row g-4">
                        {renderSeller(filteredSellers)}
                    </div>

                    
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

export default Blog;
