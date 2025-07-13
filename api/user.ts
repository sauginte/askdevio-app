import { config } from "@/config";
import axios from "axios";

type userLoginProps = {
  email: string;
  password: string;
};

export const userLogin = async ({ email, password }: userLoginProps) => {
  try {
    const loginBody = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${config.BASE_URL}/users/login`,
      loginBody
    );
    return response;
  } catch (err) {
    throw err;
  }
};

type userRegisterProps = {
  name: string;
  email: string;
  password: string;
};
export const userRegister = async ({
  name,
  email,
  password,
}: userRegisterProps) => {
  try {
    const registerBody = {
      name: name,
      email: email,
      password: password,
    };

    const response = await axios.post(`${config.BASE_URL}/users`, registerBody);

    return response;
  } catch (err) {
    throw err;
  }
};
