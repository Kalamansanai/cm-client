import BoltIcon from "@mui/icons-material/Bolt";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetLocation } from "../../apis/location_api";
import { GlobalContext } from "../../App";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { IDetector, ILocation } from "../../types";
import { AddDetectorCard } from "./AddDetectorCard";

export const DetectorsContext = createContext<{
  location: ILocation | null;
  detectors: IDetector[];
  setDetectors: (u: IDetector[]) => void;
}>({
  location: null,
  detectors: [],
  setDetectors: () => {},
});

export default function DetectorList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(GlobalContext);

  const [location, setLocation] = useState<ILocation | null>(null);
  const [detectors, setDetectors] = useState<IDetector[]>([]);

  async function GetDetectorList() {
    if (user) {
      const response: ILocation = await GetLocation();
      console.log("location:");
      console.log(response);
      // const response_data: IDetector[] = await ListDetectorsByUser(user?.id);
      setLocation(response);
      setDetectors(response.detectors);
    }
  }

  useEffect(() => {
    GetDetectorList();
  }, [user]);

  const hasNoDetectors = detectors.length === 0;

  if (!user) {
    return null;
  }

  return (
    <DetectorsContext.Provider
      value={{
        location,
        detectors,
        setDetectors,
      }}
    >
      <Box>
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            backgroundColor: `${colors.primary[400]}`,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: "16px",
          }}
        >
          <Grid
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
            justifyContent="center"
          >
            <AddDetectorCard />
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Header
              title="Detector List:"
              subtitle="You can see and edit your detectors here."
              align={"left"}
            />
            <Grid
              display="flex"
              flexDirection="row"
              width="100%"
              height="100%"
              flexWrap="wrap"
              overflow="auto"
              sx={{ justifyContent: "space-evenly" }}
            >
              {hasNoDetectors ? (
                <Typography variant="body1" color={colors.redAccent[500]}>
                  You currently have no detectors. Add a new one to get started!
                </Typography>
              ) : (
                detectors.map((detector: IDetector) => (
                  <DetectorCard
                    key={detector.detector_id}
                    detector={detector}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DetectorsContext.Provider>
  );
}

type Props = {
  detector: IDetector;
};

export function DetectorCard({ detector }: Props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let icon;
  switch (detector.type) {
    case "water":
      icon = <WaterDropIcon fontSize="large" sx={{ mt: "5px", mb: "5px" }} />;
      break;
    case "electricity":
      icon = <BoltIcon fontSize="large" sx={{ mt: "5px", mb: "5px" }} />;
      break;
    case "gas":
      icon = <GasMeterIcon fontSize="large" sx={{ mt: "5px", mb: "5px" }} />;
      break;
    default:
      icon = null;
  }

  return (
    <Card variant="outlined" sx={{ width: "30%", height: "40%", margin: 1 }}>
      <CardActionArea
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: `${colors.greenAccent[600]}`,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={() => navigate("/detector_dashboard/" + detector.detector_id)}
      >
        <Typography
          variant="body1"
          color={colors.grey[100]}
          sx={{ margin: 0, flex: 1 }}
        >
          {detector.detector_id}
        </Typography>
        <Typography variant="h4">{detector.type}</Typography>
        {icon}
      </CardActionArea>
    </Card>
  );
}
