import styles from "./styles.module.css";
import Like from "../../assets/images/like-outline.svg";
import Liked from "../../assets/images/like-filled.svg";

type LikeButtonProps = {
  isLiked: boolean;
  onClick: () => void;
};

const LikeButton = ({ isLiked, onClick }: LikeButtonProps) => {
  return (
    <div className={styles.likesWrapper}>
      <button onClick={onClick}>
        <img src={isLiked ? Liked.src : Like.src} alt="" />
      </button>
    </div>
  );
};

export default LikeButton;
