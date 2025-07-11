import styles from "./styles.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const InsertQuestion = () => {
  const [question, setQuestion] = useState("");
  const jwtToken = Cookies.get("user-token");
  const router = useRouter();

  const onAddQuestion = async () => {
    try {
      const questionBody = {
        questionText: question,
      };

      const response = await axios.post(
        "http://localhost:3001/questions/insert",
        questionBody,
        { headers: { Authorization: jwtToken } }
      );

      if (response.status === 201) {
        toast.success("Your question has been added!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to ask a question", {
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
      <h3>Don't be shy... Ask a question!</h3>
      <textarea
        placeholder="your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className={styles.button}>
        <Button type="DEFAULT" title="Add" onClick={onAddQuestion} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default InsertQuestion;
