import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart
          isCustomLineColors={false}
          isDashboard={false}
          detector_id="18db1559-982d-4ede-92b6-9b21e05acdc2"
        />
      </Box>
    </Box>
  );
};

export default Line;
