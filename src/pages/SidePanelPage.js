import React from 'react'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent';
import { Box, } from '@mui/material';
import userImage from '../assets/IMG_7265.jpg'
import IndividualUserComponent from '../components/sidePanelComponents/IndividualUserComponent';
import { useTheme } from '@emotion/react';

export const SidePanelPage = ({userList,personalInfo}) => {
    const theme = useTheme();
    //userList will contain the number of users a person is chatting with,
    //all of thise users name, their profile pic, messages etc
    
    //personaInfo contains the information about your personal information
    const userName = 'Saumitra Tiwari';
    const userIndividual = {userImage, userName};

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '25%', background: theme.palette.background.variant1, height: '100vh'}}>
        
        <Box sx={{padding: '5%',border: `2px solid ${theme.palette.background.variant2}`}}>
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

    </Box>
  )
}
