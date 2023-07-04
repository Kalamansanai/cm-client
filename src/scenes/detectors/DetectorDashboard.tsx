import { Container, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { IDetector, User } from "../../types";
import { useLoaderData, Params } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../App";

export async function loader({ params }: { params: Params }) {
  const id = params["detector_id"]! as any as string;
  return id;
}

export default function DetectorDashboard() {
  const { user } = useContext(GlobalContext);

  const detector_id = useLoaderData() as string;

  const detector: IDetector | undefined = user?.detectors.find(
    (detector: IDetector) => detector.detector_id === detector_id
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      {detector?.type}
    </Container>
  );
}
