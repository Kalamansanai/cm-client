import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";

export default function getCardComponentByType(type: string) {
  switch (type) {
    case "pie":
      return <PieChart />;
    case "waterStatBox":
      return <StatBox type="water" />;
    case "gasStatBox":
      return <StatBox type="gas" />;
    case "electricityStatBox":
      return <StatBox type="electricity" />;
    default:
      break;
  }
}
