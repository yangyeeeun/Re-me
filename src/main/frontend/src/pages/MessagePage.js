// src/pages/MessagePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Banner from "../components/Banner/Banner";
import "../App.css"; // 전역 스타일
import "./MessagePage.css"; // MessagePage 전용 스타일

const MessagePage = () => {
    const [openedCapsules, setOpenedCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOpenedCapsules = async () => {
            try {
                setLoading(true);
                setError(null);
                // 백엔드의 /api/letters/inbox 엔드포인트 호출
                const response = await axios.get('/api/letters/inbox');
                setOpenedCapsules(response.data);
            } catch (err) {
                console.error("열린 캡슐 목록을 불러오는 중 오류 발생:", err);
                setError("열린 캡슐 목록을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchOpenedCapsules();
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    const handleCapsuleClick = (id) => {
        navigate(`/capsule/${id}`); // 해당 캡슐의 상세 페이지로 이동
    };

    const getThemeImage = (themeId) => {
        switch (themeId) {
            case 1: return '/images/themes/happy.png';
            case 2: return '/images/themes/surprise.png';
            case 3: return '/images/themes/sad.png';
            case 4: return '/images/themes/enjoy.png';
            case 5: return '/images/themes/shiver.png';
            case 6: return '/images/themes/calm.png';
            case 7: return '/images/themes/nervous.png';
            case 8: return '/images/themes/upset.png';
            default: return '/images/elements/ufo.png';
        }
    };

    if (loading) {
        return (
            <div className="app-container">
                <Banner />
                <div className="wrap">
                    <div className="loading-message">열린 캡슐 목록을 불러오는 중...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <Banner />
                <div className="wrap">
                    <div className="error-message">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="wrap">
            <Banner />
            <div className="message-page-container">
                <h2>도착한 타임캡슐</h2>
                {openedCapsules.length === 0 ? (
                    <p className="no-messages-message">아직 열린 캡슐이 없습니다.</p>
                ) : (
                    <div className="opened-capsules-grid">
                        {openedCapsules.map(capsule => (
                            <div
                                key={capsule.id}
                                className="opened-capsule-item"
                                onClick={() => handleCapsuleClick(capsule.id)}
                            >
                                <img
                                    src={getThemeImage(capsule.themeId)}
                                    alt={`Capsule Theme ${capsule.themeId}`}
                                    className="opened-capsule-image"
                                />
                                <div className="opened-capsule-info">
                                    <h3>{capsule.title}</h3>
                                    <p>열린 날짜: {moment(capsule.openDate).format('YYYY. MM. DD')}</p>
                                    <p className="location-text">{capsule.locationName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagePage;