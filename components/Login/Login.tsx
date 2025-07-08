import Link from "next/link";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginUser = async () => {
    try {
      if (email === "" || password === "") {
        toast.error("Fill all fields!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      const loginBody = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3001/users/login",
        loginBody
      );
      Cookies.set("user-token", response.data.jwtToken);
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("Incorrect email or password. Check provided data", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      console.log(err);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.headers}>
        <h1>We've been waiting for you!</h1>
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

      <div>
        <Link href="/register">Not a member yet? Join here!</Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
