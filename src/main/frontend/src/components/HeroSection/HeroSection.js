import React from "react";
import "./HeroSection.css";

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-content">
      <h1>당신의 추억을 담아보세요</h1>
      <p>Re:me 타임캡슐 서비스에 오신 것을 환영합니다.</p>
      <button className="cta-btn">시작하기</button>
    </div>
    <img src="/images/logo/logo.png" alt="logo" className="hero-img" />
  </section>
);

export default HeroSection;
