import {
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import { tokens } from "../../theme";
import { IDetector } from "../../types";
import { AddDetectorCard } from "./AddDetectorCard";

export default function DetectorList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(GlobalContext);
  return (
    <Container
      component="main"
      sx={{
        backgroundColor: `${colors.primary[400]}`,
        borderRadius: "10px",
        height: "90%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Grid sx={{ height: "50%" }}>
        <Typography
          variant="h2"
          paddingLeft="55px"
          paddingBottom="20px"
          paddingTop="20px"
        >
          Detector List:
        </Typography>
        <Grid
          display="flex"
          flexDirection="row"
          width="100%"
          height="70%"
          flexWrap="wrap"
          overflow="auto"
          // border="2px solid black"
          // borderRadius="20px"
        >
          {user?.detectors
            ? user?.detectors.map((detector: IDetector) => (
                <DetectorCard key={detector.detector_id} detector={detector} />
              ))
            : null}
        </Grid>
      </Grid>
      <Typography variant="h2" paddingLeft="55px" paddingBottom="20px">
        Add new detector:
      </Typography>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <AddDetectorCard />
      </Grid>
    </Container>
  );
}

type Props = {
  detector: IDetector;
};

export function DetectorCard({ detector }: Props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "15vw", height: "40%", margin: 1 }}>
      <CardActionArea
        sx={{
          height: "100%",
          width: "100%",

          backgroundColor: `${colors.grey[800]}`,
        }}
        onClick={() => navigate("/detector_dashboard/" + detector.detector_id)}
      >
        <Typography variant="h4"> Name: {detector.detector_id}</Typography>
        <Typography variant="h4"> Type: {detector.type}</Typography>
      </CardActionArea>
    </Card>
  );
}
