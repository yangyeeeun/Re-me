import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // CSS 파일
import Banner from "../components/Banner/Banner";

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✨ 로그인 상태에 따라 자동 리다이렉트 (선택 사항)
  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // 로그인 시 이동할 페이지 (예: 대시보드)
    }
  }, [user, navigate]);

  // ✨ 카카오 로그인 처리
  const handleKakaoLogin = () => {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    
    // 🔽 콘솔에 값 확인
    console.log("KAKAO_REST_API_KEY:", KAKAO_REST_API_KEY);
    console.log("KAKAO_REDIRECT_URI:", KAKAO_REDIRECT_URI);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="home-page">
      {/* Banner는 최상단에 위치 */}
      <Banner hideIcons />
      
      {/* 로고 이미지 (필요하다면) */}
      <img src="/images/logo/logo.png" alt="Re:me 로고" className="logo" />

      {/* 로그인 상태에 따른 UI */}
      {!user ? (
        <div className="login-section">
          <button onClick={handleKakaoLogin} className="kakao-login-btn">
            <img
              src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png"
              alt="카카오 로그인"
            />
          </button>
        </div>
      ) : (
        <div className="welcome-section">
          <h1>환영합니다, {user.kakao_account.profile.nickname}님!</h1>
          <p>Re:me와 함께 추억을 남겨보세요.</p>
        </div>
      )}
    </div>
  );
 };

export default HomePage;