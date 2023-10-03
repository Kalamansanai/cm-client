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

export interface IUserConfig { }

export interface IDetector {
  id: string;
  location_id: string;
  detector_id: string;
  detector_name: string;
  detector_config: IDetectorConfig;
  type: DetectorType;
  state: DetectorState;
}

export interface IDetectorConfig {
  delay?: number;
  flash?: number;
  cost?: number;
  char_num: number;
  coma_position: number;
}

export type DetectorType = "water" | "electricity" | "gas";
export type DetectorState = "sleep" | "init" | "active";

export interface ILog {
  location_id: string;
  detector_id: string;
  type: string;
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
  heightLevel: number;
}

export interface IDashboardCardSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ILineChartResponse {
  data: any;
  config: ILineChartConfig;
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
  xAxis: XAxisProps;
  yAxis: YAxisProps;
  cartesianGrid: {
    //TODO: the config of this is so messy
    strokeDashArray: string;
  };
  tooltip: {
    enable: boolean;
    config?: any;
  }; // soooooo messy
  legend: {
    enable: boolean;
    config?: Legend;
  };
  lines: LineProps[];
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
}

export interface IMonthlyLog {
  month: string;
  values: IConsumptionValues;
}

export interface IConsumptionValues {
  water: number;
  gas: number;
  electricity: number;
}

export type PieData = {
  id: string;
  value: number;
  label: string;
  color: string;
};

export interface IBarChartConfig {
  title: string;
  label: string;
  keys: string[];
  indexBy: string;
  leftLegend: string;
  bottomLegend: string;
}

export interface IPieChartConfig {
  title: string;
  label: string;
}

export type CustomColorsType = {
  [key: string]: string;
  electricity: string;
  water: string;
  gas: string;
};

export const customColors: CustomColorsType = {
  electricity: "#e6ab02",
  water: "#1f82b4",
  gas: "#d95f02",
};
