import React, {useEffect, useState} from 'react';
import { LuPencilLine } from "react-icons/lu";
import { RiMap2Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { AiOutlineBars } from "react-icons/ai";
import './Banner.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Banner = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [hasNewMessages, setHasNewMessages] = useState(false);

    const checkNewMessages = async () => {
        try {
            // userId는 실제 로그인 구현 시 동적으로 가져와야 합니다.
            // 현재는 "defaultUser"로 고정하여 개발 편의성을 높였습니다.
            const response = await axios.get('/api/letters/inbox/new-messages-exist?userId=defaultUser');
            setHasNewMessages(response.data.newMessages);
            console.log("Checked new messages:", response.data.newMessages);
        } catch (error) {
            console.error("새 메시지 확인 중 오류 발생:", error);
            setHasNewMessages(false); // 에러 발생 시 점 표시 안 함
        }
    };

    // ✨ 컴포넌트 마운트 시, 그리고 주기적으로 새로운 메시지 확인 ✨
    useEffect(() => {
        checkNewMessages(); // 초기 로드 시 한 번 실행

        // 30초마다 새로운 메시지 확인 (조절 가능)
        const intervalId = setInterval(checkNewMessages, 30000);

        // 컴포넌트 언마운트 시 인터벌 클리어
        return () => clearInterval(intervalId);
    }, []);

    const handleInboxClick = async () => {
        navigate('/inbox'); // /inbox 페이지로 이동

        // ✨ /inbox로 이동 후, 새로운 메시지를 "읽음" 처리 요청 ✨
        // (사용자가 메시지를 확인했으므로, 다음 번에는 점이 사라지도록)
        try {
            await axios.post('/api/letters/inbox/mark-as-read?userId=defaultUser');
            setHasNewMessages(false); // UI에서도 바로 점 제거
            console.log("New messages marked as read.");
        } catch (error) {
            console.error("메시지 읽음 처리 중 오류 발생:", error);
        }
    };

    // 각 아이콘에 대한 클릭 핸들러 함수
    const handlePencilClick = () => {
        navigate('/');
    };

    const handleMapClick = () => {
        navigate('/map');
    };

    const handleEmailClick = () => {
        navigate('/inbox');
    };

    const handleBarClick = () => {
        navigate('/list');
    };

    return(
        <div className="banner">
            <div className="banner-inner">
                <div className="icon-circle">
                    <span className="icon-text">
                        <img src="/images/logo/logo.png" alt="logo" className="logo-image"/>
                        Re:me
                    </span>
                </div>
            </div>
            <div className="banner-right">
                <div  className="icon-button icon-pencil" onClick={handlePencilClick}>
                    <LuPencilLine />
                </div >
                <div  className="icon-button icon-map" onClick={handleMapClick}>
                    <RiMap2Line />
                </div >
                <div  className="icon-button icon-email" onClick={handleEmailClick}>
                    <TfiEmail />
                    {hasNewMessages && <span className="new-message-dot"></span>}
                </div >
                <div  className="icon-button icon-bar" onClick={handleBarClick}>
                    <AiOutlineBars />
                </div >
            </div>
        </div>
    );
};

export default Banner;