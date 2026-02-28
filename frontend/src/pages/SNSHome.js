import React, { useEffect, useState } from "react";
import api from "../api/api";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import "../styles/sns.css";

// 네비바
import Navbar from "../components/Navbar";

export default function SNSHome() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      {/* 상단 네비바 */}
      <Navbar />

      {/* SNS 전용 레이아웃 래퍼 */}
      <div className="sns-page">

        {/* SNS 콘텐츠 영역 */}
        <div className="sns-container">
          <button
            className="sns-write-btn"
            onClick={() => navigate("/sns/create")}
          >
            글 작성
          </button>

          {/* 🔥 PostCard가 바로 렌더링되는 영역 */}
          <div className="sns-post-list">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => navigate(`/sns/post/${post.id}`)}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
