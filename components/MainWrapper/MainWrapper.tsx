import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import Question from "../Question/Question";
import Button from "../Button/Button";
import axios from "axios";
import { useState } from "react";

type MainWrapperProps = {
  questions: QuestionType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
};

const MainWrapper = ({ questions, setQuestions }: MainWrapperProps) => {
  const [filteredQuestions, setFilteresQuestions] = useState();

  const filterUnanswered = async () => {
    const response = await axios.get(
      "http://localhost:3001/questions?hasAnswers=false"
    );
    console.log(response);

    // const filteredQuestions = response.data.questions;
    // console.log(...filteredQuestions);
    // if (response.status === 200) {
    //   setQuestions((prev) => [prev, ...filteredQuestions]);
    // }
  };
  return (
    <div className={styles.wrapper}>
      <Button
        type="DEFAULT"
        title="Without answers"
        onClick={filterUnanswered}
      />
      <Button type="DEFAULT" title="With answers" onClick={filterUnanswered} />
      {questions.map((q) => {
        return <Question key={q.id} id={q.id} question={q.questionText} />;
      })}
    </div>
  );
};

export default MainWrapper;
