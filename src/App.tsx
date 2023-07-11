import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/Dashboard";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";

import Login, { login_cookie } from "./scenes/login/Login";
import Register from "./scenes/registration/Register";
import { User } from "./types";
import DetectorList from "./scenes/detectors/DetectorList";
import DetectorDashboard, {
  loader as detectorDashboardLoader,
} from "./scenes/detectors/DetectorDashboard";

export const GlobalContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

function App(): JSX.Element {
  const [theme, colorMode] = useMode();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      login_cookie()
        .then((res) => {
          if (res) setUser(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <CssBaseline />
          <div className="app" style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <main className="content" style={{ flex: 1, overflowY: "auto" }}>
              <Topbar />
              <Outlet />
            </main>
          </div>
        </GlobalContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
