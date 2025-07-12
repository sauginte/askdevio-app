import styles from "./styles.module.css";
import Liked from "../../assets/images/like-pressed.svg";
import Disliked from "../../assets/images/like-unpressed.svg";

type LikeButtonProps = {
  likeNumber: number;
  isLiked: boolean;
  onClick: () => void;
};

const LikeButton = ({ likeNumber, isLiked, onClick }: LikeButtonProps) => {
  return (
    <div className={styles.likesWrapper}>
      <button onClick={onClick}>
        <img src={isLiked ? Liked.src : Disliked.src} alt="" />
      </button>
      <p className={styles.likeNumber}>{likeNumber}</p>
    </div>
  );
};

export default LikeButton;
