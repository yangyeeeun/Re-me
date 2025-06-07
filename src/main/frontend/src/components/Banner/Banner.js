import React, {useEffect, useState, useCallback} from 'react';
import { LuPencilLine } from "react-icons/lu";
import { RiMap2Line } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { AiOutlineBars } from "react-icons/ai";
import './Banner.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../context/AuthContext'; // 전역 사용자 정보
import IconButton from './IconButton'; // 재사용 가능한 아이콘 버튼 컴포넌트

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasNewMessages, setHasNewMessages] = useState(false);

  // useCallback으로 감싸기
  const checkNewMessages = useCallback(async () => {
    try {
      console.log("user.id:", user?.id);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/letters/inbox/new-messages-exist?userId=${user.id}`
      );
      setHasNewMessages(response.data.newMessages);
    } catch (error) {
      console.error("새 메시지 확인 중 오류 발생:", error);
      setHasNewMessages(false);
    }
  }, [user]);

  useEffect(() => {
    if(user) {
      checkNewMessages();
      const intervalId = setInterval(checkNewMessages, 30000);
      return () => clearInterval(intervalId);
    }
  }, [user, checkNewMessages]); // ✅ checkNewMessages 추가

  // ✨ 편지함 클릭 핸들러 (읽음 처리 API 호출) ✨
  const handleInboxClick = async () => {
    navigate('/inbox');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/letters/inbox/mark-as-read?userId=${user.id}`
      );
      setHasNewMessages(false);
    } catch (error) {
      console.error("메시지 읽음 처리 중 오류 발생:", error);
    }
  };

  return (
    <div className="banner">
      <div className="banner-inner">
        <div className="icon-circle">
          <span className="icon-text">
            <img 
              src="/images/logo/logo.png" 
              alt="logo" 
              className="logo-image"
            />
            Re:me
          </span>
        </div>
      </div>
      {/* 로그인된 사용자(user)가 있을 때만 아이콘 영역 렌더링 */}
      {user && (
        <div className="banner-right">
          <IconButton 
            icon={LuPencilLine} 
            onClick={() => navigate('/')} 
            className="icon-pencil"
          />
          <IconButton 
            icon={RiMap2Line} 
            onClick={() => navigate('/map')} 
            className="icon-map"
          />
          <IconButton 
            icon={TfiEmail} 
            onClick={handleInboxClick} 
            className="icon-email"
            hasDot={hasNewMessages}
          />
          <IconButton 
            icon={AiOutlineBars} 
            onClick={() => navigate('/list')} 
            className="icon-bar"
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
