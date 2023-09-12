import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Snackbar,
  TextField,
  useTheme,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { DetectorType, IDetector } from "types";
import { AddDetector } from "../../apis/detector_api";
import { GlobalContext } from "../../App";
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
  // const [inputLength, setInputLength] = useState(0);
  const { setDetectorConfigChanged } = useContext(GlobalContext);
  const { location, detectors, setDetectors } = useContext(DetectorsContext);
  const [loading, setLoading] = useState(false);
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    location_id: "",
    name: "",
    type: "",
    id: "",
  });
  const [addingError, setAddingError] = useState<string | null>(null);
  const UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  const detectorTypes = ["water", "electricity", "gas"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    if (inputName === "id") {
      const inputElement = e.target;
      if (inputElement) {
        if (!UUID_REGEX.test(inputValue)) {
          inputElement.setCustomValidity("Invalid UUID format");
        } else {
          inputElement.setCustomValidity("");
        }
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    formData.location_id = location!.id;

    const response = await AddDetector(formData);

    if (response.result === "error") {
      setAddingError(response.data);
      setLoading(false);
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
    setDetectorConfigChanged(true);
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
          inputProps={{
            maxLength: 36,
            pattern: UUID_REGEX.source,
          }}
          inputRef={idInputRef}
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
        <Box sx={{ m: 5, position: "relative" }}>
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                color: `${colors.greenAccent[500]}`,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: `${colors.greenAccent[700]}`,
              }}
            >
              Add Detector
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}
