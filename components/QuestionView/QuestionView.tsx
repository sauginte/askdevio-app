import { AnswerType } from "@/types/answer";
import styles from "./styles.module.css";
import { QuestionType } from "@/types/question";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Like from "../../assets/images/like-pressed.svg";
import Dislike from "../../assets/images/like-unpressed.svg";
import LikeButton from "../LikeButton/LikeButton";
import DislikeButton from "../DislikeButton/DislikeButton";

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
      const response = await axios.delete(
        `http://localhost:3001/questions/${id}`,
        { headers: { Authorization: jwtToken } }
      );

      if (response.status === 200) {
        toast.success("Question successfully deleted", {
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
        }, 2000);
      }

      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to delete a question", {
          position: "bottom-center",
          autoClose: 3000,
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

  const onAddAnswer = async () => {
    try {
      const userIdResult = await axios.get("http://localhost:3001/users/", {
        headers: { Authorization: jwtToken },
      });

      const userId = userIdResult.data.userId;

      const answerBody = {
        userId: userId,
        answerText: answer,
        likeNumber: 0,
      };

      const result = await axios.post(
        `http://localhost:3001/questions/${id}/answers`,
        answerBody,
        { headers: { Authorization: jwtToken } }
      );

      const newAnswer = result.data.answer;

      if (result.status === 201) {
        setAnswers((prev) => [...prev, newAnswer]);
        setAnswer("");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 401) {
        toast.error("You need to login or sign up to add an answer", {
          position: "bottom-center",
          autoClose: 3000,
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

  const onDeleteAnswer = async (answerId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/answers/${answerId}`,
        { headers: { Authorization: jwtToken } }
      );

      if (response.status === 200) {
        const updatedAnswers = await axios.get(
          `http://localhost:3001/questions/${id}/answers`,
          { headers: { Authorization: jwtToken } }
        );
        setAnswers(updatedAnswers.data.answer);
      }
    } catch (err) {
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

      const response = await axios.patch(
        `http://localhost:3001/answers/${answerId}`,
        { change },
        { headers: { Authorization: jwtToken } }
      );

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

      const response = await axios.patch(
        `http://localhost:3001/answers/${answerId}`,
        { change },
        { headers: { Authorization: jwtToken } }
      );

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
            <LikeButton isLiked={isLiked} onClick={() => onToggleLike(a.id)} />
            <DislikeButton
              isDisliked={isDisliked}
              onClick={() => onToggleDislike(a.id)}
            />
            <p className={styles.likeNumber}>{a.likeNumber}</p>
            <p className={styles.answerText}>{a.answerText}</p>
            <div className={styles.button}>
              <Button
                type="DANGER"
                title="DELETE"
                onClick={() => onDeleteAnswer(a.id)}
              />
            </div>
          </div>
        );
      })}

      <div className={styles.insertWrapper}>
        <h4>Add your answer:</h4>
        <textarea
          placeholder="your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button type="DEFAULT" title="Add answer" onClick={onAddAnswer} />
      </div>

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
