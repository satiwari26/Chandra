import { CssBaseline, ThemeProvider } from "@mui/material";  //for controlling the custom theme
import React from "react";
import theme from "./theme";
import MessageInputField from "./components/messageComponents/MessageInputField";

function App() {

    return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MessageInputField/>
      </ThemeProvider>
    </div>
  );
}

export default App;
