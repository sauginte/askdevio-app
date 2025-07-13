import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import Question from "../Question/Question";
import Filter from "../Filter/Filter";
import { useEffect, useState } from "react";

type MainWrapperProps = {
  questions: QuestionType[];
};

const MainWrapper = ({ questions }: MainWrapperProps) => {
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>(
    []
  );

  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeMessage}>
        <h3>All questions</h3>
        <Filter setQuestions={setFilteredQuestions} />
      </div>
      {filteredQuestions.map((q) => {
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
