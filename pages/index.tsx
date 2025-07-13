import { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import { QuestionType } from "@/types/question";
import MainWrapper from "@/components/MainWrapper/MainWrapper";
import { getQuestions } from "@/api/question";

export default function Home() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const getAllQuestions = async () => {
    try {
      const response = await getQuestions();

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
