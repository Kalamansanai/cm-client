import BoltIcon from "@mui/icons-material/Bolt";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";

export default function getCardComponentByType(type: string) {
  switch (type) {
    case "pie":
      return <PieChart />;
    case "waterStatBox":
      return (
        <StatBox
          title="1316"
          subtitle="Water meter value increase"
          progress="0.10"
          increase="+10%"
          icon={<WaterDropIcon sx={{ color: "#e5e5e5", fontSize: "26px" }} />}
        />
      );
    case "gasStatBox":
      return (
        <StatBox
          title="678"
          subtitle="Gas Meter value"
          progress="0.60"
          increase="+60%"
          icon={<GasMeterIcon sx={{ color: "white", fontSize: "26px" }} />}
        />
      );
    case "electricityStatBox":
      return (
        <StatBox
          title="814"
          subtitle="Electricity value increase"
          progress="0.30"
          increase="+30%"
          icon={<BoltIcon sx={{ color: "white", fontSize: "26px" }} />}
        />
      );
    default:
      break;
  }
}
