import React, { useEffect, useState } from 'react';
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent';
import MessageInputField from '../components/messageComponents/MessageInputField';
import { Box } from '@mui/material';
import axios from 'axios';
import MessageGrouping from '../components/messageComponents/MessageGrouping';



function ChatPage() {

    //message header component
    const [userName,setUserName] = useState('');
    const [userImage,setUserImage] = useState('');
    const [open, setOpen] = useState(false);
    let messageHeaderProp = {userName,userImage,open,setOpen};

    //message input field
    const [textMessage,setTextMessage] = useState('');

    //userIndividual Message send
    const [messageState, setMessageState] = useState(false);
    // let messageSendProp = {messageState,textMessage};

    //grouping message prop
      //textMessage is temp prop send for received component for testing 

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users/1')
        .then((response)=>{
            setUserName(response.data.name);
            console.log(response.data.name);
        })
        .catch((error)=>{
            console.log(error);
        })

        axios.get('https://jsonplaceholder.typicode.com/photos/1')
        .then((response)=>{
            setUserImage(response.data.url);
            console.log(response.data.url);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[userName,userImage]);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh'}}>

    <Box sx={{position: 'static', overflow: 'hidden'}}><MessageHeaderComponent {...messageHeaderProp}/></Box>

    {/* <MessageGrouping {...textMessage,messageState}/> */}

    <Box sx={{position: 'static', overflow: 'hidden'}}><MessageInputField setText = {setTextMessage}/></Box>

    </Box>
  )
}

export default ChatPage