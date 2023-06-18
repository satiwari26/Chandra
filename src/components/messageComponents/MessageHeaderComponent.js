import { useTheme } from '@emotion/react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react';
import {VscSettings} from 'react-icons/vsc';
import {SwipeableDrawer} from '@mui/material';
import {BiUser} from 'react-icons/bi';

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
    const {userImage, userName, open, setOpen} = props;

  return (
    <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', 
    background: theme.palette.background.variant1, margin: '10px', width:'100%', overflow: 'hidden'}}>

            <IconButton sx = {{color: theme.palette.primary.messageBlue2, }} onClick={toggleDrawer(true)}><Avatar alt={userName} src={userImage}/></IconButton>
            <Typography color={theme.palette.primary.light} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', width: '100%'}}>
                    {userName}
            </Typography>
            <IconButton sx = {{color: theme.palette.primary.messageBlue2, flexGrow: 1}} onClick={toggleDrawer(true)}><VscSettings/></IconButton>
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
                <img src={userImage} alt='something went wrong' 
                    style={{borderRadius: '200px'}}
                />
                <Typography color={theme.palette.primary.light} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', flexGrow: 1, width: '100%'}}>
                    {userName}
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