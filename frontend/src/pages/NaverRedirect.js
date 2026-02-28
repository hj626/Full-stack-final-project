import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NaverRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");

    axios
      .get(`http://localhost:8080/api/social/naver?code=${code}&state=${state}`)
      .then(res => {
        localStorage.setItem("loginUser", JSON.stringify(res.data));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", res.data.nickname);

        alert(`${res.data.nickname}님 로그인 되었습니다`);
        navigate("/");
      })
      .catch(err => {
        alert("네이버 로그인 실패!");
        console.log(err);
      });
  }, []);

  return <p>로그인 처리 중...</p>;
};

export default NaverRedirect;
