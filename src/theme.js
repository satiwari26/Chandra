import { createTheme } from "@mui/material";
//createMUITheme is deprecated

const theme = createTheme({
    palette: {
        background: {
            default: '#333333',
            variant1: '#555555',
            variant2: '#777777',
            variant3: '#999999'
        }, 
        primary: {
            main: '#FFFFFF',
            light: '#F5F5F5',
            dark: '#CCCCCC',
            contrastText: '#000000'
          },                                
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