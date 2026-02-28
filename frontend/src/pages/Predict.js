import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PredictTest from '../components/PredictTest';

const Predict = () => {

    return (
        <div>
            {/* Navbar Start */}
            <Navbar />
            {/* Navbar End */}

            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container">
                    <h1 className="display-3 mb-3 animated slideInDown" style={{ marginRight: '300px' }}>
                        AI가격 예측
                    </h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a className="text-body" href="/">홈페이지</a></li>
                            <li className="breadcrumb-item text-dark active" aria-current="page">AI가격 예측</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

           

            <PredictTest />



            {/* Footer */}
            <Footer />

            {/* Back to top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top">
                <i className="bi bi-arrow-up"></i>
            </a>
        </div>
    );
};


export default Predict;