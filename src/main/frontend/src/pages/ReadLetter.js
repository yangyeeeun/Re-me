import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import Banner from "../components/Banner/Banner";
import "../App.css"; // 전역 스타일
import "./ReadLetter.css"; // ReadLetter 전용 스타일

const ReadLetter = () => {
    const { id } = useParams(); // URL 파라미터에서 id 가져오기
    const navigate = useNavigate(); // 뒤로가기 버튼에 사용

    const [letter, setLetter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLetterDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`/api/letter/${id}`);

                // ✨ isOpened 값을 별도로 추출 ✨
                const { isOpened: initialIsOpened, ...dataToShow } = response.data;
                setLetter(dataToShow);

                // ✨ 열람 날짜가 지났고, 아직 열리지 않았다면 업데이트 요청 보내기 ✨
                const now = moment();
                const openDateMoment = moment(response.data.openDate);

                if (!initialIsOpened && openDateMoment.isBefore(now)) {
                    console.log(`Capsule ID ${id} is past its open date and not opened. Sending update request.`);
                    try {
                        // 백엔드에 isOpened를 true로 업데이트 요청
                        await axios.put(`/api/letter/${id}/open`);
                        // 상태를 직접 업데이트하여 UI에 즉시 반영 (다시 전체 데이터를 불러올 필요 없이)
                        setLetter(prevLetter => ({ ...prevLetter, isOpened: true }));
                        console.log(`Capsule ID ${id} successfully marked as opened.`);
                    } catch (updateErr) {
                        console.error(`Failed to update isOpened for capsule ID ${id}:`, updateErr);
                        // 사용자에게는 에러를 보여주지 않아도 무방 (백그라운드 작업이므로)
                    }
                }

            } catch (err) {
                console.error(`캡슐 ID ${id}의 상세 데이터를 불러오는 중 오류 발생:`, err);
                setError("캡슐 상세 정보를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLetterDetails();
        }
    }, [id]); // id가 변경될 때마다 다시 불러오기

    // 테마 ID에 따른 이미지 경로 매핑 (LetterList와 동일)
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
            default: return '/images/elements/ufo.png'; // 기본 테마 이미지
        }
    };

    if (loading) {
        return (
            <div className="app-container">
                <Banner />
                <div className="wrap">
                    <div className="loading-message">캡슐 내용을 불러오는 중...</div>
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
                    <button onClick={() => navigate(-1)} className="back-button">뒤로 가기</button>
                </div>
            </div>
        );
    }

    if (!letter) {
        return (
            <div className="app-container">
                <Banner />
                <div className="wrap">
                    <div className="no-letter-message">캡슐 내용을 찾을 수 없습니다.</div>
                    <button onClick={() => navigate(-1)} className="back-button">뒤로 가기</button>
                </div>
            </div>
        );
    }

    return (
        <div className="wrap">
            <Banner />
            <div className="read-container"> {/* ✨ write-container 대신 read-container 사용 ✨ */}
                {/* 왼쪽 영역: 테마 이미지 및 위치/날짜 정보 */}
                <div className="theme-image-display"> {/* theme-image 대신 theme-image-display */}
                    {letter.themeId && <img src={getThemeImage(letter.themeId)} alt={`테마 이미지 ${letter.themeId}`} />}
                    <div className="info-group"> {/* button-group 대신 info-group */}
                        <label className="field">📍 위치:</label>
                        <span className="display-value">{letter.locationName}</span> {/* input 대신 span으로 값 표시 */}

                        <label className="field">📅 작성 날짜:</label>
                        <span className="display-value">
                            {moment(letter.createdAt).format('YYYY년 MM월 DD일 HH시 mm분')}
                        </span> {/* input 대신 span으로 값 표시 */}
                    </div>
                    <button className='back-button' onClick={() => navigate(-1)}>목록으로</button> {/* 저장 버튼 대신 뒤로가기 버튼 */}
                </div>

                {/* 오른쪽 영역: 제목, 미디어, 내용 */}
                <div className="read-form"> {/* write-form 대신 read-form */}
                    <h1 className="form-title-display">{letter.title}</h1> {/* input 대신 h1으로 제목 표시 */}

                    {letter.media && (
                        <div className="media-display-container"> {/* preview-container 대신 media-display-container */}
                            {letter.media.endsWith('.png') || letter.media.endsWith('.jpg') || letter.media.endsWith('.jpeg') || letter.media.endsWith('.gif') ? (
                                <img src={letter.media} alt="첨부 미디어" className="display-media-image" />
                            ) : (
                                <video src={letter.media} controls className="display-media-video" />
                            )}
                        </div>
                    )}
                    <p className="file-text-display">{letter.content}</p> {/* textarea 대신 p로 내용 표시 */}
                </div>
            </div>
        </div>
    );
}

export default ReadLetter;