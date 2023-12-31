import React, { useEffect, useState } from 'react'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent';
import { Box, IconButton, Typography, } from '@mui/material';
import IndividualUserComponent from '../components/sidePanelComponents/IndividualUserComponent';
import { useTheme } from '@emotion/react';
import {GiHamburgerMenu} from 'react-icons/gi';
import {motion} from 'framer-motion';

export const SidePanelPage = ({setConversationList,coversationList,userImage,userName,setIsGroupMessage,setGroupName,
    setGroupID,setReceiverUserImage,setReceiverUserName,userList,setIsDefaultPage}) => {
    const theme = useTheme();

    //to keep track of the device width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [shrink,setShrink] = useState(true);

        //messageHeader component used as sideHeader component
        const isMessageHeader = false;
    
        const messageHeaderProp = {userImage, userName,isMessageHeader,userList,setReceiverUserName,setConversationList,setIsDefaultPage};

    useEffect(()=>{
        const handleWidthSize = ()=>{
            setWindowWidth(window.innerWidth);  //handler function sets the new width based on the widow size
        }

        window.addEventListener('resize',handleWidthSize);

        return(()=>{    //calls this call back function to remove the EventListner when component unmounts
            window.removeEventListener('resize', handleWidthSize);
        });
    },[]);

    const sidePanelHover = {
        normal: {
          scale: 1,
          backgroundColor: 'transparent',
        },
        hover: {
          scale: 1.05,
          boxShadow: `0px 8px 4px ${theme.palette.primary.messageBlue1}`
        },
    }

    const conversationClick = (value)=>{
        console.log(value.id);
        if(value.id !==0){
            console.log('are we here?');
            setIsGroupMessage(true);
            setGroupID(value.id);
            setGroupName(value.name);
            setReceiverUserName(value.name);    //the header name will change accordingly
            setReceiverUserImage(value.avatar);
            setIsDefaultPage(false);    //remove turn off the default page viewing
        }
        else{
            console.log('are we here2?');
            setIsGroupMessage(false);
            setReceiverUserName(value.name);
            setReceiverUserImage(value.avatar);
            setIsDefaultPage(false);    //remove turn off the default page viewing
        }
    }

  return (
    <>
    {windowWidth > 1100?
    <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '25%', background: theme.palette.background.variant1, height: '100vh'}}>
        <Box sx={{padding: '5%',border: `2px solid ${theme.palette.background.variant2}`}}>
        <MessageHeaderComponent {...messageHeaderProp}/>
        </Box>

        <Box sx={{overflowY: 'default', overflowX: 'hidden'}}>
        {/* top level box to store all the conversations */}

        {coversationList.map((value)=>{return(
            <Box sx={{cursor: 'pointer' , userSelect: 'none', mt: '4px'}} onClick = {()=> conversationClick(value)} key={value.name}>
            {/* when clicking on this user it should be able to show the conversation between you and other user */}
            {/* most of this has to be done with the db and backend, we'll come back to it later */}
            <motion.div variants={sidePanelHover} whileHover="hover" initial="normal"><IndividualUserComponent {...value} /></motion.div>
            </Box>)}
        )}

        </Box>

    </Box>:

    <>
    {shrink?
        <Box sx={{display: 'flex', flexDirection: 'column', minWidth: 
        '10%', background: theme.palette.background.variant1, height: '100vh'}}>
        <IconButton onClick={()=>{setShrink(false)}}><Typography color={theme.palette.primary.messageBlue1} fontSize='20px'><GiHamburgerMenu/></Typography></IconButton>
        </Box>:

        <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '50%', background: theme.palette.background.variant1, height: '100vh'}}>
            <IconButton onClick={()=>{setShrink(true)}}><Typography color={theme.palette.primary.messageBlue1} fontSize='20px'><GiHamburgerMenu/></Typography></IconButton>
            <Box sx={{padding: '5%',border: `2px solid ${theme.palette.background.variant2}`, display: 'flex', flexDirection: 'column'}}>
            <MessageHeaderComponent {...messageHeaderProp}/>
            </Box>

            <Box sx={{overflowY: 'default', overflowX: 'hidden'}}>
            {/* top level box to store all the conversations */}

            {coversationList.map((value)=>{return(
            <Box sx={{cursor: 'pointer' , userSelect: 'none'}} onClick = {()=> conversationClick(value)} key={value.name}>
            {/* when clicking on this user it should be able to show the conversation between you and other user */}
            {/* most of this has to be done with the db and backend, we'll come back to it later */}
            <IndividualUserComponent {...value} />
            </Box>)}
            )}

            </Box>

        </Box> }
    </>}
    </>
  )
}
