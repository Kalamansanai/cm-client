import { ApiWrapper } from "./api.util";

const backend = process.env.REACT_APP_BACKEND;

export async function GetLocation() {
  const response = await fetch(`${backend}/get_location`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await ApiWrapper(response, true);
}
