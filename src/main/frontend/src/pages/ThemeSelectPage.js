import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from "../components/Banner/Banner";
import {useNavigate} from "react-router-dom";

const ThemeSelectPage = () => {
    const [themes, setThemes] = useState([]);  // 테마 목록 저장
    const [selectedTheme, setSelectedTheme] = useState(null); // 현재 선택된 테마
    const navigate = useNavigate();

    useEffect(() => {
        // 백엔드에서 테마 목록 가져오기
        axios.get('/api/themes')
            .then(response => {
                setThemes(response.data);
            })
            .catch(error => {
                console.error('테마를 가져오는 중 오류 발생:', error);
            });
    }, []);

    const handleThemeClick = (theme) => {
        // 선택한 테마를 설정
        setSelectedTheme(theme);
    };

    const handleProceedClick = () => {
        if (!selectedTheme) {
            alert("테마를 먼저 선택해주세요!"); // 경고 메시지 띄우기
            return;
        }

        // 선택한 테마의 ID를 이용해 글 작성 페이지로 이동
        navigate(`/write?theme=${selectedTheme.id}`);
    };

    return (
        <div className="wrap">
            <Banner/>
            <div className="theme-selector">
                {/* 왼쪽 큰 이미지 */}
                <div className="left-panel">
                    {selectedTheme ? (
                        <img src={selectedTheme.imageUrl} alt={selectedTheme.name} />
                    ) : (
                        <p className="theme-color">테마를 선택하세요!</p>
                    )}
                </div>

                {/* 오른쪽 테마 선택 영역 */}
                <div className="right-panel">
                    <div className="theme-list">
                        {themes.map((theme, index) => (
                            <div key={theme.id} className="theme-item" onClick={() => handleThemeClick(theme)}>
                                <img src={theme.imageUrl} alt={theme.name} />
                                <p className="theme-name">{`테마 ` + theme.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className="write-button" onClick={handleProceedClick}>글 작성하기</button>
            </div>
        </div>
    );
};

export default ThemeSelectPage;
