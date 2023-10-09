import { Box, useTheme } from "@mui/material";
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
import { tokens } from "../theme";
import { customColors, ILineChartResponse } from "../types";

type Props = {
  response_data: ILineChartResponse;
  type: string;
};

export default function NewLineChart({ response_data, type }: Props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (!response_data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        color={colors.grey[100]}
      >
        <div>No data available.</div>
      </Box>
    );
  }
  const data = response_data?.data ?? [];
  const config = response_data.config;
  console.log(config);
  const lineColor = customColors[type.toLowerCase()] || "#82ca9d";
  if (!config) {
    return <div>No configuration available.</div>;
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
        <YAxis
          {...config.yAxis}
          tickFormatter={(value: any) => value.toString().replace(".", ",")}
        />
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
