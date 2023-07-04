import { useTheme } from '@emotion/react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react';
import {VscSettings} from 'react-icons/vsc';
import {SwipeableDrawer} from '@mui/material';
import chandra from '../../assets/chandra_static.jpg';

function MessageHeaderComponent({ ReceiverUserImage, ReceiverUserName, userImage, userName, isMessageHeader, userList,setReceiverUserName,setConversationList }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    //accessing the props accordingly
    let displayedUserImage = userImage;
    let displayedUserName = userName;

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

              return(setOpen(toggledVal));
        });
    }

    //using prop value to display the name and image
    if(ReceiverUserImage && ReceiverUserName) {
      displayedUserImage = ReceiverUserImage;
      displayedUserName = ReceiverUserName;
    }

    const selectedUser = (name) => {
      setReceiverUserName(name);
      setConversationList((prevConversationList) => [ ...prevConversationList,{name: name, avatar: chandra, id: 0}]);
    }

  return (
    <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', 
    background: theme.palette.background.variant1, width:'100%', overflow: 'hidden'}}>

            <IconButton sx = {{color: theme.palette.primary.messageBlue2, }} onClick={toggleDrawer(true)}><Avatar alt={displayedUserName} src={displayedUserImage}/></IconButton>
            <Typography color={theme.palette.primary.light} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', width: '100%'}}>
                    {displayedUserName}
            </Typography>
            <IconButton sx = {{color: theme.palette.primary.messageBlue2, flexGrow: 1}} onClick={toggleDrawer(true)}><VscSettings/></IconButton>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                '& .MuiDrawer-paper': {
                backgroundColor: theme.palette.background.variant1,
                width: '20%', overflow: 'hidden'},
                }}
            >
            <Box sx={{display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden'}}>
                <img src={displayedUserImage} alt='something went wrong' 
                    style={{borderRadius: '200px'}}
                />
                <Typography color={theme.palette.primary.light} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', flexGrow: 1, width: '100%'}}>
                    {displayedUserName}
                    </Typography>

                    {/* display these toggle buttons if it is a messageHeader */}
                {isMessageHeader? <>
                {chatMenuOptions.map((menuVal)=>{
                    return(<Typography key={menuVal} color={theme.palette.primary.messageBlue2} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', flexGrow: 1}}>
                    <Button variant='contained' sx={{width: '100%'}}>{menuVal}</Button></Typography>);
                })}
                </>:
                <>
                {userList.map((individualUser,index)=>{
                    return(<Typography key={index} color={theme.palette.primary.messageBlue2} sx = {{justifyContent: 'flex-start',
                    fontSize: '17px', m: '10px', flexGrow: 1}}>
                    <Button variant='contained' sx={{width: '100%'}} onClick={()=> selectedUser(individualUser.name)}>{individualUser.name}</Button></Typography>);
                })}
                </>
                }
                  
            </Box>

      </SwipeableDrawer>

    </Box>
  )
}

export default MessageHeaderComponent