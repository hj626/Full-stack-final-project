import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div>
            {/* Navbar Start */}
            <Navbar />
            {/* Navbar End */}

            {/* Page Header Start */}
            <div className="container-fluid page-header wow fadeIn" data-wow-delay="0.1s">
                <div className="container">
                    <h1 className="display-3 mb-3 animated slideInDown" style={{marginRight:'300px'}}>고객센터</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <a className="text-body" href="/">홈페이지</a>
                            </li>
                            <li className="breadcrumb-item text-dark active" aria-current="page">
                                고객센터
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            {/* Contact Start */}
            <div className="container-xxl py-6">
                <div className="container">
                    {/* 타이틀 */}
                    <div
                        className="section-header text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: '600px' }}
                    >
                        <h1 className="display-5 mb-3">문의 접수</h1>
                        <p>주문, 배송, 환불 및 상품 관련 문의는 아래 고객센터로 문의해주세요.</p>
                    </div>

                    <div className="row g-4 align-items-stretch">
                        {/* LEFT – 고객센터 정보 (파스텔 카드형) */}
                        <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div
                                className="h-100 p-4 p-lg-5 rounded-4"
                                style={{
                                    background: '#e6f6ec',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                                }}
                            >
                                <h4 className="fw-bold mb-4">📞 고객센터 연락처</h4>
                                <div className="mb-4">
                                    <div className="small text-muted mb-1">대표번호</div>
                                    <div className="fs-5 fw-semibold">1588-1234</div>
                                </div>

                                <div className="mb-4">
                                    <div className="small text-muted mb-1">상담시간</div>
                                    <div>평일 09:00 ~ 18:00</div>
                                    <div>점심시간 12:00 ~ 13:00</div>
                                    <div className="small text-muted mt-1">주말·공휴일 휴무</div>
                                </div>

                                <div className="mb-4">
                                    <div className="small text-muted mb-1">이메일 문의</div>
                                    <div>farm@example.com</div>
                                </div>

                                <div className="mb-4">
                                    <div className="small text-muted mb-1">매장 위치</div>
                                    <div>수원시 인계동 휴먼IT교육</div>
                                </div>

                                <div>
                                    <div className="small text-muted mb-2">빠른 상담 채널</div>
                                    <div className="d-flex flex-wrap gap-2">
                                        <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-2">
                                            카카오톡 채널
                                        </span>
                                        <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-2">
                                            이메일 상담
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT – 문의 폼 (카드형) */}
                        <div className="col-lg-8 col-md-12 wow fadeInUp" data-wow-delay="0.3s">
                            <div
                                className="bg-white rounded-4 p-4 p-lg-5 h-100"
                                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                            >
                                <h5 className="fw-bold mb-3">문의 유형</h5>
                                <form>
                                    <div className="row g-3">
                                        {/* 문의 유형 */}
                                        <div className="col-12">
                                            <select className="form-select form-select-lg">
                                                <option>주문 문의</option>
                                                <option>배송 문의</option>
                                                <option>환불 / 교환 문의</option>
                                                <option>상품 품질 문의</option>
                                                <option>판매자 문의</option>
                                                <option>기타 문의</option>
                                            </select>
                                        </div>

                                        {/* 주문번호 */}
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="orderNumber"
                                                    placeholder="주문번호"
                                                />
                                                <label htmlFor="orderNumber">주문번호 (선택)</label>
                                            </div>
                                        </div>

                                        {/* 이름 / 이메일 */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="이름"
                                                />
                                                <label htmlFor="name">이름</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="이메일"
                                                />
                                                <label htmlFor="email">이메일</label>
                                            </div>
                                        </div>

                                        {/* 내용 */}
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    id="message"
                                                    placeholder="문의 내용"
                                                    style={{ height: '200px' }}
                                                ></textarea>
                                                <label htmlFor="message">문의 내용</label>
                                            </div>
                                        </div>

                                        {/* 첨부파일 */}
                                        <div className="col-12">
                                            <label className="form-label fw-bold small d-block mb-1 text-center">
                                                첨부파일 (선택)
                                            </label>
                                            <input type="file" className="form-control" />
                                        </div>

                                        {/* 버튼 */}
                                        <div className="col-12 text-center mt-3">
                                            <button
                                                className="btn btn-success rounded-pill py-3 px-5"
                                                type="submit"
                                                style={{ minWidth: '200px' }}
                                            >
                                                문의 보내기
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}

{/* FAQ Start */}
<div className="container-xxl py-5">
    <div className="container">

        <div
            className="section-header text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
        >
            <h1 className="display-6 mb-3">자주 묻는 질문 (FAQ)</h1>
            <p>고객님들이 가장 자주 문의하는 내용을 정리했습니다.</p>
        </div>

        <div className="accordion" id="faqAccordion">

            {/* FAQ Item 1 */}
            <div className="accordion-item">
                <h2 className="accordion-header" id="faq1">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse1"
                    >
                        🚚 배송은 얼마나 걸리나요?
                    </button>
                </h2>
                <div
                    id="collapse1"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#faqAccordion"
                >
                    <div className="accordion-body">
                        산지 직송 상품의 경우 지역과 날씨에 따라 다르며 보통 <strong>1~3일</strong> 이내에 도착합니다.
                    </div>
                </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="accordion-item">
                <h2 className="accordion-header" id="faq2">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                    >
                        💳 환불 / 교환은 어떻게 하나요?
                    </button>
                </h2>
                <div
                    id="collapse2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                >
                    <div className="accordion-body">
                        신선식품 특성상 단순 변심 환불은 불가능하며, <strong>상품 불량·오배송</strong> 시 사진과 함께 문의해주시면 처리해드립니다.
                    </div>
                </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="accordion-item">
                <h2 className="accordion-header" id="faq3">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                    >
                        📦 상품이 파손되어 도착했어요.
                    </button>
                </h2>
                <div
                    id="collapse3"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                >
                    <div className="accordion-body">
                        배송 중 파손된 상품은 사진을 첨부해주시면 <strong>전액 환불 또는 재배송</strong> 도와드립니다.
                    </div>
                </div>
            </div>

            {/* FAQ Item 4 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="faq4">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapse4"
                                >
                                    🧾 비회원도 주문 조회가 가능한가요?
                                </button>
                            </h2>
                            <div
                                id="collapse4"
                                className="accordion-collapse collapse"
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body">
                                    불가능
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* FAQ End */}



            {/* Google Map Start */}
            <div
                className="container-xxl px-0 wow fadeIn"
                data-wow-delay="0.1s"
                style={{ marginBottom: '-6px' }}
            >
                <iframe
                    className="w-100"
                    style={{ height: '450px' }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.8923202031356!2d127.02631212372901!3d37.27718509925006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b434db893bab1%3A0x3863390cf722e398!2z7Zy066i86rWQ7Jyh7IS87YSw!5e0!3m2!1sko!2skr!4v1763352251443!5m2!1sko!2skr"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="매장 위치"
                ></iframe>
            </div>
            {/* Google Map End */}

            {/* Footer Start */}
            <Footer />
            {/* Footer End */}

            {/* Back to Top */}
            <a
                href="#"
                className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
            >
                <i className="bi bi-arrow-up"></i>
            </a>
        </div>
    );
};

export default Contact;
