import Link from "next/link";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { userLogin } from "@/api/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginUser = async () => {
    try {
      if (email === "" || password === "") {
        toast.error("Fill all fields! 📝", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      const response = await userLogin({ email: email, password: password });

      Cookies.set("user-token", response.data.jwtToken);
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("Incorrect email or password. Check provided data 🧐", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.log(err);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.headers}>
        <h2>We've been waiting for you!</h2>
        <p>Login</p>
      </div>

      <div className={styles.form}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Login" onClick={loginUser} />
      </div>

      <div className={styles.registerLink}>
        <Link href="/register">Not a member yet? Join here!</Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
