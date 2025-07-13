import axios from "axios";
import { config } from "@/config";

type addAnswerProps = {
  jwtToken: string;
  answer: string;
  id: string;
};

export const addAnswer = async ({ jwtToken, answer, id }: addAnswerProps) => {
  try {
    const userIdResult = await axios.get(`${config.BASE_URL}/users/`, {
      headers: { Authorization: jwtToken },
    });

    const userId = userIdResult.data.userId;

    const answerBody = {
      userId: userId,
      answerText: answer,
      likeNumber: 0,
    };

    const result = await axios.post(
      `${config.BASE_URL}/questions/${id}/answers`,
      answerBody,
      { headers: { Authorization: jwtToken } }
    );

    return result;
  } catch (err) {
    throw err;
  }
};

type deleteAnswerProps = {
  jwtToken: string;
  answerId: string;
};
export const deleteAnswer = async ({
  jwtToken,
  answerId,
}: deleteAnswerProps) => {
  try {
    const response = await axios.delete(
      `${config.BASE_URL}/answers/${answerId}`,
      { headers: { Authorization: jwtToken } }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

type updateAnswerProps = {
  jwtToken: string;
  id: string;
};
export const updateAnswer = async ({ jwtToken, id }: updateAnswerProps) => {
  try {
    const updatedAnswers = await axios.get(
      `${config.BASE_URL}/questions/${id}/answers`,
      { headers: { Authorization: jwtToken } }
    );
    return updatedAnswers;
  } catch (err) {
    throw err;
  }
};

type toggleLikeProps = {
  answerId: string;
  jwtToken: string;
  change: number;
};
export const toggleLike = async ({
  answerId,
  change,
  jwtToken,
}: toggleLikeProps) => {
  try {
    const response = await axios.patch(
      `${config.BASE_URL}/answers/${answerId}`,
      { change },
      { headers: { Authorization: jwtToken } }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const toggleDislike = async ({
  answerId,
  change,
  jwtToken,
}: toggleLikeProps) => {
  try {
    const response = await axios.patch(
      `${config.BASE_URL}/answers/${answerId}`,
      { change },
      { headers: { Authorization: jwtToken } }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
