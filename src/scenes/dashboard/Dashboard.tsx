import BoltIcon from "@mui/icons-material/Bolt";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Box, Button, Typography, useTheme } from "@mui/material";
import BarChart from "../../components/BarChart";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          component="div"
          sx={{ backgroundColor: `${colors.primary[400]}` }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={"5px !important"}
        >
          <StatBox
            title="100"
            subtitle="Pictures Obtained"
            progress="0.98"
            increase="-2%"
            icon={
              <CameraAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          component="div"
          sx={{ backgroundColor: `${colors.primary[400]}` }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={"5px !important"}
        >
          <StatBox
            title="1316"
            subtitle="Water meter value increase"
            progress="0.10"
            increase="+10%"
            icon={
              <WaterDropIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          component="div"
          sx={{ backgroundColor: `${colors.primary[400]}` }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={"5px !important"}
        >
          <StatBox
            title="814"
            subtitle="Electricity value increase"
            progress="0.30"
            increase="+30%"
            icon={
              <BoltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          component="div"
          sx={{ backgroundColor: `${colors.primary[400]}` }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={"5px !important"}
        >
          <StatBox
            title="678"
            subtitle="Gas Meter value"
            progress="0.60"
            increase="+60%"
            icon={
              <GasMeterIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          component="div"
          sx={{ backgroundColor: `${colors.primary[400]}` }}
          p="30px"
          borderRadius={"5px !important"}
        >
          <Typography variant="h5" fontWeight="600">
            Pie Chart
          </Typography>
          <Box height="250px" mt={"-20px"}>
            <PieChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          component="div"
          sx={{ backgroundColor: `${colors.primary[400]}` }}
          borderRadius={"5px !important"}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Bar Chart
          </Typography>
          <Box height="250px" mt={"-20px"}>
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* ROW 3 */}

        <Box
          gridColumn="span 12"
          gridRow="span 2"
          component="div"
          sx={{ backgroundColor: `${colors.primary[400]}` }}
          borderRadius={"5px !important"}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Line Chart
              </Typography>
            </Box>
          </Box>
          {/* <Box height="250px" m="-20px 0 0 0">
            <LineChart
              isDashboard={true}
              isCustomLineColors={false}
              detector_id="11:b4:12:ad"
            />
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
