import React, { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap} from "react-kakao-maps-sdk";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import "./LocationMapPage.css";

function LocationMapPage() {
	const [locations, setLocations] = useState([]); // DB에서 받아온 위치 데이터
	const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 마커 정보
	const [mapCenter, setMapCenter] = useState({ // 지도 초기 중심 좌표
		lat: 37.5665,
		lng: 126.9780,
	});

    useEffect(() => {
        // 이미 로드된 경우 중복 로딩 방지
        if (window.kakao && window.kakao.maps) return;

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer`;
        script.async = true;
        script.onload = () => {
            // SDK가 로드되면 kakao.maps를 사용할 수 있게 초기화
            window.kakao.maps.load(() => {
                console.log("Kakao Maps SDK loaded");
            });
        };

        document.head.appendChild(script);
    }, []);


    // 위치 데이터 불러오기
	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_BASE_URL}/api/locations`
				);
				setLocations(response.data);

				// 위치 데이터가 있으면 첫 번째 위치를 지도 중심으로 설정
				if (response.data.length > 0) {
					setMapCenter({
						lat: response.data[0].latitude,
						lng: response.data[0].longitude,
					});
				}
			} catch (error) {
				console.error("위치 데이터 불러오기 실패:", error);
				alert("위치 정보를 불러올 수 없습니다.");
			}
		};

		fetchLocations();
	}, []);

	return (
		<div className="location-map-page">
			<Banner />
			<div className="map-section">
				<h2 className="map-title">🌍 모든 편지 위치 보기</h2>

				{/* 지도 컨테이너 */}
				<div className="map-container">
					<Map
						center={mapCenter}
						style={{ width: "100%", height: "500px", borderRadius: "20px" }}
						level={3}
						autoload={false}
					>
						{/* 모든 위치에 마커 표시 */}
						{locations.map((location) => (
							<MapMarker
								key={location.id}
								position={{ lat: location.latitude, lng: location.longitude }}
								onClick={() => setSelectedLocation(location)}
								image={{
									src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // 커스텀 마커 이미지
									size: { width: 40, height: 40 },
								}}
							/>
						))}

						{/* 선택된 마커 정보 표시 */}
						{selectedLocation && (
							<CustomOverlayMap
								position={{
									lat: selectedLocation.latitude,
									lng: selectedLocation.longitude,
								}}
								yAnchor={2.5} // 오버레이 위치 조정
							>
								<div className="location-info-window">
									<h3>{selectedLocation.name}</h3>
									<p>
										위도: {selectedLocation.latitude.toFixed(5)}
										<br />
										경도: {selectedLocation.longitude.toFixed(5)}
									</p>
									<button
										className="close-btn"
										onClick={() => setSelectedLocation(null)}
									>
										×
									</button>
								</div>
							</CustomOverlayMap>
						)}
					</Map>
				</div>

				{/* 위치 목록 (하단 카드 형태) */}
				<div className="location-card-list">
					{locations.map((location) => (
						<div
							key={location.id}
							className="location-card"
							onClick={() => setSelectedLocation(location)}
						>
							<h4>{location.name}</h4>
							<div className="coordinates">
								<span>📍</span>
								{location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LocationMapPage;