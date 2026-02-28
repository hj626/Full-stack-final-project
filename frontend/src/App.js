import './App.css';
import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WOW from 'wow.js';
import 'wow.js/css/libs/animate.css';
// import OwlCarousel from 'react-owl-carousel3';
import About from './pages/About';
import Product from './pages/Product';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feature from './pages/Feature';
import Testimonial from './pages/Testimonial';
import Contact from './pages/Contact';
import Error from './pages/Error';
import { Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// 기본 페이지들
import Home from './pages/Home';
import MongoTestPage from './pages/MongoTestPage';
import SellerProductForm from './components/SellerProductForm';
import Predict from './pages/Predict';
import SellerProductForm from './pages/SellerProductForm';
import KakaoRedirect from "./pages/KakaoRedirect";
import NaverRedirect from "./pages/NaverRedirect";

import ProductDetailPage from './pages/ProductDetailPage';

// SNS 페이지들
import SNSHome from './pages/SNSHome';
import SNSPostDetail from './pages/SNSPostDetail';
import SNSPostCreate from './pages/SNSPostCreate';


function App() {

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="App">

      <RoutesWrapper/>
    </div>
  );
}

// AuthContext 안에서만 useContext 사용
const RoutesWrapper = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Product />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/testimonial" element={<Testimonial />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/sellerProduct" element={<SellerProductForm/>}/>
      <Route path="/predict" element={<Predict />} />
      <Route path="/seller/products" element={<SellerProductForm/>}/>
      <Route path='/products/detail/:productId' element={<ProductDetailPage/>}/>
      <Route path="/oauth/kakao" element={<KakaoRedirect />} />
      <Route path="/oauth/naver" element={<NaverRedirect />} />

      

        <Route path="/sns" element={<SNSHome />} />
        <Route path="/sns/post/:id" element={<SNSPostDetail />} />
        <Route path="/sns/create" element={<SNSPostCreate />} />

      <Route
        path="*"
        element={<Error />}
      />
    </Routes>
  );
};

export default App;
