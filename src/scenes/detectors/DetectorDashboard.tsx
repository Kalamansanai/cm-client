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
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { ExportDetectorToCsv } from "../../apis/data_api";
import { GetDetectorWithLogs, SetConfig } from "../../apis/detector_api";
import Header from "../../components/Header";
import NewLineChart from "../../components/NewLineChart";
import { tokens } from "../../theme";
import { IDetector, IDetectorConfig, ILog } from "../../types";
import DeletePopup from "./DeletePopup";

// const locale = "hu-HU";

export async function loader({ params }: { params: Params }) {
  const detector_id = params["detector_id"]! as any as string;

  try {
    const detector = await GetDetectorWithLogs(detector_id);
    console.log(detector_id);
    return detector || null;
  } catch {
    return null;
  }
}

export default function DetectorDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const detector = (useLoaderData() as IDetector) || null;

  const [data, setData] = useState<IDetectorConfig>({
    charNum: detector?.detector_config.charNum,
    comaPosition: detector?.detector_config.comaPosition,
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
      [key]: key !== "flash" ? parseInt(value) : checked ? 1 : 0,
    }));
  };

  const [openPopup, setOpenPopup] = useState(false);

  const handleSubmit = async () => {
    const result = await SetConfig(data, detector.detector_id);

    if (result) {
      setChanged(true);
    }

    console.log("Sending data:", data);
  };

  const handleDelete = () => {
    setOpenPopup(true);
  };

  const handleExport = () => {
    ExportDetectorToCsv(detector.detector_id);
  };

  const [changed, setChanged] = useState(false);

  return (
    <Box m="16px" sx={{ height: "100%", width: "100%" }}>
      <Snackbar
        open={changed}
        autoHideDuration={6000}
        onClose={() => setChanged(false)}
        key={"bottom" + "left"}
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
        <Grid item xs={12}>
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
                  type="number"
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
                  type="number"
                  label="Photo Time"
                  value={data.delay}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "delay")
                  }
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
              {detector
                ? detector.logs?.map((log) => <LogCard log={log} />)
                : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DeletePopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        detector_id={detector.detector_id}
      ></DeletePopup>
    </Box>
  );
}

type Props = {
  log: ILog;
};

function LogCard({ log }: Props) {
  return (
    <Card
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

// export const formatDate = (d: Date): string => {
//   return d.toLocaleDateString(locale) + " " + d.toLocaleTimeString(locale);
// };
