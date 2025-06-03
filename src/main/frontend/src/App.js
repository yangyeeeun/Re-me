import React from 'react';
import ThemeSelectPage from './pages/ThemeSelectPage'; // ThemeSelector 컴포넌트 가져오기
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WritePage from "./pages/WritePage";
import LetterList from "./pages/LetterList";
import ReadLetter from "./pages/ReadLetter";
import MessagePage from "./pages/MessagePage"; // CSS 스타일링 적용

const App = () => {
    return (
        <BrowserRouter>
            <div className="background" />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<ThemeSelectPage />} />
                    <Route path="/write" element={<WritePage />} />
                    <Route path="/list" element={<LetterList />} />
                    <Route path="/capsule/:id" element={<ReadLetter />} />
                    <Route path="/inbox" element={<MessagePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
