import { Box } from '@mui/material'
import React, { useState } from 'react'
import { SidePanelPage } from './SidePanelPage'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent'
import MessageGrouping from '../components/messageComponents/MessageGrouping'
import MessageInputField from '../components/messageComponents/MessageInputField'

export const MainPageCombined = () => {
    const [textMessage,setTextMessage] = useState('');
    const [messageState, setMessageState] = useState(false);

    //messageHeader component
    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');
    const [isMessageHeader, setIsMessageHeader] = useState(true);

    const messageHeaderProp = {userImage, userName,isMessageHeader};

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <SidePanelPage style={{height: '100vh'}}/>
        <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <Box sx={{height: '10%', minWidth: '100%'}}>
            <MessageHeaderComponent {...messageHeaderProp}/>
            </Box>
            <Box sx={{flexGrow: 1, overflowY: 'auto', height:'60vh'}}>
            <MessageGrouping messageProp = {{textMessage,messageState}}/>
            </Box>

            <Box>
                <MessageInputField setText = {setTextMessage}/>
            </Box>
        </Box>

    </Box>
  )
}
