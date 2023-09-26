import { IDetectorConfig } from "../types";
import { ApiWrapper } from "./api.util";

const backend = process.env.REACT_APP_BACKEND;

type regProps = {
  location_id: string;
  id: string;
  name: string;
  char_num: number;
  coma_position: number;
  type: string;
};

export async function AddDetector(props: regProps) {
  const response = await fetch(`${backend}/add_detector`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      location_id: props.location_id,
      detector_id: props.id,
      detector_name: props.name,
      char_num: props.char_num,
      coma_position: props.coma_position,
      type: props.type,
    }),
  });

  return await response.json();
}

export async function SetConfig(
  new_config: IDetectorConfig,
  detector_id: string,
) {
  const response = await fetch(
    `${backend}/set_detector_config/${detector_id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        new_config: new_config,
      }),
    },
  );

  return await ApiWrapper(response, true);
}

export async function DeleteDetector(detector_id: string) {
  const response = await fetch(`${backend}/detector/${detector_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await ApiWrapper(response, true);
}

export async function ListDetectorsByUser(user_id: string) {
  const response = await fetch(`${backend}/get_detectors_by_user/${user_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await ApiWrapper(response, true);
}

export async function GetDetector(detector_id: string) {
  const response = await fetch(`${backend}/get_detector/${detector_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await ApiWrapper(response, true);
}

export async function GetDetectorImage(detector_id: string) {
  const response = await fetch(`${backend}/get_detector_img/${detector_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return response;
}
