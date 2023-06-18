import React from 'react'

import { Box } from '@mui/material';
import UserIndividualMessageSend from './UserIndividualMessageSend';
import UserindividualMessageReceived from './UserindividualMessageReceived';

function MessageGrouping(props) {
  return (
    <Box sx = {{display: 'flex', flexDirection: 'column-reverse'}}>
        <UserindividualMessageReceived message = {props.textMessage}/>

    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
    <UserIndividualMessageSend {...props}/>
    </Box>
    </Box>
  )
}

export default MessageGrouping