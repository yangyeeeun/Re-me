import React from 'react';
import ThemeSelectPage from './pages/ThemeSelectPage'; // ThemeSelector 컴포넌트 가져오기
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WritePage from "./pages/WritePage";
import LetterList from "./pages/LetterList";
import ReadLetter from "./pages/ReadLetter";
import MessagePage from "./pages/MessagePage"; // CSS 스타일링 적용]
import HomePage from "./pages/HomePage";
import LocationMapPage from "./pages/LocationMapPage";
import { AuthProvider } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
    return (
		<AuthProvider>
	        <BrowserRouter>
	            <div className="background" />
	            <div className="app-container">
	                <Routes>
	                    <Route path="/themes" element={<ThemeSelectPage />} />
	                    <Route path="/write" element={<WritePage />} />
	                    <Route path="/list" element={<LetterList />} />
	                    <Route path="/capsule/:id" element={<ReadLetter />} />
	                    <Route path="/inbox" element={<MessagePage />} />
						<Route path="/map" element={<LocationMapPage />} />
						<Route path="/" element={<HomePage />} />
						<Route path="/dashboard" element={<DashboardPage/>}/>
	                </Routes>
	            </div>
	        </BrowserRouter>
		</AuthProvider>
    );
};

export default App;
