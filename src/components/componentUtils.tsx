import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "../apis/api.util";
import { GetLinePlotData, GetLinePlotDataByLocation } from "../apis/data_api";
import { GlobalContext } from "../App";
import NewLineChart from "../components/NewLineChart";
import { LocationContext } from "../scenes/dashboard/NewDashboard";
import { ILineChartResponse, IMonthlyLog, PieData } from "../types";

export function barChartDataWrapper(logs: IMonthlyLog[] | undefined) {
  if (logs) {
    const data = logs.map((log: IMonthlyLog) => ({
      month: log.month,
      water: log.values.water,
      waterColor: "hsl(229, 70%, 50%)",
      electricity: log.values.electricity,
      electricityColor: "hsl(104, 70%, 50%)",
      gas: log.values.gas,
      gasColor: "hsl(344, 70%, 50%)",
    }));

    return data;
  }
  return null;
}

export function allZero(data: PieData[]) {
  let allZero = true;
  data.forEach((data: PieData) => {
    if (data.value != 0) {
      allZero = false;
    }
  });
  return allZero;
}

export function LineChartWrapper(type: string, id?: string, lineType?: string) {
  const [data, setData] = useState<ILineChartResponse | null>();
  const { location } = useContext(LocationContext);
  const { setUser } = useContext(GlobalContext);

  async function getData() {
    if (type === "detector") {
      const response: ApiResponse = await GetLinePlotData(id!);
      setData(response.Unwrap(setUser));
    } else if (type === "location") {
      if (location && lineType) {
        const response: ApiResponse = await GetLinePlotDataByLocation(
          location.id,
          lineType,
        );
        setData(response.Unwrap(setUser));
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <>No data is available.</>;
  }

  return <NewLineChart response_data={data} />;
}
