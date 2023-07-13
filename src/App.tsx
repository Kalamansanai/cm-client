import { CssBaseline, ThemeProvider } from "@mui/material";
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
          if (res) setUser(res);
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
