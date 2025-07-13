import { AnswerType } from "@/types/answer";
import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import LikeButton from "../LikeButton/LikeButton";
import DislikeButton from "../DislikeButton/DislikeButton";
import InsertAnswer from "../InsertAnswer/InsertAnswer";
import { deleteQuestion } from "@/api/question";
import {
  addAnswer,
  deleteAnswer,
  toggleDislike,
  toggleLike,
  updateAnswer,
} from "@/api/answer";

type QuestionViewProps = {
  answers: AnswerType[];
  question: QuestionType;
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[]>>;
};

const QuestionView = ({ answers, question, setAnswers }: QuestionViewProps) => {
  const router = useRouter();
  const id = router.query.id as string;
  const jwtToken = Cookies.get("user-token");
  const [answer, setAnswer] = useState("");
  const [isAnswerLiked, setIsAnswerLiked] = useState<Set<string>>(new Set());
  const [isAnswerDisliked, setIsAnswerDisliked] = useState<Set<string>>(
    new Set()
  );

  const onDeleteQuestion = async () => {
    try {
      const response = await deleteQuestion({ jwtToken: jwtToken!, id: id });

      if (response.status === 200) {
        toast.success("Question successfully deleted ✅", {
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
        }, 2000);
      }

      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to delete a question 🥺", {
          position: "top-center",
          autoClose: 3000,
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

  const onAddAnswer = async () => {
    try {
      const result = await addAnswer({
        jwtToken: jwtToken!,
        id: id,
        answer: answer,
      });

      const newAnswer = result.data.answer;

      if (result.status === 201) {
        setAnswers((prev) => [...prev, newAnswer]);
        setAnswer("");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to add an answer 🥺", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (axios.isAxiosError(err) && err.status === 400) {
        toast.error("Enter you answer 📝", {
          position: "top-center",
          autoClose: 3000,
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

  const onDeleteAnswer = async (answerId: string) => {
    try {
      const response = await deleteAnswer({
        jwtToken: jwtToken!,
        answerId: answerId,
      });

      if (response.status === 200) {
        const updatedAnswers = await updateAnswer({
          jwtToken: jwtToken!,
          id: id,
        });
        setAnswers(updatedAnswers.data.answer);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to delete an answer 🥺", {
          position: "top-center",
          autoClose: 3000,
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

  const onToggleLike = async (answerId: string) => {
    try {
      const alreadyLiked = isAnswerLiked.has(answerId);
      const alreadyDisliked = isAnswerDisliked.has(answerId);
      let change = 0;
      if (alreadyLiked) {
        change = -1; // Nuimam like
      } else {
        change = 1;
        if (alreadyDisliked) {
          change = 2; // Nuimam dislike ir dedam like
        }
      }

      const response = await toggleLike({
        jwtToken: jwtToken!,
        change: change,
        answerId: answerId,
      });

      if (response.status === 200) {
        const updatedAnswer = response.data.answer;
        setAnswers((prevAnswers) =>
          prevAnswers.map((a) =>
            a.id === answerId
              ? { ...a, likeNumber: updatedAnswer.likeNumber }
              : a
          )
        );

        setIsAnswerLiked((prev) => {
          const updated = new Set(prev);
          if (alreadyLiked) {
            updated.delete(answerId);
          } else {
            updated.add(answerId);
          }
          return updated;
        });

        if (alreadyDisliked) {
          setIsAnswerDisliked((prev) => {
            const updated = new Set(prev);
            updated.delete(answerId);
            return updated;
          });
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to like answers 🥺", {
          position: "top-center",
          autoClose: 3000,
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

  const onToggleDislike = async (answerId: string) => {
    try {
      const alreadyLiked = isAnswerLiked.has(answerId);
      const alreadyDisliked = isAnswerDisliked.has(answerId);
      let change = 0;
      if (alreadyDisliked) {
        change = 1; // Nuimam like
      } else {
        change = -1;
        if (alreadyLiked) {
          change = -2; // Nuimam dislike ir dedam like
        }
      }

      const response = await toggleDislike({
        jwtToken: jwtToken!,
        answerId: answerId,
        change: change,
      });

      if (response.status === 200) {
        const updatedAnswer = response.data.answer;
        setAnswers((prevAnswers) =>
          prevAnswers.map((a) =>
            a.id === answerId
              ? { ...a, likeNumber: updatedAnswer.likeNumber }
              : a
          )
        );
        setIsAnswerDisliked((prev) => {
          const updated = new Set(prev);
          if (alreadyDisliked) {
            updated.delete(answerId);
          } else {
            updated.add(answerId);
          }
          return updated;
        });
        if (alreadyLiked) {
          setIsAnswerLiked((prev) => {
            const updated = new Set(prev);
            updated.delete(answerId);
            return updated;
          });
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to dislike answers 🥺", {
          position: "top-center",
          autoClose: 3000,
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
    <div className={styles.container}>
      <div className={styles.question}>
        <h3>{question.questionText}</h3>
      </div>
      {answers.map((a) => {
        const isLiked = isAnswerLiked.has(a.id);
        const isDisliked = isAnswerDisliked.has(a.id);
        return (
          <div key={a.id} id={a.id} className={styles.answer}>
            <div className={styles.likesWrapper}>
              <LikeButton
                isLiked={isLiked}
                onClick={() => onToggleLike(a.id)}
              />
              <p>{a.likeNumber}</p>
              <DislikeButton
                isDisliked={isDisliked}
                onClick={() => onToggleDislike(a.id)}
              />
            </div>
            <div className={styles.answerWrp}>
              <p className={styles.answerText}>{a.answerText}</p>
              <div className={styles.button}>
                <Button
                  type="DANGER"
                  title="DELETE"
                  onClick={() => onDeleteAnswer(a.id)}
                />
              </div>
            </div>
          </div>
        );
      })}
      <InsertAnswer
        answer={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onClick={onAddAnswer}
      />
      <div className={styles.buttonWrapper}>
        <Button
          type="DANGER"
          title="Delete question"
          onClick={onDeleteQuestion}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuestionView;
