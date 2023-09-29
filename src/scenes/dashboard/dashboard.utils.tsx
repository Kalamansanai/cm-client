import BarChart from "../../components/BarChart";
import { LineChartWrapper } from "../../components/componentUtils";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";

export default function useCardComponentByType(type: string) {
  switch (type) {
    case "pie":
      return <PieChart />;
    case "waterStatBox":
      return <StatBox type="water" />;
    case "gasStatBox":
      return <StatBox type="gas" />;
    case "electricityStatBox":
      return <StatBox type="electricity" />;
    case "bar":
      return <BarChart />;
    case "line":
      return <LineChartWrapper type="location" />;
    default:
      break;
  }
}
