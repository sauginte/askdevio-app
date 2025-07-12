import styles from "./styles.module.css";
import { useState } from "react";
import Button from "../Button/Button";

type InsertAnswerProps = {
  answer: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
};

const InsertAnswer = ({ answer, onChange, onClick }: InsertAnswerProps) => {
  //   const [answer, setAnswer] = useState("");
  return (
    <div className={styles.insertWrapper}>
      <h4>Add your answer:</h4>
      <textarea
        placeholder="your answer..."
        value={answer}
        onChange={onChange}
      />
      <Button type="DEFAULT" title="Add answer" onClick={onClick} />
    </div>
  );
};

export default InsertAnswer;
