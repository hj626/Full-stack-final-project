import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 모달 ON/OFF
  const [showFindId, setShowFindId] = useState(false);
  const [showFindPw, setShowFindPw] = useState(false);

  // 아이디 찾기용
  const [findName, setFindName] = useState("");
  const [findPhone, setFindPhone] = useState("");
  const [findIdEmail, setFindIdEmail] = useState("");
  const [findIdCode, setFindIdCode] = useState("");
  const [foundUserId, setFoundUserId] = useState("");

  // 비밀번호 찾기용
  const [pwName, setPwName] = useState("");
  const [pwUserId, setPwUserId] = useState("");
  const [pwEmail, setPwEmail] = useState("");
  const [pwCode, setPwCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwResetStep, setPwResetStep] = useState(1);

  // ------------------------
  // 로그인 제출
  // ------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:8080/api/member/login", {
        userId,
        password,
      });

      alert("로그인 성공!");
      localStorage.setItem("loginUser", JSON.stringify(res.data));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "username",
        res.data.nickname || res.data.name || userId
      );
      window.location.href = "/";
    } catch (err) {
      setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

// 아이디 찾기: 인증번호 보내기
const sendFindIdCode = async () => {
  try {
    await axios.post(
      "http://localhost:8080/api/account/find-id/send-code",
      {
        name: findName,
        phone: findPhone
      }
    );
    alert("인증번호가 발송되었습니다.");
  } catch (error) {
    console.error(error);
    alert("전송 실패. 다시 시도해주세요.");
  }
};





  // ------------------------
  // 아이디 찾기: 인증 확인 → userId 받기
  // ------------------------
  const verifyFindIdCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/account/find-id/verify",
        null,
        {
          params: { email: findIdEmail, code: findIdCode },
        }
      );
      setFoundUserId(res.data);
      alert("인증 성공! 아이디를 확인하세요.");
    } catch (err) {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  // ------------------------
  // 비밀번호 찾기: 인증번호 발송
  // ------------------------
  const sendFindPwCode = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/account/find-pw/send-code",
        null,
        {
          params: { name: pwName, userId: pwUserId },
        }
      );
      alert("이메일로 인증번호를 발송했습니다.");
      setPwEmail("dummy@email.com"); // 백엔드에서 email 리턴되면 실제값 설정
      setPwResetStep(2);
    } catch (err) {
      alert("일치하는 회원이 없습니다.");
    }
  };

  // ------------------------
  // 비밀번호 찾기: 비밀번호 재설정
  // ------------------------
  const resetPassword = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/account/find-pw/reset",
        null,
        {
          params: {
            userId: pwUserId,
            email: pwEmail,
            code: pwCode,
            newPassword: newPw,
          },
        }
      );
      alert("비밀번호가 재설정되었습니다. 다시 로그인해주세요.");
      setShowFindPw(false);
      setPwResetStep(1);
    } catch (err) {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>

      <form onSubmit={handleSubmit}>
        <label>아이디</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit">로그인</button>
      </form>

      <button className="signup-btn" onClick={() => navigate("/signup")}>
        회원가입
      </button>

      {/* ---------------------------- */}
      {/* 아이디 / 비밀번호 찾기 버튼 */}
      {/* ---------------------------- */}
      <div className="find-links">
        <span onClick={() => setShowFindId(true)}>아이디 찾기</span> |{" "}
        <span onClick={() => setShowFindPw(true)}>비밀번호 찾기</span>
      </div>

      {/* ---------------------------- */}
      {/* 카카오 / 네이버 로그인 */}
      {/* ---------------------------- */}
      <button
        className="social-btn kakao-btn"
        onClick={() => {
          window.location.href =
            "https://kauth.kakao.com/oauth/authorize?client_id=96a4a7dfe35ee2e71a6d030c21bfacec&redirect_uri=http://localhost:3000/oauth/kakao&response_type=code";
        }}
      >
        <span className="social-icon">🗨️</span>
        카카오 로그인
      </button>

      <button
        className="social-btn naver-btn"
        onClick={() => {
          window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=b3OBagSlwW4Riy478hl0&redirect_uri=http://localhost:3000/oauth/naver&state=hURfwxHrsB`;
        }}
      >
        <span className="social-icon">🅝</span>
        네이버 로그인
      </button>

      {/* ---------------------------- */}
      {/*    아이디 찾기 모달          */}
      {/* ---------------------------- */}
      {showFindId && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>아이디 찾기</h3>

            {!foundUserId ? (
              <>
                <input
                  //type="text"input
                  placeholder="이름"
                  value={findName}
                  onChange={(e) => setFindName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="전화번호"
                  value={findPhone}
                  onChange={(e) => setFindPhone(e.target.value)}
                />

                <button onClick={sendFindIdCode}>인증번호 보내기</button>

                <input
                  type="text"
                  placeholder="인증번호"
                  value={findIdCode}
                  onChange={(e) => setFindIdCode(e.target.value)}
                />
                <button onClick={verifyFindIdCode}>확인</button>
              </>
            ) : (
              <div className="result-box">
                <p>회원님의 아이디는</p>
                <h2>{foundUserId}</h2>
              </div>
            )}

            <button className="close-btn" onClick={() => setShowFindId(false)}>
              닫기
            </button>
          </div>
        </div>
      )}

    

      {showFindPw && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>비밀번호 찾기</h3>

            {pwResetStep === 1 && (
              <>
                <input
                  type="text"
                  placeholder="이름"
                  value={pwName}
                  onChange={(e) => setPwName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="아이디"
                  value={pwUserId}
                  onChange={(e) => setPwUserId(e.target.value)}
                />
                <button onClick={sendFindPwCode}>인증번호 보내기</button>
              </>
            )}

            {pwResetStep === 2 && (
              <>
                <input
                  type="text"
                  placeholder="인증번호"
                  value={pwCode}
                  onChange={(e) => setPwCode(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                />
                <button onClick={resetPassword}>비밀번호 재설정</button>
              </>
            )}

            <button className="close-btn" onClick={() => setShowFindPw(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
