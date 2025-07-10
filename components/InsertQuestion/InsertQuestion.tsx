import styles from "./styles.module.css";
import Button from "../Button/Button";

const InsertQuestion = () => {
  const onAddQuestion = () => {};
  return (
    <div className={styles.wrapper}>
      <h3>Don't be shy... Ask a question!</h3>
      <textarea placeholder="your question..." />
      <div className={styles.button}>
        <Button type="DEFAULT" title="Add" onClick={onAddQuestion} />
      </div>
    </div>
  );
};

export default InsertQuestion;
