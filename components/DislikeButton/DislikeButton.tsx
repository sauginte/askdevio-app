import styles from "./styles.module.css";
import Dislike from "../../assets/images/dislike-outline.svg";
import Disliked from "../../assets/images/dislike-filled.svg";

type LikeButtonProps = {
  isDisliked: boolean;
  onClick: () => void;
};

const DislikeButton = ({ isDisliked, onClick }: LikeButtonProps) => {
  return (
    <div className={styles.likesWrapper}>
      <button onClick={onClick}>
        <img src={isDisliked ? Disliked.src : Dislike.src} alt="" />
      </button>
    </div>
  );
};

export default DislikeButton;
