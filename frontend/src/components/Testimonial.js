// src/components/Testimonial.jsx
import React, { useEffect } from 'react';

const Testimonial = () => {
    useEffect(() => {
        // Owl Carousel 초기화
        if (window.$ && window.$.fn.owlCarousel) {
        window.$('.testimonial-carousel').owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 25,
            dots: false,
            loop: true,
            center: true,
            responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
            }
        });
        }
    }, []);

    const testimonials = [
        { image: '/img/testimonial-1.jpg', name: 'Client Name', profession: 'Profession' },
        { image: '/img/testimonial-2.jpg', name: 'Client Name', profession: 'Profession' },
        { image: '/img/testimonial-3.jpg', name: 'Client Name', profession: 'Profession' },
        { image: '/img/testimonial-4.jpg', name: 'Client Name', profession: 'Profession' },
    ];

    return (
        <div className="container-fluid bg-light bg-icon py-6 mb-5">
        <div className="container">
            <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '500px'}}>
            <h1 className="display-5 mb-3">고객 리뷰</h1>
            <p>구매자와 판매자의 고객리뷰 페이지 입니다.</p>
            </div>
            <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-item position-relative bg-white p-5 mt-4">
                <i className="fa fa-quote-left fa-3x text-primary position-absolute top-0 start-0 mt-n4 ms-5"></i>
                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                <div className="d-flex align-items-center">
                    <img className="flex-shrink-0 rounded-circle" src={testimonial.image} alt="" />
                    <div className="ms-3">
                    <h5 className="mb-1">{testimonial.name}</h5>
                    <span>{testimonial.profession}</span>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default Testimonial;