import PageTemplate from "@/components/PageTemplate/PageTemplate";
import QuestionView from "../../components/QuestionView/QuestionView";
import { useEffect, useState } from "react";
import { QuestionType } from "@/types/question";
import { useRouter } from "next/router";
import axios from "axios";
import { AnswerType } from "@/types/answer";
import Loading from "../../components/Loading/Loading";

const index = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answer, setAnswer] = useState<AnswerType[]>([]);

  const id = router.query.id as string;

  const fetchQuestionWithAnswersById = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/questions/${id}/answers`
      );

      setQuestion(response.data.question);
      setAnswer(response.data.answer);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    id && fetchQuestionWithAnswersById(id);
  }, [id]);

  return (
    <PageTemplate>
      {answer && question ? (
        <QuestionView answers={answer} question={question} />
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </PageTemplate>
  );
};

export default index;
