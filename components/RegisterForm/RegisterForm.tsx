import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../Button/Button";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { userRegister } from "@/api/user";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const registerUser = async () => {
    try {
      if (name === "" || email === "" || password === "") {
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
      const response = await userRegister({
        name: name,
        email: email,
        password: password,
      });

      Cookies.set("user-token", response.data.jwtToken);

      if (response.status === 200 || response.status == 201) {
        toast.success("You successfully signed up! ✅", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/");
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err) && err.status === 409) {
        toast.warn("User with this email already exists 🤨", {
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
      if (axios.isAxiosError(err) && err.status === 400) {
        toast.error("Check provided email or password 🧐", {
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
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headers}>
        <h1>Feel free to join us!</h1>
        <p>Register</p>
      </div>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button title="Register" onClick={registerUser} />
      </div>

      <div className={styles.loginLink}>
        <Link href="/login">Already have an account? Log in!</Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
