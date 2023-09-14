import BoltIcon from "@mui/icons-material/Bolt";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Box, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { LocationContext } from "../scenes/dashboard/NewDashboard";
import { tokens } from "../theme";
import { IMonthlyLog } from "../types";

interface StatBoxProps {
  type: string;
}

const StatBox: React.FC<StatBoxProps> = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { location } = useContext(LocationContext);
  // if(!location.monthly_logs){
  //   return <></>
  // }
  // if (location.error === "401") {
  //   return <>No data is available</>;
  // }

  const currentMonthValues: IMonthlyLog | undefined =
    location?.monthly_logs.slice(-1)[0];

  let value: string = "0";
  let icon = null;

  switch (type) {
    case "water":
      icon = <WaterDropIcon sx={{ color: "white", fontSize: "26px" }} />;
      value = currentMonthValues
        ? currentMonthValues?.values.water.toString()
        : "0";
      break;
    case "gas":
      icon = <GasMeterIcon sx={{ color: "white", fontSize: "26px" }} />;
      value = currentMonthValues
        ? currentMonthValues.values.gas.toString()
        : "0";
      break;
    case "electricity":
      icon = <BoltIcon sx={{ color: "white", fontSize: "26px" }} />;
      value = currentMonthValues
        ? currentMonthValues.values.electricity.toString()
        : "0";
      break;
    default:
      break;
  }

  return (
    <Box width="100%" m="0 10px">
      <Box display="flex" justifyContent="center">
        <Box
          width="50%"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
        >
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {value}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
      {/* <Box display="flex" justifyContent="space-between" mt="2px">
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
      </Box> */}
    </Box>
  );
};

export default StatBox;
