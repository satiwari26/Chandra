import { CssBaseline, ThemeProvider } from "@mui/material";  //for controlling the custom theme
import React from "react";
import theme from "./theme";



function App() {
  return (
    <div className="App">
      Hello world!
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      </ThemeProvider>
    </div>
  );
}

export default App;
