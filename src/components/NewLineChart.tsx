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
import CustomTooltip from "../components/CustomTooltip";
import { customColors, ILineChartResponse } from "../types";

type Props = {
  response_data: ILineChartResponse;
  type: string;
};

export default function NewLineChart({ response_data, type }: Props) {
  const data = response_data.data;
  const config = response_data.config;
  console.log(config);
  const lineColor = customColors[type.toLowerCase()] || "#82ca9d";
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
        {config.tooltip.enable && (
          <Tooltip content={<CustomTooltip type="recharts" />} />
        )}

        {config.legend.enable && <Legend />}
        {config.lines.map((line, i) => (
          <Line
            key={i}
            {...line}
            stroke={line.dataKey === "current" ? lineColor : "#82ca9d"}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
