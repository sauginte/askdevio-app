import styles from "./styles.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { addQuestion } from "@/api/question";

const InsertQuestion = () => {
  const [question, setQuestion] = useState("");
  const jwtToken = Cookies.get("user-token");
  const router = useRouter();

  const onAddQuestion = async () => {
    try {
      const response = await addQuestion({
        jwtToken: jwtToken!,
        question: question,
      });

      if (response.status === 201) {
        toast.success("Your question has been added! ✅", {
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
        }, 3000);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 400) {
        toast.error("Enter your question 📝", {
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
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to ask a question 🥺", {
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
      <h3>{"Don't be shy... Ask a question!"}</h3>
      <div className={styles.inputWrp}>
        <textarea
          placeholder="Your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className={styles.button}>
        <Button type="DEFAULT" title="Submit" onClick={onAddQuestion} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default InsertQuestion;
