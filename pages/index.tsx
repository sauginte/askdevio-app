import { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import { QuestionType } from "@/types/question";
import axios from "axios";
import MainWrapper from "@/components/MainWrapper/MainWrapper";

export default function Home() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const getAllQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/questions");

      setQuestions(response.data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);
  return (
    <>
      <PageTemplate>
        <div>
          <MainWrapper questions={questions} />
        </div>
      </PageTemplate>
    </>
  );
}
