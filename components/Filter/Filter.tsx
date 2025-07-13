import styles from "./styles.module.css";
import Button from "../Button/Button";
import axios from "axios";
import { useState } from "react";
import { QuestionType } from "@/types/question";

type FilterProps = {
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
};

const Filter = ({ setQuestions }: FilterProps) => {
  const filterUnanswered = async () => {
    const response = await axios.get(
      "http://localhost:3001/questions/withAnswers"
    );

    const filteredQuestions = response.data.questions;
    if (response.status === 200) {
      const haveAnswers = filteredQuestions.filter(
        (q: QuestionType) => q.hasAnswers === false
      );
      setQuestions(haveAnswers);
    }
  };

  const filterAnswered = async () => {
    const response = await axios.get(
      "http://localhost:3001/questions/withAnswers"
    );

    const filteredQuestions = response.data.questions;
    if (response.status === 200) {
      const haveAnswers = filteredQuestions.filter(
        (q: QuestionType) => q.hasAnswers === true
      );
      setQuestions(haveAnswers);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.filterHeader}>Filter Questions:</h5>
      <div className={styles.filterBtn}>
        <Button
          type="DEFAULT"
          title="Without answers"
          onClick={filterUnanswered}
        />
        <Button type="DEFAULT" title="With answers" onClick={filterAnswered} />
      </div>
    </div>
  );
};

export default Filter;
