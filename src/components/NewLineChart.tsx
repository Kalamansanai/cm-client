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
import { ILineChartData } from "types";
import { GetLinePlotData } from "../apis/data_api";

type Props = {
  detector_id: string;
};

//TODO: make everything coming from the config
export default function NewLineChart({ detector_id }: Props) {
  const [data, setData] = useState<ILineChartData[]>([]);

  useMemo(async () => {
    const data: ILineChartData[] = await GetLinePlotData(detector_id);
    if (data) {
      setData(data);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={50}
        height={0}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0, 20]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
