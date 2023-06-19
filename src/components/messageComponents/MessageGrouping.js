import React from 'react'

import { Box } from '@mui/material';
import UserIndividualMessageSend from './UserIndividualMessageSend';
import UserindividualMessageReceived from './UserindividualMessageReceived';

function MessageGrouping(props) {

    let sentMessageProp = {
        textMessage: props.messageProp.textMessage,
        messageState: props.messageProp.messageState,
      };
      
    console.log(props.messageProp);
  return (
    <Box sx = {{display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto',}}>
        <UserindividualMessageReceived message = {props.messageProp.textMessage}/>
        <UserIndividualMessageSend {...sentMessageProp}/>
    </Box>
  )
}

export default MessageGrouping