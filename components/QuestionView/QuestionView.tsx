import { AnswerType } from "@/types/answer";
import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import { useRouter } from "next/router";
import Button from "../Button/Button";

type QuestionViewProps = {
  answers: AnswerType[];
  question: QuestionType;
};

const QuestionView = ({ answers, question }: QuestionViewProps) => {
  // const router = useRouter();
  //   const id = router.query.id as string;

  const onDeleteAnswer = () => {};

  const onAddAnswer = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h3>{question.questionText}</h3>
      </div>
      {answers.map((a) => {
        return (
          <div className={styles.answer}>
            <p>{a.answerText}</p>
            <div className={styles.button}>
              <Button type="DANGER" title="DELETE" onClick={onDeleteAnswer} />
            </div>
          </div>
        );
      })}

      <div className={styles.button}>
        <Button type="DEFAULT" title="Add answer" onClick={onAddAnswer} />
      </div>
    </div>
  );
};

export default QuestionView;
