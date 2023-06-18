import { CssBaseline, ThemeProvider } from "@mui/material";  //for controlling the custom theme
import React, { useState } from "react";
import theme from "./theme";
import MessageHeaderComponent from "./components/messageComponents/MessageHeaderComponent";

function App() {
  const [open,setOpen] = useState(false);
  let tempProp = {open,setOpen};
    return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MessageHeaderComponent {...tempProp}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
