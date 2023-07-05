import React from 'react'
import { Box, Typography } from '@mui/material';
import chandra from '../../assets/chandra_static.jpg'
import { useTheme } from '@emotion/react';

function DefaultPageBlank() {
    const theme = useTheme();
  return (
    <Box sx={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center',m:'5%'}}>
       <Typography variant="heading" color={theme.palette.primary.messageBlue1}>
            <img src={chandra} alt="Chandra" style={{height: '70%', width: '100%', borderRadius: '40%'}}/>
        </Typography>
        <Typography variant="heading" color={theme.palette.primary.messageBlue1} sx={{[theme.breakpoints.up('md')]:{fontSize:'70px'},
        [theme.breakpoints.up('sm')]:{fontSize:'60px'}, [theme.breakpoints.up('xs')]:{fontSize:'50px'}}}>Chandra</Typography>
        
        <Typography variant="messages" color={theme.palette.primary.messageBlue1} sx={{[theme.breakpoints.up('md')]:{fontSize:'70px'},
        [theme.breakpoints.up('sm')]:{fontSize:'60px'}, [theme.breakpoints.up('xs')]:{fontSize:'50px'}}}>
        Canvas Linked messaging</Typography>

    </Box>
  )
}

export default DefaultPageBlank