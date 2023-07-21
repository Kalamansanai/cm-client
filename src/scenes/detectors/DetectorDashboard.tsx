import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { GlobalContext } from "../../App";
import { SetConfig } from "../../apis/detector_api";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
import { IDetector, IDetectorConfig } from "../../types";
import DeletePopup from "./DeletePopup";
import { ExportPie } from "../../apis/data_api";

export async function loader({ params }: { params: Params }) {
  const id = params["detector_id"]! as any as string;
  return id;
}

export default function DetectorDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useContext(GlobalContext);

  const detector_id = useLoaderData() as string;

  let detector: IDetector = {} as IDetector;
  if (user) {
    detector = user.detectors.find(
      (detector: IDetector) => detector.detector_id === detector_id
    ) as IDetector;
  }

  const [data, setData] = useState<IDetectorConfig>({
    charNum: detector.detector_config?.charNum,
    comaPosition: detector.detector_config?.comaPosition,
    delay: detector.detector_config?.delay,
    flash: detector.detector_config?.flash,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [key]: key != "flash" ? parseInt(value) : false,
    }));
  };

  const [openPopup, setOpenPopup] = useState(false);

  const handleSubmit = async () => {
    // if (data.type.trim() === "" || data.charNum.trim() === "") {
    //   alert("Please fill in the required fields.");
    //   return;
    // }

    await SetConfig(data, detector_id);

    console.log("Sending data:", data);
  };

  const handleDelete = () => {
    setOpenPopup(true);
  };

  const handleExport = () => {
    ExportPie(detector_id);
  };

  return (
    <Box m="16px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Detector"
          subtitle={`Detector Name: ${detector.detector_name} | Mac Address: ${detector.detector_id}`}
        />
        <Box
          width="40%"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
        >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleExport}
          >
            Export Data
          </Button>
          <Button
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDelete}
          >
            Delete Detector
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleSubmit}
          >
            <PublishOutlinedIcon sx={{ mr: "10px" }} />
            Submit Changes
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2} columns={2} rowSpacing={2} columnSpacing={2}>
        <Grid item xs={2}>
          <Box
            component="div"
            sx={{ backgroundColor: `${colors.primary[400]}` }}
            borderRadius={"5px !important"}
            p={"10px"}
          >
            <Grid
              container
              spacing={1}
              columns={3}
              rowSpacing={2}
              columnSpacing={1}
            >
              <Grid item xs={1}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Char Num"
                  value={data.charNum}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "charNum")
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Coma Position"
                  value={data.comaPosition}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "comaPosition")
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Photo Time"
                  value={data.delay}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "delay")
                  }
                />
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, "flash")
                      }
                      color="info"
                      name="toggler"
                    />
                  }
                  label="Flash On/Off"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            component="div"
            sx={{ backgroundColor: `${colors.primary[400]}` }}
            borderRadius={"5px !important"}
            p={"1px"}
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
            <Box height={"500px"} m="-20px 0 0 0">
              <LineChart
                isDashboard={true}
                detector_id={detector_id}
                isCustomLineColors={false}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DeletePopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        detector_id={detector_id}
      ></DeletePopup>
    </Box>
  );
}
