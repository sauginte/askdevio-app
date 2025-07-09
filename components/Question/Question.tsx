import styles from "./styles.module.css";
import UserImg from "../../assets/images/user_icon.png";
import Link from "next/link";

type QuestionProps = {
  id: string;
  question: string;
  //   userId: string;
};

const Question = ({ id, question }: QuestionProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.userImg}>
        <img src={UserImg.src} alt="" />
      </div>
      <div className={styles.items}>
        <h5>{question}</h5>
        <Link href="/">Read answers</Link>
      </div>
    </div>
  );
};

export default Question;
