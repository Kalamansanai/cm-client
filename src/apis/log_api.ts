import { ApiWrapper } from "./api.util";

const backend = process.env.REACT_APP_BACKEND;

export async function GetLogsByDetector(detector_id: string) {
  const response = await fetch(
    `${backend}/get_logs_by_detector/${detector_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  return await ApiWrapper(response, true);
}
