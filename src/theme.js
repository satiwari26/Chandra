import { createTheme } from "@mui/material";
//createMUITheme is deprecated

const theme = createTheme({
    palette: {
        background: {
            default: '#121200',
            variant1: '#12121',
            variant2: '#777777',
            variant3: '#999999'
        }, 
        primary: {
            main: '#00FFFF',
            light: '#7FFFD4',   //for special showcases
            dark: '#454B1B',
            messageBlue1: '#CCFFFF',
            messageBlue2: '#44a6c6'
          },   
          secondary: {
            main: '#CCFFFF' //message bue 1 color
          }                             
    },
    typography: {
        heading: {
          fontFamily: 'Cinzel, serif',
          fontStyle: 'normal',
          fontWeight: 900,
          fontSize: `24px`
        },
        messages: {
          fontFamily: 'Dancing Script, cursive',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: `20px`
        },
        users: {
            fontFamily: 'Heebo, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: `20px`
        },
        body: {
          fontFamily: 'Poppins, sans-serif',
          fontStyle: 'normal',
          fontWeight: 600,
        },
    }
});

export default theme;