import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ILineChartResponse } from "../types";

type Props = {
  response_data: ILineChartResponse;
};

export default function NewLineChart({ response_data }: Props) {
  const data = response_data.data;
  const config = response_data.config;

  if (!config) {
    return null;
  }

  return (
    <ResponsiveContainer
      width={config.containerWidth}
      height={config.containerHeight}
    >
      <LineChart
        width={config.chartWidth}
        height={config.chartHeight}
        data={data}
        margin={config.chartMargin}
      >
        <CartesianGrid strokeDasharray={config.cartesianGrid.strokeDashArray} />
        <XAxis {...config.xAxis} />
        <YAxis {...config.yAxis} />
        {config.tooltip.enable && <Tooltip />}
        {config.legend.enable && <Legend />}
        {config.lines.map((line, i) => (
          <Line key={i} {...line} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
