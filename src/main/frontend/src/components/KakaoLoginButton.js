import React from "react";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

function KakaoLoginButton() {
  return (
    <a href={KAKAO_AUTH_URL}>
      <img
        src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png"
        alt="카카오로 로그인"
        style={{ height: 45 }}
      />
    </a>
  );
}

export default KakaoLoginButton;
