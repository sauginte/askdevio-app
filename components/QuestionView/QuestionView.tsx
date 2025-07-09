import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import { useRouter } from "next/router";

type QuestionViewProps = {
  question: QuestionType;
};

const QuestionView = ({ question }: QuestionViewProps) => {
  const router = useRouter();
  //   const id = router.query.id as string;

  return (
    <div className={styles.container}>
      <h4>{question.questionText}</h4>
    </div>
  );
};

export default QuestionView;
