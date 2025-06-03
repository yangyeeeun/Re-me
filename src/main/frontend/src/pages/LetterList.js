import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import Banner from "../components/Banner/Banner";
import "../App.css";
import "./LetterList.css"
import {useNavigate} from "react-router-dom";

const LetterList = () => {
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const gridWrapperRef = useRef(null); // 그리드 전체 래퍼의 ref
    const [itemPositions, setItemPositions] = useState([]); // 각 아이템의 계산된 위치 저장
    const navigate = useNavigate();

    // 캡슐 아이템의 고정된 너비와 높이, 그리고 원하는 간격 설정
    // 이 값들은 LetterList.css의 .capsule-item 스타일과 일치해야 합니다.
    const ITEM_WIDTH = 200;
    const ITEM_HEIGHT = 200;
    const HORIZONTAL_MARGIN = 40; // capsule-item의 좌우 margin (각 40px)
    const EFFECTIVE_ITEM_WIDTH = ITEM_WIDTH + (HORIZONTAL_MARGIN * 2); // 아이템이 차지하는 실제 가로 공간
    const VERTICAL_SPACING_BETWEEN_ROWS = 150; // 줄 간의 수직 간격
    const VERTICAL_OFFSET_PER_ITEM_IN_ROW = 150; // 같은 줄 내에서 각 아이템이 아래로 내려가는 정도

    const calculateItemPositions = useCallback(() => {
        if (!gridWrapperRef.current || capsules.length === 0) {
            setItemPositions([]);
            return;
        }

        const wrapperWidth = gridWrapperRef.current.offsetWidth;
        const maxItemsPerRow = Math.floor(wrapperWidth / EFFECTIVE_ITEM_WIDTH) || 1;

        const positions = [];
        let previousLeft;
        capsules.forEach((capsule, index) => {
            const row = Math.floor(index / maxItemsPerRow);
            const indexInRow = index % 5;

            const isEvenRow = row % 2 === 1; // 왼쪽 진행 줄
            const capsulesInThisRow = Math.min(capsules.length - row * maxItemsPerRow, maxItemsPerRow);
            const totalRowWidth = capsulesInThisRow * EFFECTIVE_ITEM_WIDTH;
            const baseLeft = (wrapperWidth - totalRowWidth) / 2;

            let left, top;
            const topOfRightMost = row * (ITEM_HEIGHT + VERTICAL_SPACING_BETWEEN_ROWS);
            const topOfMost = index * VERTICAL_SPACING_BETWEEN_ROWS;
            if (isEvenRow) {
                // 기준: 오른쪽 캡슐의 top 값
                const descendingIndex = indexInRow - capsulesInThisRow;
                if(indexInRow === 0){
                    left = previousLeft - (indexInRow + 1) * EFFECTIVE_ITEM_WIDTH;
                }else{
                    left = previousLeft - indexInRow * EFFECTIVE_ITEM_WIDTH;
                }
                top = topOfMost;

            } else {
                left = baseLeft + indexInRow * EFFECTIVE_ITEM_WIDTH;
                top = topOfRightMost + indexInRow * VERTICAL_OFFSET_PER_ITEM_IN_ROW;
            }

            positions.push({ left, top });
            previousLeft = left;
        });


        setItemPositions(positions);

        const maxTop = Math.max(0, ...positions.map(pos => pos.top + ITEM_HEIGHT));
        gridWrapperRef.current.style.height = `${maxTop + VERTICAL_SPACING_BETWEEN_ROWS}px`;
    }, [capsules, EFFECTIVE_ITEM_WIDTH, ITEM_HEIGHT, VERTICAL_SPACING_BETWEEN_ROWS, VERTICAL_OFFSET_PER_ITEM_IN_ROW]);


    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                const response = await axios.get('/api/letters'); // GET 요청
                setCapsules(response.data);
            } catch (err) {
                console.error("캡슐 데이터를 불러오는 중 오류 발생:", err);
                setError("캡슐 데이터를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchCapsules();
    }, []);

    useEffect(() => {
        calculateItemPositions();
        window.addEventListener('resize', calculateItemPositions);
        return () => window.removeEventListener('resize', calculateItemPositions);
    }, [calculateItemPositions]);

    if (loading) {
        return (
            <div className="app-container">
                <Banner />
                <div className="wrap">
                    <div className="loading-message">Loading capsules...</div>
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

    if (capsules.length === 0) {
        return (
            <div className="app-container">
                <Banner />
                <div className="wrap">
                    <div className="no-capsules-message">아직 생성된 캡슐이 없습니다.</div>
                </div>
            </div>
        );
    }

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
    const getLockIcon = () => '/images/icon/lock_icon.png';

    return (
        <div className="wrap">
            <Banner />
            <div className="letter-list-content">
                {/* ref를 .capsule-grid-wrapper에 연결 */}
                <div ref={gridWrapperRef} className="capsule-grid-wrapper">
                    {capsules.map((capsule, index) => {
                        const formattedOpenDate = moment(capsule.openDate).format('YY. MM. DD');
                        const isPastOpenDate = moment(capsule.openDate).isBefore(moment());
                        const displayLock = !capsule.isOpened && !isPastOpenDate;

                        const position = itemPositions[index] || { left: 0, top: 0 };

                        return (
                            <div
                                key={index}
                                className="capsule-item"
                                style={{
                                    position: 'absolute', // JS로 위치를 제어하므로 absolute
                                    left: `${position.left}px`,
                                    top: `${position.top}px`,
                                    transition: 'left 0.5s ease-out, top 0.5s ease-out', // 부드러운 전환 효과
                                }}
                                onClick={() => {
                                    if (displayLock) {
                                        alert("아직 열람할 수 없습니다.");
                                    } else {
                                        // 열람 가능한 페이지로 이동
                                        navigate(`/capsule/${capsule.id}`)
                                    }
                                }}
                            >
                                <div className="capsule-visual">
                                    <img
                                        src={getThemeImage(capsule.themeId)}
                                        alt={`Capsule Theme ${capsule.themeId}`}
                                        className="capsule-base-image"
                                    />
                                    <span className="open-date-overlay">{formattedOpenDate}</span>
                                    {displayLock && (
                                        <img
                                            src={getLockIcon()}
                                            alt="Locked"
                                            className="lock-icon-overlay"
                                        />
                                    )}
                                </div>
                                <div className="capsule-location-info">
                                    <span className="location-text">{capsule.locationName}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LetterList;