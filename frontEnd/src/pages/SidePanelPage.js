import React, { useEffect, useState } from 'react'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent';
import { Box, IconButton, Typography, } from '@mui/material';
import userImageTest from '../assets/IMG_7265.jpg'
import IndividualUserComponent from '../components/sidePanelComponents/IndividualUserComponent';
import { useTheme } from '@emotion/react';
import {GiHamburgerMenu} from 'react-icons/gi';

export const SidePanelPage = ({userList,personalInfo}) => {
    const theme = useTheme();

    //to keep track of the device width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [shrink,setShrink] = useState(true);

        //messageHeader component
        const [userImage, setUserImage] = useState('');
        const [userName, setUserName] = useState('');
        const [isMessageHeader, setIsMessageHeader] = useState(false);
    
        const messageHeaderProp = {userImage, userName,isMessageHeader};

    useEffect(()=>{
        const handleWidthSize = ()=>{
            setWindowWidth(window.innerWidth);  //handler function sets the new width based on the widow size
        }

        window.addEventListener('resize',handleWidthSize);

        return(()=>{    //calls this call back function to remove the EventListner when component unmounts
            window.removeEventListener('resize', handleWidthSize);
        });
    },[]);

    //userList will contain the number of users a person is chatting with,
    //all of thise users name, their profile pic, messages etc
    
    //personaInfo contains the information about your personal information
    const userNameTest = 'Saumitra Tiwari';
    const userIndividual = {userImageTest, userNameTest};

  return (
    <>
    {windowWidth > 1100?
    <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '25%', background: theme.palette.background.variant1, height: '100vh'}}>
        <Box sx={{padding: '5%',border: `2px solid ${theme.palette.background.variant2}`}}>
        <MessageHeaderComponent {...messageHeaderProp}/>
        </Box>

        <Box sx={{overflowY: 'default', overflowX: 'hidden'}}>
        {/* top level box to store all the conversations */}


        <Box sx={{cursor: 'pointer' , userSelect: 'none'}} onClick = {()=>{console.log('clicked here')}}>
        {/* when clicking on this user it should be able to show the conversation between you and other user */}
        {/* most of this has to be done with the db and backend, we'll come back to it later */}
        <IndividualUserComponent {...userIndividual} />
        </Box>

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
            <MessageHeaderComponent/>
            </Box>

            <Box sx={{overflowY: 'default', overflowX: 'hidden'}}>
            {/* top level box to store all the conversations */}


            <Box sx={{cursor: 'pointer' , userSelect: 'none'}} onClick = {()=>{console.log('clicked here')}}>
            {/* when clicking on this user it should be able to show the conversation between you and other user */}
            {/* most of this has to be done with the db and backend, we'll come back to it later */}
            <IndividualUserComponent {...userIndividual} />
            </Box>

            </Box>

        </Box> }
    </>}
    </>
  )
}
