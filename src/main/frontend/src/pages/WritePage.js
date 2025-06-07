import Banner from "../components/Banner/Banner";
import React, {useState,useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import '../pages/WritePage.css';

const WritePage = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("theme"); // URL에서 theme ID 가져오기
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [title, setTitle] = useState('');
    const[content, setContent] = useState('');
    const [locationName, setLocationName] = useState('');
    const [openDate, setOpenDate] = useState('');
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        console.log("현재 themeId 값:", id);
 			axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/themes/${id}`)
             .then(response => {
                setSelectedTheme(response.data);
            })
            .catch(error => {
                console.error(`테마 정보를 가져오는 중 오류 발생: `+ error);
            });
    }, [id]);

    useEffect(() => {
        // Geolocation API 사용
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                }
            );
        } else {
            console.error("브라우저가 위치 정보를 지원하지 않습니다.");
        }
    }, []);

    const handleLocationChange = (event) => {
        setLocationName(event.target.value);
    };

    const handleDateChange = (event) => {
        setOpenDate(event.target.value);
    };
    const handleMediaUpload = (event) => {
        const file = event.target.files[0];

        // 미리보기 URL 설정
        if (file) {
            setMedia(file);
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        }
    };

    const handleSubmit = async () => {
        if (!title || !content || !locationName || !openDate) {
            alert('제목, 내용, 위치 정보, 열람 날짜를 모두 입력해주세요!');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('id', id);
        formData.append('locationName', locationName);
        formData.append('openDate', openDate);
        formData.append('themeId', id);

        if (latitude && longitude) {
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
        } else {
            console.warn("위치 정보가 없습니다. locationName만 전송됩니다.");
        }

        if(media){
            formData.append('media', media);
        }

        try{
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/letter`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if (response.data.media) {
                setPreviewUrl(`/${response.data.media}`);
            }

            alert('글이 저장되었습니다!');
            navigate(`/list`);
        }catch(error){
            console.error('타임캡슐 저장 중 오류 발생:',error);
        }
    };
    return(
        <div className="wrap">
            <Banner/>
            <div className="write-container">
                {/* 선택한 테마의 이미지 */}
                <div className="theme-image">
                    {selectedTheme && <img src={selectedTheme.imageUrl} alt={selectedTheme.name} />}
                    <div className="button-group">
                        <label className="field">📍 위치 정보 입력:</label>
                        <input type="text" placeholder="위치를 입력하세요" value={locationName} onChange={handleLocationChange} />

                        <label className="field">📅 캡슐 열람 날짜 선택:</label>
                        <input type="datetime-local" value={openDate} onChange={handleDateChange} />
                    </div>
                </div>

                {/* 글 작성 폼 */}
                <div className="write-form">
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        className="form-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input type="file" accept="image/*, video/*" onChange={handleMediaUpload} className="file-select" />
                    {/* 미리보기 (이미지 또는 영상) */}
                    {previewUrl && (
                        <div className="preview-container">
                            {media.type.startsWith("image") ? (
                                <img src={previewUrl} alt="미리보기" className="preview-image" />
                            ) : (
                                <video src={previewUrl} controls className="preview-video" />
                            )}
                        </div>
                    )}
                    <textarea
                        placeholder="내용을 입력하세요"
                        className="file-text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className='save-button' onClick={handleSubmit}>저장하기</button>
                </div>
            </div>
        </div>
    );
};

export default WritePage;