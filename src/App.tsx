import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";

import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";

import { login_cookie } from "./apis/user_api";
import { User } from "./types";

export const GlobalContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
  setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  user: null,
  setUser: () => {},
  setIsLoggedOut: () => {},
});

function App(): JSX.Element {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarIsCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    if (!user && !isLoggedOut) {
      login_cookie()
        .then((res) => {
          if (res) setUser(res);
          else setIsLoggedOut(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, isLoggedOut]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{
            user,
            setUser,
            setIsLoggedOut,
          }}
        >
          <CssBaseline />
          <div className="app" style={{ display: "flex", height: "100vh", position: "relative" }}>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main
              className="content"
              style={{
                flex: 1,
                overflowY: "auto",
                marginLeft: 80,
              }}
            >
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
