import { useTheme } from '@emotion/react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react';
import {VscSettings} from 'react-icons/vsc';
import {SwipeableDrawer} from '@mui/material';

function MessageHeaderComponent(props) {

    const theme = useTheme();

    //sidePanel menu and options for chat
    const chatMenuOptions = ['Close Chat', 'Delete Chat', 'Clear Message'];

    //drawer handler
    const toggleDrawer = (toggledVal)=>{
        return((event)=>{   //passing in this callback function to make sure that if user enter these keys nothing happens
            if (
                event &&
                event.type === 'keydown' &&
                (event.key === 'Tab' || event.key === 'Shift')
              ) {
                return;
              }

              return(props.setOpen(toggledVal));
        });
    }

    //using prop value to display the name and image
    // const {userImage, userName, open, setOpen} = props;

  return (
    <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', 
    background: theme.palette.background.variant1, margin: '10px', position: 'static', width:'100%'}}>

            <IconButton sx = {{color: theme.palette.primary.messageBlue2, }} onClick={toggleDrawer(true)}><Avatar alt='Remy Sharp' src='awda'/></IconButton>
            <IconButton sx = {{color: theme.palette.primary.messageBlue2, }} onClick={toggleDrawer(true)}><VscSettings/></IconButton>
            <SwipeableDrawer
                anchor="right"
                open={props.open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                '& .MuiDrawer-paper': {
                backgroundColor: theme.palette.background.variant1,
                width: '20%', overflow: 'hidden'},
                }}
            >
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <img src='https://e7.pngegg.com/pngimages/244/518/png-clipart-eye-icon-eye-service-people-thumbnail.png' alt='No img found' 
                    style={{borderRadius: '200px'}}
                />
                <Typography color={theme.palette.primary.light} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', flexGrow: 1, width: '100%'}}>
                    {/* {userName} */}
                    Saumitra Tiwari
                    </Typography>

                {chatMenuOptions.map((menuVal)=>{
                    return(<Typography key={menuVal} color={theme.palette.primary.messageBlue2} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', flexGrow: 1}}>
                    <Button variant='contained' sx={{width: '100%'}}>{menuVal}</Button></Typography>);
                })}
            </Box>

      </SwipeableDrawer>

    </Box>
  )
}

export default MessageHeaderComponent