import { useEffect, useState } from "react";
import { likePost, getLikeCount } from "../services/likeService";
import { sharePost, getShareCount } from "../services/shareService";

function SocialActions({ postId }) {
  const numericPostId = Number(postId);

  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [message, setMessage] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  const getErrorMessage = (error) => {
    const detail = error?.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(", ");
    }

    if (typeof detail === "string") {
      return detail;
    }

    if (typeof error?.response?.data?.message === "string") {
      return error.response.data.message;
    }

    return "Something went wrong.";
  };

  const loadCounts = async () => {
    if (!Number.isInteger(numericPostId)) {
      setMessage("Invalid post id.");
      return;
    }

    try {
      const [likeData, shareData] = await Promise.all([
        getLikeCount(numericPostId),
        getShareCount(numericPostId),
      ]);

      setLikes(likeData?.likes || 0);
      setShares(shareData?.shares || 0);
    } catch (error) {
      console.error("Count load error:", error);
      setMessage(getErrorMessage(error));
    }
  };

  useEffect(() => {
    loadCounts();
  }, [postId]);

  const handleLike = async () => {
    if (!Number.isInteger(numericPostId)) {
      setMessage("Invalid post id.");
      return;
    }

    try {
      setLikeLoading(true);
      setMessage("");

      await likePost(numericPostId);
      setLikes((prev) => prev + 1);
      setMessage("Post liked successfully.");
    } catch (error) {
      console.error("Like error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setLikeLoading(false);
    }
  };

  const handleShare = async () => {
    if (!Number.isInteger(numericPostId)) {
      setMessage("Invalid post id.");
      return;
    }

    try {
      setShareLoading(true);
      setMessage("");

      await sharePost(numericPostId);
      setShares((prev) => prev + 1);
      setMessage("Post shared successfully.");
    } catch (error) {
      console.error("Share error:", error);
      setMessage(getErrorMessage(error));
    } finally {
      setShareLoading(false);
    }
  };

  return (
    <div>
      <div className="social-actions">
        <button
          className="social-btn"
          onClick={handleLike}
          disabled={likeLoading}
          type="button"
        >
          {likeLoading ? "Liking..." : `👍 Like (${likes})`}
        </button>

        <button
          className="social-btn"
          onClick={handleShare}
          disabled={shareLoading}
          type="button"
        >
          {shareLoading ? "Sharing..." : `🔁 Share (${shares})`}
        </button>
      </div>

      {message && (
        <p style={{ marginBottom: "16px", color: "#2563eb", fontWeight: 600 }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SocialActions;

