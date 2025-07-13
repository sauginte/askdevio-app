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
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <p className={styles.date}>{formattedDate}</p>
        <div className={styles.contentWrp}>
          <p className={styles.question}>{question}</p>
          <div className={styles.readMoreWrp}>
            <Link href={`/question/${id}`}>Read answers</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
