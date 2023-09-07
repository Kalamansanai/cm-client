import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import {
  Alert,
  Button,
  Card,
  FormControlLabel,
  Grid,
  Snackbar,
  Switch,
  TextField,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { ExportDetectorToCsv } from "../../apis/data_api";
import {
  GetDetectorImage,
  GetDetectorWithLogs,
  SetConfig,
} from "../../apis/detector_api";
import Header from "../../components/Header";
import NewLineChart from "../../components/NewLineChart";
import { tokens } from "../../theme";
import { IDetector, IDetectorConfig, ILog } from "../../types";
import DeletePopup from "./DeletePopup";

function calculateInputChangeValue(
  key: string,
  value: string,
  checked: boolean,
) {
  switch (key) {
    case "flash":
      return checked ? 1 : 0;
    case "delay":
      return parseInt(value) * 3600000;
    default:
      return parseInt(value);
  }
}

export async function loader({ params }: { params: Params }) {
  const detector_id = params["detector_id"]! as any as string;

  let detector = null;
  let detector_image = null;

  const resp_detector = await GetDetectorWithLogs(detector_id);
  detector = resp_detector || null;

  const resp_detector_image = await GetDetectorImage(detector_id);

  if (resp_detector_image.status === 400) {
    detector_image = null;
  } else {
    const data = await resp_detector_image.blob();
    detector_image = URL.createObjectURL(data) || null;
  }

  return { detector: detector, detector_image: detector_image };
}

export default function DetectorDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { detector, detector_image } = useLoaderData() as {
    detector: IDetector;
    detector_image: string;
  };

  const [data, setData] = useState<IDetectorConfig>({
    charNum: detector?.detector_config.charNum,
    comaPosition: detector?.detector_config.comaPosition,
    delay: detector?.detector_config.delay,
    flash: detector?.detector_config.flash,
    cost: detector?.detector_config.cost,
  });
  console.log("kkkkk");
  console.log(data);

  useEffect(() => {
    setData(detector?.detector_config);
  }, [detector]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const { value, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [key]: value ? calculateInputChangeValue(key, value, checked) : "",
    }));
  };

  const [openPopup, setOpenPopup] = useState(false);

  const handleSubmit = async () => {
    if (Object.values(data).some((value) => value === "")) {
      setAlert(true);
      return null;
    }
    const result = await SetConfig(data, detector.detector_id);

    if (result) {
      setChanged(true);
    }
  };

  const handleDelete = () => {
    setOpenPopup(true);
  };

  const handleExport = () => {
    ExportDetectorToCsv(detector.id);
  };

  const [changed, setChanged] = useState(false);
  const [alert, setAlert] = useState(false);

  return (
    <Box m="16px" sx={{ height: "100%", width: "100%" }}>
      <Snackbar
        open={changed}
        autoHideDuration={6000}
        onClose={() => setChanged(false)}
        key={"changeAlert"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setChanged(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Config values changed successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}
        key={"emptyAlert"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Empty fields are not allowed!
        </Alert>
      </Snackbar>
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
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {detector_image ? (
            <Box
              sx={{
                backgroundColor: `${colors.primary[400]}`,
              }}
              borderRadius={"5px !important"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  backgroundColor: `${colors.primary[400]}`,
                  border: "2px solid black",
                }}
                borderRadius={"5px !important"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={detector_image} height="200px" />
              </Box>
            </Box>
          ) : (
            "no image yet"
          )}
        </Grid>
        <Grid item xs={8}>
          <Box
            component="div"
            sx={{ backgroundColor: `${colors.primary[400]}`, height: "100%" }}
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
                  type="number"
                  label="Char Num"
                  value={data.charNum}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "charNum")
                  }
                  sx={{
                    "& label": {
                      zIndex: 0,
                    },
                  }}
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
                  sx={{
                    "& label": {
                      zIndex: 0,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Photo Time(hours)"
                  value={data.delay ? data.delay / 3600000 : undefined}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "delay")
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography style={{ fontSize: "1.1rem" }}>
                          h
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& input[type="number"]': {
                      "-webkit-appearance": "none",
                      "-moz-appearance": "textfield",
                      "&::-webkit-inner-spin-button": {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                      "&::-webkit-outer-spin-button": {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    },
                    "& label": {
                      zIndex: 0,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Cost"
                  value={data.cost}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "cost")
                  }
                  sx={{
                    "& label": {
                      zIndex: 0,
                    },
                  }}
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
                      checked={data?.flash == 1 ? true : false}
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
        <Grid item xs={8}>
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
            <Box height={"500px"}>
              <NewLineChart detector_id={detector.detector_id} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: `${colors.primary[400]}`,
              borderRadius: "8px ",
              height: "550px",
              padding: "5px",
            }}
          >
            <Typography variant="h4" margin="10px">
              Logs
            </Typography>
            <Box
              sx={{
                overflow: "auto",
                height: "90%",
              }}
            >
              <Box display="flex" flexDirection="column-reverse">
                {detector
                  ? detector.logs?.map((log, i) => (
                      <LogCard key={i} log={log} index={i} />
                    ))
                  : null}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DeletePopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        detector_id={detector.id}
      ></DeletePopup>
    </Box>
  );
}

type Props = {
  log: ILog;
  index: number;
};

function LogCard({ log, index }: Props) {
  return (
    <Card
      key={index}
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        bgcolor: "background.paper",
        m: 1,
      }}
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography fontSize="1.3em" sx={{ fontFamily: "monospace" }}>
            {log.value}
          </Typography>
          <Typography fontSize="1em" sx={{ color: "text.secondary" }}>
            {log.timestamp.toString()}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
