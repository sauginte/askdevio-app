import styles from "./styles.module.css";

type ButtonProps = {
  title: string;
  type?: "DEFAULT" | "DANGER";
  onClick: () => void;
};

const Button = ({ title, type = "DEFAULT", onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${styles.main} ${styles[type]}`}>
      {title}
    </button>
  );
};

export default Button;
