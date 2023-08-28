import { Props as XAxisProps } from "recharts/types/cartesian/XAxis";
import { Props as YAxisProps } from "recharts/types/cartesian/YAxis";

import { Legend } from "recharts";
// import { Props as LineProps } from "recharts/types/cartesian/Line";
import { CurveType } from "recharts/types/shape/Curve";

export type User = {
  id: string;
  name: string;
  email: string;
  //   email_verified: boolean;
  creation_time: number;
  config: IUserConfig;
  monthly_sums?: {
    water?: number;
    electricity?: number;
    gas?: number;
  };
};

export interface IUserConfig {}

export interface IDetector {
  id: string;
  detector_id: string;
  detector_name: string;
  detector_config: IDetectorConfig;
  type: DetectorType;
  state: DetectorState;
  logs?: ILog[];
  image_path: string;
}

export interface IDetectorConfig {
  charNum?: number;
  comaPosition?: number;
  delay?: number;
  flash?: number;
  cost?: number;
}

export type DetectorType = "water" | "electricity" | "gas";
export type DetectorState = "sleep" | "init" | "active";

export interface ILineChartData {
  //TODO: expand with the other props
  date: "string";
  value: number;
}

export interface ILog {
  timestamp: Date;
  value: number;
}

export interface IDashboardLayoutConfig {
  //any other config ?
  cards: IDashboardCardConfig[];
}

export interface IDashboardCardConfig {
  title: string;
  componentType: string; //TODO: make this
  size: IDashboardCardSize;
  children?: IDashboardCardConfig[];
}

export interface IDashboardCardSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ILineChartConfig {
  type: string;
  containerWidth: string;
  containerHeight: string;
  chartWidth: number;
  chartHeight: number;
  chartMargin: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  XAxis: XAxisProps;
  YAxis: YAxisProps;
  CartesianGrid: {
    //TODO: the config of this is so messy
    strokeDashArray: string;
  };
  Tooltip: {
    enable: boolean;
    config?: any;
  }; // soooooo messy
  Legend: {
    enable: boolean;
    config?: Legend;
  };
  Lines: LineProps[];
}

export interface LineProps {
  type: CurveType;
  dataKey: string;
  stroke: string;
}

export interface ILocation {
  id: string;
  userId: string;
  name: string;
  detectors: IDetector[];
  monthly_logs: IMonthlyLog[];
}

export interface IMonthlyLog {
  month: string;
  values: IConsumptionValues;
}

export interface IConsumptionValues {
  water: number;
  electricity: number;
  gas: number;
}
