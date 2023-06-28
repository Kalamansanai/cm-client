import React, { useContext, useState } from "react";
import { Alert, Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Topbar: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [logoutError, setLogoutError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/logout");
      // Perform any additional logic after successful logout
      console.log(response.data);
      if (response.data && response.data.result === "error") {
        throw new Error(response.data.data);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLogoutError(true);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"right"} p={2}>
      <Box display={"flex"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
      {logoutError && (
        <Box position="fixed" bottom={16} right={16}>
          <Alert severity="error" onClose={() => setLogoutError(false)}>
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Topbar;
