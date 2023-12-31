import React, { useEffect, useState } from 'react';
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent';
import MessageInputField from '../components/messageComponents/MessageInputField';
import { Box } from '@mui/material';
import axios from 'axios';
import MessageGrouping from '../components/messageComponents/MessageGrouping';
import { useTheme } from '@emotion/react';



function ChatPage() {
    const theme = useTheme();

    //message header component
    const [userName,setUserName] = useState('');
    const [userImage,setUserImage] = useState('');
    // const [open, setOpen] = useState(false);
    let messageHeaderProp = {userName,userImage};

    //message input field
    const [textMessage,setTextMessage] = useState('');      
    //messges from data base are retrived in this manner,
    //might have to modify the logic later
    // {
    //     id: 'messageId1',
    //     sender: 'user1',
    //     recipient: 'user2',
    //     timestamp: '2023-05-21T12:34:56',
    //     content: 'Hello, how are you?',
    //   }
      
    
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
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', width: '100%'}}>

    <Box sx={{position: 'fixed', top: 0,}}><MessageHeaderComponent {...messageHeaderProp}/></Box>

    <Box sx={{paddingTop: '5%', paddingBottom: '5%',
        [theme.breakpoints.up('md')]:{paddingTop: '10%', paddingBottom: '10%'}, [theme.breakpoints.up('sm')]:{paddingTop: '10%', paddingBottom: '10%'},
        [theme.breakpoints.up('xs')]:{paddingTop: '20%', paddingBottom: '20%'},}}>
        <MessageGrouping messageProp = {{textMessage,messageState}} style= {{flexGrow: 1, }}/>
    </Box>

    <Box sx={{position: 'fixed', bottom: 0,}}><MessageInputField setText = {setTextMessage}/></Box>

    </Box>
  )
}

export default ChatPage