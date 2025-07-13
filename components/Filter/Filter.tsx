import styles from "./styles.module.css";
import Button from "../Button/Button";
import axios from "axios";
import { useState } from "react";
import { QuestionType } from "@/types/question";

type FilterProps = {
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
};

const Filter = ({ setQuestions }: FilterProps) => {
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
      <h5 className={styles.filterHeader}>Filter Questions:</h5>
      <div className={styles.filterBtn}>
        <Button
          type="DEFAULT"
          title="Without answers"
          onClick={filterUnanswered}
        />
        <Button
          type="DEFAULT"
          title="With answers"
          onClick={filterUnanswered}
        />
      </div>
    </div>
  );
};

export default Filter;
