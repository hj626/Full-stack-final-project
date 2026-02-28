// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const user = localStorage.getItem("username");

        setIsLoggedIn(loggedIn);
        setUsername(user || "");
    }, []);

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        navigate("/");
    };

    // 현재 URL이 드롭다운 메뉴 경로인지 확인
    const isSellingPage =
        location.pathname === "/blog" ||
        location.pathname === "/feature" ||
        location.pathname === "/testimonial";

    // NavLink 스타일 자동 적용
    const getNavClass = ({ isActive }) =>
        "nav-item nav-link" + (isActive ? " active fw-bold" : "");

    return (
        <>
            <div className="container-fluid fixed-middle px-0 wow fadeIn bg-white shadow" data-wow-delay="0.1s">
                
                {/* ---------- Top Bar ---------- */}
                <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
                    <div className="col-lg-6 px-5 text-start">
                        <small><i className="fa fa-map-marker-alt me-2"></i>수원시 인계동 휴먼IT교육</small>
                        <small className="ms-4"><i className="fa fa-envelope me-2"></i>farm@example.com</small>
                    </div>
                    <div className="col-lg-6 px-5 text-end">
                        <small>Other Projects :</small>
                        <a className="text-body ms-3" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="text-body ms-3" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="text-body ms-3" href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a className="text-body ms-3" href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                {/* ---------- Navbar ---------- */}
                <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
                    
                    {/* 로고 */}
                    <Link to="/" className="navbar-brand ms-4 ms-lg-0">
                        <h1 className="fw-bold text-primary m-0">
                            F<span className="text-secondary">ar</span>m
                        </h1>
                    </Link>

                    {/* 모바일 메뉴 버튼 */}
                    <button 
                        type="button"
                        className="navbar-toggler me-4"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* 메뉴 목록 */}
                    <div className="collapse navbar-collapse" id="navbarCollapse">

                        <div className="navbar-nav ms-auto p-4 p-lg-0">

                            <NavLink to="/products/detail/691c0301f5bb8d46c9282871" className={getNavClass}>
                                물품상세페이지
                            </NavLink>

                            <NavLink to="/seller/products" className={getNavClass}>
                                판매물품 등록 페이지
                            </NavLink>

                            <NavLink to="/" className={getNavClass} end>
                                홈페이지
                            </NavLink>

                            <NavLink to="/about" className={getNavClass}>
                                가격추세
                            </NavLink>

                            <NavLink to="/products" className={getNavClass}>
                                농산물
                            </NavLink>

                            <NavLink to="/predict" className={getNavClass}>
                                AI가격 예측
                            </NavLink>

                            {/* ▼ 드롭다운: 판매정보 */}
                            <div className="nav-item dropdown">

                                {/* 부모 메뉴에 active 적용 */}
                                <a
                                    href="#"
                                    className={`nav-link dropdown-toggle ${isSellingPage ? "active fw-bold" : ""}`}
                                    data-bs-toggle="dropdown"
                                >
                                    판매정보
                                </a>

                                <div className="dropdown-menu m-0">
                                        <NavLink to="/blog" className="dropdown-item">판매자</NavLink>
                                    <NavLink to="/feature" className="dropdown-item">농산물 정보</NavLink>
                                    <NavLink to="/testimonial" className="dropdown-item">고객 리뷰</NavLink>
                                          <Link to="/sns" className="dropdown-item">블로그</Link>
                                </div>
                            </div>

                            <NavLink to="/contact" className={getNavClass}>
                                고객센터
                            </NavLink>
                        </div>

                        {/* ---------- 로그인/로그아웃 버튼 ---------- */}
                        <div className="d-none d-lg-flex ms-3 align-items-center">

                            {/* 로그인 상태일 때 */}
                            {isLoggedIn ? (
                                <>
                                    <span className="me-3 fw-bold">{username}님</span>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-outline-danger btn-sm rounded-pill"
                                    >
                                        로그아웃
                                    </button>

                                    {/* 아이콘들 */}
                                    <div className="d-none d-lg-flex ms-2">
                                        <a className="btn-sm-square bg-white rounded-circle ms-3" href="#">
                                            <small className="fa fa-search text-body"></small>
                                        </a>
                                        <a className="btn-sm-square bg-white rounded-circle ms-3" href="#">
                                            <small className="fa fa-user text-body"></small>
                                        </a>
                                        <a className="btn-sm-square bg-white rounded-circle ms-3" href="#">
                                            <small className="fa fa-shopping-bag text-body"></small>
                                        </a>
                                    </div>
                                </>
                            ) : (
                                /* 로그아웃 상태일 때 */
                                <>
                                    <Link
                                        to="/login"
                                        className="btn btn-outline-primary btn-sm rounded-pill me-2"
                                    >
                                        로그인
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="btn btn-primary btn-sm rounded-pill"
                                    >
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
