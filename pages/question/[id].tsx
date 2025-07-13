import PageTemplate from "@/components/PageTemplate/PageTemplate";
import QuestionView from "../../components/QuestionView/QuestionView";
import { useEffect, useState } from "react";
import { QuestionType } from "@/types/question";
import { useRouter } from "next/router";
import { AnswerType } from "@/types/answer";
import Loading from "../../components/Loading/Loading";
import { fetchQuestionWithAnswers } from "@/api/question";

const QuestionPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const id = router.query.id as string;

  const fetchQuestionWithAnswersById = async (id: string) => {
    try {
      const response = await fetchQuestionWithAnswers({ id: id });

      setQuestion(response.data.question);
      setAnswers(response.data.answer);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuestionWithAnswersById(id);
    }
  }, [id]);

  return (
    <PageTemplate>
      {answers && question ? (
        <QuestionView
          answers={answers}
          question={question}
          setAnswers={setAnswers}
        />
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </PageTemplate>
  );
};

export default QuestionPage;
