import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/sns.css";

import Navbar from "../components/Navbar";

export default function SNSPostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    api.post("/posts", formData).then(() => navigate("/sns"));
  };

  return (
    <>
     <Navbar />
    <div className="sns-create-container">
      <div className="sns-create-box">
        <h2>글 작성</h2>

     {/* 이미지 업로드 */}
      <label className="sns-label">이미지 업로드</label>

      <div className="sns-file-upload">

        {/* 커스텀 버튼 */}
        <label htmlFor="imageUpload" className="sns-file-btn">
          이미지 선택
        </label>

        {/* 숨겨진 input */}
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="sns-file-input"
        />

            {/* 파일 이름 표시 */}
            <span className="sns-file-name">
              {imageFile ? imageFile.name : "선택된 파일 없음"}
            </span>

          </div>


        {/* 미리보기 */}
        {preview && (
          <img src={preview} alt="preview" className="sns-preview" />
        )}

        {/* 제목 */}
        <label className="sns-label">제목 입력</label>
        <input
          className="sns-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />

        {/* 내용 */}
        <label className="sns-label">내용 입력</label>
        <textarea
          className="sns-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        ></textarea>

        <button className="sns-submit-btn" onClick={submit}>
          등록하기
        </button>
      </div>
    </div>
    </>
  );
}
