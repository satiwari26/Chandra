import { CssBaseline, ThemeProvider } from "@mui/material";  //for controlling the custom theme
import React from "react";
import theme from "./theme";
import ChatPage from "./pages/ChatPage";
function App() {
    return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ChatPage/>
      </ThemeProvider>
    </div>
  );
}

export default App;
