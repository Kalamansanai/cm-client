import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { DetectorType, IDetector } from "types";
import { AddDetector } from "../../apis/detector_api";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DetectorsContext } from "./DetectorList";

interface FormData {
  location_id: string;
  name: string;
  type: string;
  id: string;
}

export function AddDetectorCard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inputLength, setInputLength] = useState(0);
  const { location, detectors, setDetectors } = useContext(DetectorsContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location_id: "",
    name: "",
    type: "",
    id: "",
  });

  const [addingError, setAddingError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setInputLength(inputValue.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    formData.location_id = location!.id;

    const response = await AddDetector(formData);

    if (response.result === "error") {
      setAddingError(response.data);
      return;
    }

    const newDetector: IDetector = {
      id: response.data,
      detector_id: formData.id,
      detector_name: formData.name,
      detector_config: {},
      type: formData.type as DetectorType,
      state: "init",
      image_path: "",
    };

    const newDetectors = [...detectors, newDetector];
    setDetectors(newDetectors);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        margin: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      <Snackbar
        open={addingError !== null}
        autoHideDuration={6000}
        onClose={() => setAddingError(null)}
        key={"bottom" + "left"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAddingError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {addingError}
        </Alert>
      </Snackbar>
      <Header
        title="Add new detector:"
        subtitle="You add a new detector to you account."
        align={"left"}
      />
      <form onSubmit={handleSubmit}>
        <TextField
          name="id"
          label="Id"
          variant="filled"
          value={formData.id}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 36 }}
          sx={{
            gridColumn: "span 2",
            color: colors.blueAccent[500],
            "& label.Mui-focused": {
              color: colors.blueAccent[500],
              zIndex: 0,
            },
            "& label": {
              zIndex: 0,
            },
          }}
        />
        {inputLength === 36 && (
          <Typography variant="caption" color="error">
            Maximum length reached
          </Typography>
        )}
        <TextField
          name="name"
          label="Name"
          variant="filled"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            mt: "20px",
            color: colors.blueAccent[500],
            "& label.Mui-focused": {
              color: colors.blueAccent[500],
              zIndex: 0,
            },
            "& label": {
              zIndex: 0,
            },
          }}
        />

        <TextField
          name="type"
          label="Type"
          variant="filled"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          required
          select
          sx={{
            mt: "20px",
            color: colors.blueAccent[500],
            "& label.Mui-focused": {
              color: colors.blueAccent[500],
              zIndex: 0,
            },
            "& label": {
              zIndex: 0,
            },
          }}
        >
          {detectorTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: "20px" }}
        >
          Submit
        </Button>
        <Box display="flex" justifyContent="center">
          {loading ? <CircularProgress /> : null}
        </Box>
      </form>
    </Box>
  );
}

const detectorTypes = ["water", "electricity", "gas"];
