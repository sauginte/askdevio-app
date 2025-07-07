import Link from "next/link";
import styles from "./styles.module.css";
import Button from "../Button/Button";

const Login = () => {
  const loginUser = () => {};
  return (
    <div className={styles.wrapper}>
      <div className={styles.headers}>
        <h1>We've been waiting for you!</h1>
        <p>Login</p>
      </div>

      <div className={styles.form}>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <Button title="Login" onClick={loginUser} />
      </div>

      <div>
        <Link href="/register">Not a member yet? Join here!</Link>
      </div>
    </div>
  );
};

export default Login;
