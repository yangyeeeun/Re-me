import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom'; // react-router-dom 설치 필요

const ThemeSelectPage = () => {
    const [themes, setThemes] = useState([]);
    const { selectedTheme, selectTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/themes`); // 백엔드 API 호출
                if (!response.ok) {
                    throw new Error('Failed to fetch themes');
                }
                const data = await response.json();
                setThemes(data);
            } catch (error) {
                console.error('Error fetching themes:', error);
            }
        };
        fetchThemes();
    }, []);

    const handleSelectTheme = async (themeId) => {
        await selectTheme(themeId);
        navigate('/dashboard'); // 테마 선택 후 이동할 페이지
    };

    return (
        <div>
            <h1>테마 선택</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {themes.map((theme) => (
                    <div
                        key={theme.id}
                        style={{
                            border: `2px solid ${selectedTheme && selectedTheme.id === theme.id ? 'blue' : 'transparent'}`,
                            padding: '15px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: '#f8f8f8',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => handleSelectTheme(theme.id)}
                    >
                        <h3>{theme.name}</h3>
                        <img src={theme.imageUrl} alt={theme.name} style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                    </div>
                ))}
            </div>
            {selectedTheme && (
                <p style={{ marginTop: '20px', fontSize: '1.2em' }}>
                    현재 선택된 테마: <strong>{selectedTheme.name}</strong>
                </p>
            )}
        </div>
    );
};

export default ThemeSelectPage;