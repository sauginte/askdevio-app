import styles from "./styles.module.css";
import Link from "next/link";

type QuestionProps = {
  id: string;
  question: string;
  createdAt: Date;
};

const Question = ({ id, question, createdAt }: QuestionProps) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("lt-LT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Link href={`/question/${id}`} className={styles.wrapper}>
      <div className={styles.items}>
        <p className={styles.date}>{formattedDate}</p>
        <div className={styles.contentWrp}>
          <p className={styles.question}>{question}</p>
          <div className={styles.readMoreWrp}>
            <div>Read answers</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Question;
