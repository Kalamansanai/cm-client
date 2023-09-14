import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Alert,
  Badge,
  Box,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDetectorConfig } from "../../apis/detector_api";
import { GetLocation } from "../../apis/location_api";
import { Logout } from "../../apis/user_api";
import { GlobalContext } from "../../App";
import { useSnackbar } from "../../components/SnackbarContext";
import { ColorModeContext } from "../../theme";
import { ILocation } from "../../types";

const Topbar: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const locations = useLocation();
  const [logoutError, setLogoutError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { user, setUser, setIsLoggedOut } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [showBadge, setShowBadge] = useState(false);
  const checkActive = useRef(true);
  const { isDetectorConfigChanged, setDetectorConfigChanged } =
    useContext(GlobalContext);

  const checkDetectorsConfig = async () => {
    if (!checkActive || !user) return;

    let isError = false;

    try {
      const response: ILocation = await GetLocation();
      const detectorPromises = response.detectors.map((detector) =>
        GetDetectorConfig(detector.detector_id),
      );

      const detectorResponses = await Promise.all(detectorPromises);

      for (const detectorResponse of detectorResponses) {
        if (
          detectorResponse.charNum === undefined ||
          detectorResponse.comaPosition === undefined ||
          detectorResponse.charNum === "" ||
          detectorResponse.comaPosition === ""
        ) {
          isError = true;
          handleSnackbar();
          break;
        }
      }
    } catch (error) {
      isError = true;
      console.error("An error occurred while checking detector config:", error);
      showSnackbar(
        "An error occurred while checking detector config.",
        "error",
      );
    }
    setShowBadge(isError);
  };

  useEffect(() => {
    handleSnackbar();
  }, [showBadge]);

  useEffect(() => {
    if (isDetectorConfigChanged) {
      checkDetectorsConfig();
      setDetectorConfigChanged(false);
    }
  }, [isDetectorConfigChanged]);

  useEffect(() => {
    checkDetectorsConfig();
  }, []);

  const handleBack = () => {
    navigate("/detectors");
  };

  const handleSnackbar = () => {
    console.log(" I was here to.", showBadge);
    if (showBadge) {
      showSnackbar("Please set config values for your detector(s)", "error");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
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
    } catch (error: any) {
      setErrorMessage(error.message);
      setLogoutError(true);
      setOpen(true);
    }
  };

  const severity = logoutError ? "error" : "success";
  const message = logoutError ? errorMessage : "Logout successful";

  return (
    <Box
      display={"flex"}
      justifyContent={
        locations.pathname.startsWith("/detector_dashboard/")
          ? "space-between"
          : "right"
      }
      p={2}
    >
      {locations.pathname.startsWith("/detector_dashboard/") && (
        <IconButton onClick={handleBack}>
          <ArrowBackRoundedIcon />
        </IconButton>
      )}
      <Box display={"flex"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {user && (
          <IconButton onClick={handleSnackbar}>
            <Badge badgeContent={showBadge ? "1" : null} color="error">
              <SettingsOutlinedIcon />
            </Badge>
          </IconButton>
        )}
        {user && (
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        key={"bottom" + "right"}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Topbar;
