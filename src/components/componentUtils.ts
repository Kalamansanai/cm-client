import { IMonthlyLog, PieData } from "../types";

export function barChartDataWrapper(logs: IMonthlyLog[] | undefined) {
  if (logs) {
    const data = logs.map((log: IMonthlyLog) => ({
      month: log.month,
      water: log.values.water,
      waterColor: "hsl(296 70% 50%)",
      electricity: log.values.electricity,
      electricityColor: "hsl(97, 70% 50%)",
      gas: log.values.gas,
      gasColor: "hsl(340, 70%, 50%)",
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
