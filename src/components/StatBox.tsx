import BoltIcon from "@mui/icons-material/Bolt";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Box, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "../apis/api.util";
import { GetLocationMonthlyStatByType } from "../apis/data_api";
import { GlobalContext } from "../App";
import { LocationContext } from "../scenes/dashboard/NewDashboard";
import { tokens } from "../theme";

interface StatBoxProps {
  type: string;
}

const StatBox: React.FC<StatBoxProps> = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { location } = useContext(LocationContext);
  const { setUser } = useContext(GlobalContext);
  const [value, setValue] = useState(0);

  async function getStat() {
    if (location) {
      const response: ApiResponse = await GetLocationMonthlyStatByType(
        location?.id,
        type,
      );
      setValue(Math.floor(response.Unwrap(setUser)));
    }
  }

  useEffect(() => {
    getStat();
  }, []);

  let icon = null;
  let unit = null;

  switch (type) {
    case "water":
      icon = <WaterDropIcon sx={{ color: "white", fontSize: "26px" }} />;
      unit = (
        <div>
          m<sup>3</sup>
        </div>
      );
      break;
    case "gas":
      icon = <GasMeterIcon sx={{ color: "white", fontSize: "26px" }} />;
      unit = (
        <div>
          m<sup>3</sup>
        </div>
      );
      break;
    case "electricity":
      icon = <BoltIcon sx={{ color: "white", fontSize: "26px" }} />;
      unit = <div>kWh</div>;
      break;
    default:
      break;
  }

  return (
    <Box width="100%" m="0 10px">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          width="50%"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {value}
          </Typography>
          {unit}
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
