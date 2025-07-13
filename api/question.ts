import { config } from "@/config";
import axios from "axios";

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${config.BASE_URL}/questions"`);

    return response;
  } catch (err) {
    throw err;
  }
};

type onDeleteQuestionProps = {
  jwtToken: string;
  id: string;
};

export const deleteQuestion = async ({
  jwtToken,
  id,
}: onDeleteQuestionProps) => {
  try {
    const response = await axios.delete(`${config.BASE_URL}/questions/${id}`, {
      headers: { Authorization: jwtToken },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

type addQuestionProps = {
  jwtToken: string;
  question: string;
};
export const addQuestion = async ({ jwtToken, question }: addQuestionProps) => {
  try {
    const questionBody = {
      questionText: question,
    };

    const response = await axios.post(
      `${config.BASE_URL}/questions/insert`,
      questionBody,
      { headers: { Authorization: jwtToken } }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
