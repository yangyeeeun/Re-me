// 여러 마커 + 정보창 + 커스텀 오버레이
import React, { useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import Banner from "../components/Banner/Banner";
import "./LocationMapPage.css";

const markers = [
  { lat: 37.5665, lng: 126.9780, message: "서울시청에서 쓴 편지" },
  { lat: 37.5700, lng: 126.9769, message: "경복궁에서 쓴 편지" },
];

function LocationMapPage() {
  const [info, setInfo] = useState(null);

  return (
    <div className="location-map-page">
      <Banner />
      <div className="map-section">
        <h2 className="map-title">🌍 편지를 쓴 위치를 한눈에!</h2>
        <div className="map-container">
          <Map
            center={{ lat: 37.5665, lng: 126.9780 }}
            style={{ width: "100%", height: "400px", borderRadius: "20px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
            level={3}
          >
            {markers.map((m, i) => (
              <MapMarker
                key={i}
                position={{ lat: m.lat, lng: m.lng }}
                onClick={() => setInfo(m)}
                animation={1} // 1: BOUNCE 애니메이션
              />
            ))}
            {info && (
              <CustomOverlayMap position={{ lat: info.lat, lng: info.lng }}>
                <div className="fancy-overlay">{info.message}</div>
              </CustomOverlayMap>
            )}
          </Map>
        </div>
        {/* fancy 카드 리스트 예시 */}
        <div className="card-list">
          {markers.map((m, i) => (
            <div key={i} className="fancy-card">
              <h3>✉️ {m.message}</h3>
              <p>위치: {m.lat}, {m.lng}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default LocationMapPage;
