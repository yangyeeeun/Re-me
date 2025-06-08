import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 1. 로그인 상태 확인 (백엔드에서 사용자 정보 조회)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, { withCredentials: true })
      .then(res => setUser(res.data))
	  .catch(()=> setUser(null));
  }, []);

  // 2. 카카오 로그인 요청 함수 (fetch/axios 사용 X, 리다이렉트만)
  const loginWithKakao = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl; // ✅ 반드시 리다이렉트!
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginWithKakao }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
