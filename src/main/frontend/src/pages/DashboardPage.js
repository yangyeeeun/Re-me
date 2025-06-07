import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/* 상단 배너 */}
      <Banner />

      {/* 행성 SVG */}
      <div className="planet-container">
        <button
          className="planet-btn"
          onClick={() => navigate("/themes")}
          aria-label="테마 선택으로 이동"
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <img 
            src="/images/planets/planet1.svg" 
            alt="Theme Planet" 
            className="planet-image"
          />
        </button>
        <button
          className="planet-btn"
          onClick={() => navigate("/list")}
          aria-label="캡슐 목록으로 이동"
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <img 
            src="/images/planets/planet2.svg" 
            alt="List Planet" 
            className="planet-image"
          />
        </button>
      </div>

      {/* 액션 버튼 */}
      <div className="button-group">
        <button 
          className="btn-theme"
          onClick={() => navigate("/themes")}
        >
          🎨 테마 선택하기
        </button>
        <button 
          className="btn-list"
          onClick={() => navigate("/list")}
        >
          📦 캡슐 목록보기
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
