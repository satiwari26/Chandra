import { CssBaseline, ThemeProvider } from "@mui/material";  //for controlling the custom theme
import React from "react";
import theme from "./theme";
import { SidePanelPage } from "./pages/SidePanelPage";
import { MainPageCombined } from "./pages/MainPageCombined";

function App() {
    return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MainPageCombined/>
      </ThemeProvider>
    </div>
  );
}

export default App;
