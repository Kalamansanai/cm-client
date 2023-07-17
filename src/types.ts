export type User = {
  name: string;
  email: string;
  //   email_verified: boolean;
  creation_time: number;
  config: IUserConfig;
  detectors: IDetector[];
};

export interface IUserConfig {}

export interface IDetector {
  detector_id: string;
  detector_name: string;
  detector_config: IDetectorConfig;
  type: DetectorType;
}

export interface IDetectorConfig {
  charNum: string;
  comaPosition: string;
  uuid: string;
  delay: string;
  flash: boolean;
}

export type DetectorType = "water" | "electricity" | "gas";
