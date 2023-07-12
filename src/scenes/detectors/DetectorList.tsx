import {
  Box,
  Card,
  CardActionArea,
  Container,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { login_cookie } from "../login/Login";
import { useContext, useEffect, useState } from "react";
import { IDetector, User } from "../../types";
import { GlobalContext } from "../../App";
import { useLoaderData, useNavigate } from "react-router-dom";

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
        justifyContent: "flex-start",
      }}
    >
      {user?.detectors
        ? user?.detectors.map((detector: IDetector) => (
            <DetectorCard key={detector.detector_id} detector={detector} />
          ))
        : null}
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
    <Card sx={{ width: "40%", height: "10%", margin: 1 }}>
      <CardActionArea
        sx={{
          height: "100%",
          width: "100%",

          backgroundColor: `${colors.grey[800]}`,
        }}
        onClick={() => navigate("/detector_dashboard/" + detector.detector_id)}
      >
        <Typography variant="h4">{detector.detector_id}</Typography>
        <Typography variant="h4"> {detector.type}</Typography>
      </CardActionArea>
    </Card>
  );
}
