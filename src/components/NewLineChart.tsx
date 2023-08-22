import { useEffect, useMemo, useState } from "react";
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
import { CurveType } from "recharts/types/shape/Curve";
import { ILineChartConfig, ILineChartData } from "types";
import { GetLinePlotData } from "../apis/data_api";
import chartConfigJson from "../data/linePlot.json";

type Props = {
  detector_id: string;
};

export default function NewLineChart({ detector_id }: Props) {
  const [data, setData] = useState<ILineChartData[]>([]);
  const chartConfig: ILineChartConfig = {
    ...chartConfigJson,
    YAxis: {
      type: chartConfigJson.YAxis.type as "number" | "category" | undefined,
    },
    Lines: chartConfigJson.Lines.map((line) => ({
      ...line,
      type: line.type as CurveType,
    })),
  };

  useMemo(async () => {
    const data: ILineChartData[] = await GetLinePlotData(detector_id);
    if (data) {
      setData(data);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <ResponsiveContainer
      width={chartConfig.containerWidth}
      height={chartConfig.containerHeight}
    >
      <LineChart
        width={chartConfig.chartWidth}
        height={chartConfig.chartHeight}
        data={data}
        margin={chartConfig.chartMargin}
      >
        <CartesianGrid
          strokeDasharray={chartConfig.CartesianGrid.strokeDashArray}
        />
        <XAxis {...chartConfig.XAxis} />
        <YAxis {...chartConfig.YAxis} />
        {chartConfig.Tooltip.enable && <Tooltip />}
        {chartConfig.Legend.enable && <Legend />}
        {chartConfig.Lines.map((line, i) => (
          <Line key={i} {...line} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
