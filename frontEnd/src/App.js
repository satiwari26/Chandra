import { CssBaseline, ThemeProvider } from "@mui/material";  //for controlling the custom theme
import React, {useEffect, useState} from "react";
import theme from "./theme";
import { MainPageCombined } from "./pages/MainPageCombined";
import SignInPage from "./pages/SignInPage";

function App() {
    //for checking if the page is singIn page or not
    const [isSignInPage,setIsSignInPage] = useState(true);

    //for storing the value of the input fields
    const [signUserName,setSignUserName] = useState('');
    const [SignUserEmail,setSignUserEmail] = useState('');
    const [SignUserToken,setSignUserToken] = useState('');
    
    //sign in page props
    const signInPageProps = {setIsSignInPage,setSignUserName,setSignUserEmail,setSignUserToken};
    return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      {isSignInPage?
      <SignInPage {...signInPageProps}/>:<MainPageCombined {...{signUserName,SignUserEmail,SignUserToken}}/>
      }
      </ThemeProvider>
    </div>
  );
}

export default App;
