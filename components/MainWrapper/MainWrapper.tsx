import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import Question from "../Question/Question";
import Filter from "../Filter/Filter";
import { useState } from "react";

type MainWrapperProps = {
  questions: QuestionType[];
};

const MainWrapper = ({ questions }: MainWrapperProps) => {
  const [quesions, setQuestions] = useState();
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeMessage}>
        <h3>All questions</h3>
        <Filter setQuestions={setQuestions} />
      </div>
      {questions.map((q) => {
        return (
          <Question
            key={q.id}
            id={q.id}
            question={q.questionText}
            createdAt={q.createdAt}
          />
        );
      })}
    </div>
  );
};

export default MainWrapper;
