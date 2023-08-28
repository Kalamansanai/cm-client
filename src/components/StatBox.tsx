import BoltIcon from "@mui/icons-material/Bolt";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Box, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../App";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

interface StatBoxProps {
  type: string;
}

const StatBox: React.FC<StatBoxProps> = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useContext(GlobalContext);

  let value: string = "0";
  let icon = null;
  let progress = "0.60";
  let subtitle = "Water Meter value increase";
  let increase = "+60%";

  if (user?.monthly_sums) {
    switch (type) {
      case "water":
        icon = <WaterDropIcon sx={{ color: "white", fontSize: "26px" }} />;
        value = user.monthly_sums.water
          ? user.monthly_sums.water.toString()
          : "0";
        break;
      case "gas":
        icon = <GasMeterIcon sx={{ color: "white", fontSize: "26px" }} />;
        value = user.monthly_sums.gas ? user.monthly_sums.gas.toString() : "0";
        break;
      case "electricity":
        icon = <BoltIcon sx={{ color: "white", fontSize: "26px" }} />;
        value = user.monthly_sums.electricity
          ? user.monthly_sums.electricity.toString()
          : "0";
        break;
      default:
        break;
    }
  }

  return (
    <Box width="100%" m="0 10px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {value}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
