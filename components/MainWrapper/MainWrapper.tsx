import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import Question from "../Question/Question";

type MainWrapperProps = {
  questions: QuestionType[];
};

const MainWrapper = ({ questions }: MainWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {questions.map((q) => {
        return <Question key={q.id} id={q.id} question={q.questionText} />;
      })}
    </div>
  );
};

export default MainWrapper;
