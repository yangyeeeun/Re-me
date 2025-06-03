import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(null); // 선택된 테마 객체 (id, name, imageUrl)

    // 로컬 스토리지에서 테마 불러오기 (새로고침 시에도 유지)
    useEffect(() => {
        const storedTheme = localStorage.getItem('selectedTheme');
        if (storedTheme) {
            setSelectedTheme(JSON.parse(storedTheme));
        }
    }, []);

    // 테마가 변경될 때마다 로컬 스토리지에 저장하고 CSS 변수/클래스 적용
    useEffect(() => {
        if (selectedTheme) {
            localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme));
            // CSS 변수를 동적으로 적용 (예시)
            document.documentElement.style.setProperty('--primary-color', selectedTheme.name === 'Blue Sky' ? '#007bff' : selectedTheme.name === 'Green Forest' ? '#28a745' : '#343a40');
            document.documentElement.style.setProperty('--background-color', selectedTheme.name === 'Blue Sky' ? '#f0f8ff' : selectedTheme.name === 'Green Forest' ? '#e6ffe6' : '#212529');
            document.documentElement.style.setProperty('--text-color', selectedTheme.name === 'Dark Night' ? '#f8f9fa' : '#333');

            // body에 테마 클래스 추가 (선택 사항)
            document.body.className = `${selectedTheme.name.toLowerCase().replace(' ', '-')}-theme`;
        } else {
            localStorage.removeItem('selectedTheme');
            // 기본 CSS 변수 및 클래스 제거
            document.documentElement.style.removeProperty('--primary-color');
            document.documentElement.style.removeProperty('--background-color');
            document.documentElement.style.removeProperty('--text-color');
            document.body.className = '';
        }
    }, [selectedTheme]);

    const selectTheme = async (themeId) => {
        try {
            const response = await fetch(`/api/themes/${themeId}`); // 백엔드 API 호출
            if (!response.ok) {
                throw new Error('Failed to fetch theme');
            }
            const themeData = await response.json();
            setSelectedTheme(themeData);
        } catch (error) {
            console.error('Error selecting theme:', error);
            // 에러 처리
        }
    };

    return (
        <ThemeContext.Provider value={{ selectedTheme, selectTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);