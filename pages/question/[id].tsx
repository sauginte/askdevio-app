import PageTemplate from "@/components/PageTemplate/PageTemplate";
import QuestionView from "../../components/QuestionView/QuestionView";
import { useEffect, useState } from "react";
import { QuestionType } from "@/types/question";
import { useRouter } from "next/router";
import axios from "axios";

const index = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const id = router.query.id as string;

  const fetchQuestion = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/questions/${id}/answers`
      );

      setQuestion(response.data.question);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    id && fetchQuestion(id);
  }, [id]);
  return (
    <PageTemplate>
      <QuestionView question={question} />
    </PageTemplate>
  );
};

export default index;
