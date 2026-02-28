import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    axios
      .get(`http://localhost:8080/api/social/kakao?code=${code}`)
      .then(res => {
        localStorage.setItem("loginUser", JSON.stringify(res.data));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", res.data.nickname);


        alert(`${res.data.nickname}님 로그인 되었습니다`);
        navigate("/");
      })
      .catch(err => {
        alert("카카오 로그인 실패!");
        console.log(err);
      });
  }, []);

  return <p>로그인 처리 중...</p>;
};

export default KakaoRedirect;
