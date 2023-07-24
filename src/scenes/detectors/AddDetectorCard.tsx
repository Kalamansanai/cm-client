import { useContext, useState } from "react";
import { AddDetector } from "../../apis/detector_api";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { GetUserData } from "../../apis/user_api";
import { GlobalContext } from "../../App";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DetectorType, IDetector, User } from "../../types";

interface FormData {
  name: string;
  type: string;
  id: string;
  cost: number;
}

export function AddDetectorCard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, setUser } = useContext(GlobalContext);
  const [inputLength, setInputLength] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    id: "",
    cost: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setInputLength(inputValue.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await AddDetector(formData);

    const newDetector: IDetector = {
      detector_id: formData.id,
      detector_name: formData.name,
      detector_config: {},
      type: formData.type as DetectorType,
      cost: formData.cost,
      state: "init",
    };

    const updatedUser: User = {
      ...(user as User),
      detectors: [...(user?.detectors || []), newDetector],
    };

    setUser(updatedUser);
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
      </form>
    </Box>
  );
}

const detectorTypes = ["water", "electricity", "gas"];
