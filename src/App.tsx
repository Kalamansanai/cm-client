import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar";

function App(): JSX.Element {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <main className="content" style={{ flex: 1, overflowY: "auto" }}>
            <Topbar />
            <Routes>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/team" element={<Team />} /> */}
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              {/* <Route path="/contacts" element={<Contacts />} /> */}
              <Route path="/bar" element={<Bar />} />
              {/* <Route path="/form" element={<Form />} /> */}
              {/* <Route path="/line" element={<Line />} /> */}
              <Route path="/pie" element={<Pie />} />
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> */}
              {/* <Route path="/calendar" element={<Calendar />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
