import React from "react";
import "../styles/sns.css";

export default function PostCard({ post, onClick }) {
  return (
    <div className="sns-post-card" onClick={onClick}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
    </div>
  );
}
