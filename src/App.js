import { CssBaseline, ThemeProvider } from "@mui/material";  //for controlling the custom theme
import React from "react";
import theme from "./theme";


function App() {
  const testMes = `Hello my name is something. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
