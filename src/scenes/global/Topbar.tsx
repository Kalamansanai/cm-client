import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Alert, Box, IconButton, Snackbar, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { Logout } from "../../apis/user_api";
import { GlobalContext } from "../../App";
import { ColorModeContext, tokens } from "../../theme";

const Topbar: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [logoutError, setLogoutError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { user, setUser, setIsLoggedOut } = useContext(GlobalContext);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleLogout = async () => {
    if (!user) {
      setErrorMessage("No user is currently logged in");
      return;
    }
    try {
      const response = await Logout();
      if (response === null) {
        throw new Error("Error during logout");
      }
      setUser(null);
      setIsLoggedOut(true);
      setOpen(true);
      //TODO: Delete the cookies
      // document.cookie = "cm-user-token=; expires=Sun, 06 Nov 1994 08:49:37 GMT; path=/; SameSite=None;";
    } catch (error: any) {
      setErrorMessage(error.message);
      setLogoutError(true);
      setOpen(true);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"right"} p={2}>
      <Box display={"flex"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {user && (
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={"bottom" + "left"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {logoutError ? errorMessage : "Logout successful"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Topbar;
