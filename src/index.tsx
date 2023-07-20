import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import App from "./App";
import Bar from "./scenes/bar";
import Dashboard from "./scenes/dashboard/Dashboard";
import DetectorDashboard, {
  loader as detectorDashboardLoader,
} from "./scenes/detectors/DetectorDashboard";
import DetectorList from "./scenes/detectors/DetectorList";
import Line from "./scenes/line";
import Login from "./scenes/login/Login";
import Pie from "./scenes/pie";
import Register from "./scenes/registration/Register";

export class DetailedError extends Error {
  override name: "DetailedError" = "DetailedError";

  constructor(
    public innerError: ResponseError | null,
    public help?: React.ReactNode,
  ) {
    super();
  }
}

export class ResponseError extends Error {
  override name: "ResponseError" = "ResponseError";
  constructor(
    public response: Response,
    msg?: string,
  ) {
    super(msg);
  }
}

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let content = null;
  let details = null;

  if (error instanceof DetailedError) {
    content = error.help;
    if (error.innerError) {
      const response = error.innerError.response;
      details = (
        <Typography
          textAlign="inherit"
          fontSize="1em"
          sx={{
            position: "absolute",
            bottom: 0,
            mb: 4,
            fontFamily: "monospace",
            color: "rgba(0, 0, 0, 0.2)",
          }}
        >
          {response.status} {response.statusText}
        </Typography>
      );
    }
  } else {
    content = (
      <Typography fontSize="1em"> An unknown error has occurred.</Typography>
    );
  }

  return (
    <Box
      id="x"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      fontSize="1.8em"
      height="100%"
    >
      <Box fontSize="8em" sx={{ lineHeight: 0, color: "rgba(0, 0, 0, 0.3)" }}>
        <ErrorIcon fontSize="inherit" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ textAlign: "center" }}
      >
        {content}
      </Box>
      {details}
    </Box>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route element={<App />} errorElement={<ErrorPage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bar" element={<Bar />} />
        <Route path="login" element={<Login />} />
        <Route path="line" element={<Line />} />
        <Route path="pie" element={<Pie />} />
        <Route path="detectors" element={<DetectorList />} />
        <Route path="registration" element={<Register />} />
        <Route
          loader={detectorDashboardLoader}
          path="detector_dashboard/:detector_id"
          element={<DetectorDashboard />}
        />
      </Route>
    </>,
  ),
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
