import CryptoJS from "crypto-js";
import { ApiWrapper } from "./api.util";

const backend = process.env.REACT_APP_BACKEND;

export const hash = (string: string) => {
  return CryptoJS.SHA256(string).toString();
};

type regProps = {
  name: string;
  email: string;
  password: string;
};

export async function SendRegister({ name, email, password }: regProps) {
  const response = await fetch(`${backend}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      password: hash(password),
    }),
  });

  return await ApiWrapper(response, false);
}

export const login_cookie = async () => {
  const response = await fetch(`${backend}/user`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await ApiWrapper(response, true);
};

type logProps = {
  email: string;
  password: string;
};

export const GetUserData = async () => {
  const userResponse = await fetch(`${backend}/user`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await ApiWrapper(userResponse, true);
};

export const Login = async ({ email, password }: logProps) => {
  try {
    const response = await fetch(`${backend}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: hash(password),
      }),
    });

    const data = await response.json();

    if (data.result !== "error") {
      try {
        const userData = await GetUserData();
        return userData;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error(data.data);
    }
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  const response = await fetch(`${backend}/logout`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return await ApiWrapper(response, true);
};
