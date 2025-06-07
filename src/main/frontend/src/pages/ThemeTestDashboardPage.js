// Dashboard -> ThemeTestDashboard로 이름 변경했습니다. 로그인 후 보여지는 대시보드와 혼동이 있을 것 같아서요...!

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeTestDashboardPage = () => {
    const { selectedTheme } = useTheme();

    return (
        <div style={{
            backgroundColor: 'var(--background-color, #ffffff)', // CSS 변수 사용
            color: 'var(--text-color, #333333)',
            padding: '20px',
            minHeight: '100vh',
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            <h1>대시보드</h1>
            <p>이 페이지는 선택된 테마에 따라 스타일이 적용됩니다.</p>
            {selectedTheme ? (
                <p>현재 적용된 테마: <strong>{selectedTheme.name}</strong></p>
            ) : (
                <p>테마가 선택되지 않았습니다.</p>
            )}
            <button style={{
                backgroundColor: 'var(--primary-color, #007bff)',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                테마 적용 버튼
            </button>
        </div>
    );
};

export default ThemeTestDashboardPage;