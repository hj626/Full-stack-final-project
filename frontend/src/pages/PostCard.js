import React from "react";
import "../styles/postcard.css";

const BACKEND_URL = "http://localhost:8080";

// 날짜 포맷 함수 ...
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;

  const weeks = Math.floor(days / 7);
  return `${weeks}주 전`;
};

const formatViews = (num) => {
  if (!num) return 0;
  if (num < 1000) return num;
  if (num < 10000) return (num / 1000).toFixed(1) + "천";
  return (num / 10000).toFixed(1) + "만";
};

export default function PostCard({ post, onClick }) {

  const postId = post._id || post.id;
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
  const isLiked = likedPosts.includes(postId);
  
  return (
    <div className="mag-card" onClick={onClick}>
      <div className="mag-image-box">
        <img
          src={post.imageUrl ? `${BACKEND_URL}${post.imageUrl}` : "/defaultImage.jpg"}
          className="mag-image"
          alt="post"
        />
      </div>

      <div className="mag-content">
        <h3 className="mag-title">{post.title}</h3>
        <p className="mag-desc">{post.content.slice(0, 60)}...</p>

        <div className="mag-meta">
          <span>{formatDate(post.createdAt)}</span>

          <span>
            <i className="fa fa-eye"></i> {formatViews(post.views)}
          </span>
          <span>
            <i className="fa fa-comment-o"></i> {post.commentCount || 0}
          </span>

          <span className="mag-like">
            {isLiked ? "❤️" : "🤍"} {post.likeCount || 0}
          </span>

          <span className="mag-category">
            {post.category || "기타"}
          </span>
        </div>
      </div>
    </div>
  );
}
