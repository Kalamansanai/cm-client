export type User = {
  id: string;
  name: string;
  email: string;
  //   email_verified: boolean;
  creation_time: number;
  config: IUserConfig;
};

export interface IUserConfig {}

export interface IDetector {
  detector_id: string;
  detector_name: string;
  detector_config: IDetectorConfig;
  type: DetectorType;
  state: DetectorState;
}

export interface IDetectorConfig {
  charNum?: number;
  comaPosition?: number;
  delay?: number;
  flash?: boolean;
  cost?: number;
}

export type DetectorType = "water" | "electricity" | "gas";
export type DetectorState = "sleep" | "init" | "active";

export interface ILineChartData {
  //TODO: expand with the other props
  date: "string";
  value: number;
}
