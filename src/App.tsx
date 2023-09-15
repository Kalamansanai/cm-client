import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ApiResponse } from "./apis/api.util";
import { login_cookie } from "./apis/user_api";
import { SnackbarProvider } from "./components/SnackbarContext";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { User } from "./types";

export const GlobalContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
  setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
  setDetectorConfigChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isDetectorConfigChanged: boolean;
}>({
  user: null,
  setUser: () => {},
  setIsLoggedOut: () => {},
  setDetectorConfigChanged: () => {},
  isDetectorConfigChanged: false,
});

function App(): JSX.Element {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarIsCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isDetectorConfigChanged, setDetectorConfigChanged] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsCollapsed(true);
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res: ApiResponse = await login_cookie();
        const user: User = res.Unwrap(setUser);
        if (user) setUser(user);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <GlobalContext.Provider
            value={{
              user,
              setUser,
              setIsLoggedOut,
              setDetectorConfigChanged,
              isDetectorConfigChanged,
            }}
          >
            <CssBaseline />
            <div
              className="app"
              style={{ display: "flex", height: "100vh", position: "relative" }}
            >
              <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
              <main
                className="content"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  marginLeft: 80,
                }}
              >
                <Topbar />
                <div style={{ margin: "16px" }}>
                  <Outlet />
                </div>
              </main>
            </div>
          </GlobalContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
