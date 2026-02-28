import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    userId: "",            // 🔥 추가
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("비밀번호가 일치하지 않습니다.");
    }

    try {
      await axios.post("http://localhost:8080/api/member/signup", {
        userId: form.userId,
        name: form.name,
        email: form.email,
        password: form.password,
        nickname: form.nickname,
        phone: form.phone,
        provider: "normal",
      });

      alert("회원가입 완료! 로그인해주세요.");
      window.location.href = "/login";
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("회원가입 실패. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="이름" onChange={handleChange} required />
        <input type="text" name="userId" placeholder="아이디" onChange={handleChange} required />
        <input type="email" name="email" placeholder="이메일" onChange={handleChange} required />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} required />
        <input type="text" name="nickname" placeholder="닉네임" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="전화번호" onChange={handleChange} required />

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="signup-btn">회원가입</button>
      </form>

      <p className="go-login">
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </p>
    </div>
  );
};

export default Signup;
