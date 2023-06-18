import { IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material';
import {RiSendPlane2Fill} from 'react-icons/ri';

function MessageInputField(prop) {
    //receives a prop of setState function by reference

    const [inputMessage,setMessage] = useState('');

    //to handel the onchange event from the input field
    const inputValueHandler = (event)=>{
        setMessage(event.target.value);
        //set the value input message value as a target value
    }

    //to handel the press of sent button
    const sentValueHandler = ()=>{
        if(inputMessage!==''){
            prop.setText(inputMessage);
            setMessage('');
        }
    }

    const theme = useTheme();
  return (
    <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', 
    background: theme.palette.background.variant1, margin: '5px' }}>
    <TextField id="filled-basic" label="Type your message here" variant="filled" color= 'secondary'
        InputProps={{
            style: {
                color: theme.palette.primary.messageBlue2,
            }
        }}
        InputLabelProps={{
            style: {
                color: theme.palette.primary.messageBlue2
            }
        }}
        // focused
    value={inputMessage}
    onChange={inputValueHandler}
    sx = {{flexGrow: 1}}
    />
    <IconButton sx={{color: theme.palette.primary.messageBlue1, fontSize: '30px',}} onClick={sentValueHandler}><RiSendPlane2Fill/></IconButton>
    </Box>
  )
}

export default MessageInputField