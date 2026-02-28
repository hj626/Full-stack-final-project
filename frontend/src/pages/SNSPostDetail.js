import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/sns.css";

export default function SNSPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // 좋아요 상태
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 좋아요 저장 키
  const likeKey = `liked_post_${id}`;

 // 게시글 + 댓글 불러오기
useEffect(() => {
  api.get(`/posts/${id}`).then((res) => {
    setPost(res.data);
    setLikeCount(res.data.likeCount || 0);
  });

  api.get(`/comments/${id}`).then((res) => {
    setComments(res.data);
  });
}, [id]);


// 좋아요 여부 로컬스토리지에서 불러오기 (이걸 분리해야 함)
useEffect(() => {
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
  setLiked(likedPosts.includes(id));
}, [id]);


  // 댓글 등록
  const submitComment = () => {
    if (!comment.trim()) return;

    api
      .post(`/comments`, {
        postId: id,
        content: comment,
      })
      .then(() => {
        setComment("");
        return api.get(`/comments/${id}`);
      })
      .then((res) => setComments(res.data));
  };


  // 좋아요 토글
const toggleLike = () => {
  api.post(`/likes/post/${id}`).then((res) => {
    setLikeCount(res.data.likeCount);

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

    if (liked) {
      // 좋아요 취소
      const updated = likedPosts.filter(pid => pid !== id);
      localStorage.setItem("likedPosts", JSON.stringify(updated));
    } else {
      // 좋아요 추가
      likedPosts.push(id);
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    }

    setLiked(!liked);
  });
};



  // 공유하기
  const sharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("게시글 링크가 복사되었습니다!");
  };


  if (!post) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="sns-detail-container">

        {/* 본문 박스 */}
        <div className="sns-detail-box">

          <div className="sns-detail-info">
            <span>{post.createdAt?.split("T")[0]}</span>
            <span>조회수 {post.views}</span>
          </div>

          <h1 className="sns-detail-title">{post.title}</h1>

          {/* 본문 이미지 */}
          {post.imageUrl && (
            <img
              src={`http://localhost:8080${post.imageUrl}`}
              alt="게시글 이미지"
              className="sns-detail-image"
            />
          )}

          <div className="sns-detail-content">{post.content}</div>

          {/* 좋아요 + 공유 */}
          <div className="sns-detail-actions">
            <button className="sns-like-btn" onClick={toggleLike}>
              {liked ? "❤️" : "🤍"} {likeCount}
            </button>

            <button className="sns-share-btn" onClick={sharePost}>
              공유하기
            </button>
          </div>
        </div>


        {/* 댓글 구역 */}
        <div className="sns-comment-section">
          <h3 className="sns-comment-title">댓글</h3>

          {comments.map((c, index) => (
            <div key={index} className="sns-comment-item">
              <div className="sns-comment-profile">🙂</div>

              <div className="sns-comment-content">
                <div className="sns-comment-header">
                  <span className="sns-comment-author">익명</span>
                  <span className="sns-comment-date">
                    {c.createdAt?.split("T")[0]}
                  </span>
                </div>

               <div className="sns-comment-text">
                  {c.content.split("\n").map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* 댓글 입력 */}
          <div className="sns-comment-write">
            <div className="sns-comment-profile">🙂</div>

            <input
              className="sns-comment-input"
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="sns-comment-btn" onClick={submitComment}>
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
