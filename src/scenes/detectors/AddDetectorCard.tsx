import { useContext, useState } from "react";
import { GlobalContext } from "../../App";
import { AddDetector } from "../../apis/detector_api";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { GetUserData } from "../../apis/user_api";

interface FormData {
  name: string;
  type: string;
  id: string;
}

export function AddDetectorCard() {
  const { setUser } = useContext(GlobalContext);
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

    await AddDetector(formData);
    const userResponse = await GetUserData();
    setUser(userResponse);
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      width="50%"
      height="100%"
      sx={{ backgroundColor: "black", opacity: "60%", borderRadius: 5 }}
    >
      <Grid sx={{ borderRadius: 2, padding: 5 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            name="id"
            label="Id"
            value={formData.id}
            onChange={handleChange}
            fullWidth
            required
            sx={{ padding: 2 }}
          />
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ padding: 2 }}
          />
          <TextField
            name="type"
            label="Type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            required
            select
            sx={{ padding: 2 }}
          >
            {detectorTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "40%" }}
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

const detectorTypes = ["water", "electricity", "gas"];
