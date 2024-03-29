import { IDetectorConfig } from "../types";
import { ApiWrapper } from "./api.util";

const backend = process.env.REACT_APP_BACKEND;

type regProps = {
  id: string;
  name: string;
  type: string;
  cost: number;
};

export async function AddDetector(props: regProps) {
  const response = await fetch(`${backend}/add_detector`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      detector_id: props.id,
      detector_name: props.name,
      type: props.type,
      cost: props.cost,
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
