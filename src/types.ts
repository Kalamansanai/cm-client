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
  detector_config: IDetectoConfig;
  type: DetectorType;
}

export interface IDetectoConfig {
  quality: number;
  resolution: number;
  flash_time: number;
  timeout: number;
}

export type DetectorType = "Default" | "water" | "electricity" | "gas";
