import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import {
  Alert,
  Card,
  FormControlLabel,
  Grid,
  IconButton,
  Snackbar,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { ApiResponse } from "../../apis/api.util";
import { ExportDetectorToCsv } from "../../apis/data_api";
import {
  GetDetector,
  GetDetectorImage,
  SetConfig,
} from "../../apis/detector_api";
import { GetLogsByDetector } from "../../apis/log_api";
import { GlobalContext } from "../../App";
import { LineChartWrapper } from "../../components/componentUtils";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import InfoDialog from "../../components/InfoDialog";
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

  const resp_detector: ApiResponse = await GetDetector(detector_id);

  const resp_detector_image = await GetDetectorImage(detector_id);

  let detector_image;
  if (resp_detector_image.status === 400) {
    detector_image = null;
  } else {
    const data = await resp_detector_image.blob();
    detector_image = URL.createObjectURL(data) || null;
  }

  const resp_logs: ApiResponse = await GetLogsByDetector(detector_id);

  return {
    detector_resp: resp_detector,
    detector_image: detector_image,
    logs_resp: resp_logs,
  };
}

export default function DetectorDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setUser } = useContext(GlobalContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const { detector_resp, detector_image, logs_resp } = useLoaderData() as {
    detector_resp: ApiResponse;
    detector_image: string;
    logs_resp: ApiResponse;
  };
  const detector: IDetector = detector_resp.Unwrap(setUser);
  const logs: ILog[] = logs_resp.Unwrap(setUser);
  const [exportLoading, setExportLoading] = useState(false);
  const [data, setData] = useState<IDetectorConfig>({
    char_num: detector?.detector_config.char_num,
    coma_position: detector?.detector_config.coma_position,
    delay: detector?.detector_config.delay,
    flash: detector?.detector_config.flash,
    cost: detector?.detector_config.cost,
  });
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

  const handleInfoDialogOpen = () => {
    setInfoDialogOpen(true);
  };

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  const handleSubmit = async () => {
    const result = await SetConfig(data, detector.detector_id);

    if (result) {
      setChanged(true);
    }
  };

  const handleDelete = () => {
    setOpenPopup(true);
  };

  const handleExport = async () => {
    setExportLoading(true);
    await ExportDetectorToCsv(detector.detector_id);
    setExportLoading(false);
  };

  const [changed, setChanged] = useState(false);
  const [alert, setAlert] = useState(false);

  if (!data) {
    return <>data error</>;
  }
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
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
          detectorName={detector.detector_name}
          subtitle={`Weoclome to your Detector's Dashboard!`}
        />

        <Box
          width="40%"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          sx={{
            "& > :not(:last-child)": {
              marginRight: "8px",
            },
          }}
        >
          <CustomButton
            icon={<GetAppOutlinedIcon />}
            text="Export Data"
            onClickHandler={handleExport}
            color={colors.blueAccent[600]}
            secondColor={colors.blueAccent[500]}
            loading={exportLoading}
          />
          <CustomButton
            icon={<DeleteOutlineOutlinedIcon />}
            text="Delete Detector"
            onClickHandler={handleDelete}
            color={colors.redAccent[600]}
            secondColor={colors.redAccent[500]}
          />
          <CustomButton
            icon={<PublishOutlinedIcon />}
            text="Submit Changes"
            onClickHandler={handleSubmit}
            color={colors.blueAccent[600]}
            secondColor={colors.blueAccent[500]}
          />
          <IconButton onClick={handleInfoDialogOpen}>
            <InfoSharpIcon
              fontSize="large"
              sx={{ color: `${colors.greenAccent[400]}` }}
            />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={8} xs={12}>
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
        <Grid item lg={4} xs={12}>
          <Box
            component="div"
            sx={{ backgroundColor: `${colors.primary[400]}`, height: "100%" }}
            borderRadius={"5px !important"}
            display="flex"
            justifyContent="center"
            alignItems="center"
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
                    color: colors.blueAccent[500],
                    "& label.Mui-focused": {
                      color: colors.blueAccent[500],
                      zIndex: 0,
                    },
                    "& label": {
                      zIndex: 0,
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderColor: colors.blueAccent[500],
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography style={{ fontSize: "1.1rem" }}>
                          Ft
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
                    color: colors.blueAccent[500],
                    "& label.Mui-focused": {
                      color: colors.blueAccent[500],
                      zIndex: 0,
                    },
                    "& label": {
                      zIndex: 0,
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderColor: colors.blueAccent[500],
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
                      sx={{
                        "& .MuiSwitch-thumb": {
                          backgroundColor: `${colors.blueAccent[500]}`,
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: `${colors.blueAccent[300]}`,
                        },
                      }}
                      checked={data?.flash == 1 ? true : false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, "flash")
                      }
                      name="toggler"
                    />
                  }
                  label={
                    <Typography sx={{ color: colors.grey[100] }}>
                      Flash On/Off
                    </Typography>
                  }
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
              {<LineChartWrapper type="detector" id={detector.detector_id} />}
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
              overflow: "auto",
            }}
          >
            <Typography variant="h4" margin="10px" color={colors.grey[100]}>
              Logs
            </Typography>
            <Box display="flex" flexDirection="column-reverse">
              {logs && logs.length > 0 ? (
                logs?.map((log, i) => <LogCard key={i} log={log} index={i} />)
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="495px"
                  color={colors.grey[100]}
                >
                  <Typography>No logs available.</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DeletePopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        detector_id={detector.id}
      ></DeletePopup>
      <InfoDialog
        open={infoDialogOpen}
        onClose={handleInfoDialogClose}
        detector={detector}
        data={data}
      />
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
