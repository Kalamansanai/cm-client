import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Divider,
  Grid,
  TextField,
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

const backend = process.env.REACT_APP_BACKEND;

type regProps = {
  id: string;
  name: string;
  type: string;
};

async function AddDetector(props: regProps) {
  return await fetch(`${backend}/add_detector`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      detector_id: props.id,
      detector_name: props.name,
      type: props.type,
    }),
  });
}

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
        {user?.detectors
          ? user?.detectors.map((detector: IDetector) => (
              <DetectorCard key={detector.detector_id} detector={detector} />
            ))
          : null}
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
    <Card sx={{ width: "60%", height: "30%", margin: 1 }}>
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

interface FormData {
  name: string;
  type: string;
  id: string;
}

export function AddDetectorCard() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await AddDetector(formData);

    console.log(response.json());
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignContent="center"
      width="50%"
      height="100%"
      sx={{ backgroundColor: "black", opacity: "60%", borderRadius: 5 }}
    >
      <Grid sx={{ borderRadius: 2, padding: 5 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="id"
            label="Id"
            value={formData.id}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="type"
            label="Type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
