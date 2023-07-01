import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SidePanelPage } from './SidePanelPage'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent'
import MessageGrouping from '../components/messageComponents/MessageGrouping'
import MessageInputField from '../components/messageComponents/MessageInputField'
//to create a connection of socketIO from the backend
import io from 'socket.io-client';

//creating connection to the socket server
const socket = io.connect("http://localhost:3001");


export const MainPageCombined = () => {
    const [textMessage,setTextMessage] = useState('');
    const [userEmail,setUserEmail] = useState(''); //to uniquely identify each user
    const [userName,setUserName] = useState('');  //senders info

    // const [receivedTextMessage,setReceivedTextMessage] = useState('');
    const [messageState, setMessageState] = useState(false);

    //messageHeader &receiver info
    const [ReceiverUserImage, setReceiverUserImage] = useState('');
    const [ReceiverUserName, setReceiverUserName] = useState('');
    const [isMessageHeader, setIsMessageHeader] = useState(true);
    

    const messageHeaderProp = {ReceiverUserImage, ReceiverUserName,isMessageHeader};

    useEffect(()=>{
      socket.on('chatMessage',(data)=>{//adding socket event listner to listen to the receiving chatMessages
        // setTextMessage(data);
        // console.log(data);
      });
      
      if(userName !=='' && ReceiverUserName !=='' && userEmail !==''){
        socket.emit('sendChatMessage',{sender: userName, receiver: ReceiverUserName, content: {message: textMessage, senderEmail: userEmail}}); //we are emitting the message to the server from the client
      }

    },[textMessage]);


    //temp changes
    const [tempVal,setTempVal] = useState('');
    const [tempValsender,setTempValsender] = useState('');
    const [tempValreceiver,setTempValreceiver] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      setUserEmail(tempVal);
      setUserName(tempValsender);
      setReceiverUserName(tempValreceiver);
      
    };
  
    const handleChange1 = (e) => {
        setTempVal(e.target.value);
    };
    const handleChange2 = (e) => {
      setTempValsender(e.target.value);
    };
    const handleChange3 = (e) => {
      setTempValreceiver(e.target.value);
    };



  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <SidePanelPage style={{height: '100vh'}}/>
        <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>

            <>
            {userEmail ===''?
            <form onSubmit={handleSubmit}>
              <label>
               Email:
              <input type="email" value={tempVal} onChange={handleChange1} />
              </label>

              <label>
               Sender name:
              <input type="sender's name" value={tempValsender} onChange={handleChange2} />
              </label>

              <label>
               Receiver name:
              <input type="receiver's name" value={tempValreceiver} onChange={handleChange3} />
              </label>
              
              <button type="submit">Submit</button>
              </form>: null}
            </>

            <Box sx={{height: '10%', minWidth: '100%'}}>
            <MessageHeaderComponent {...messageHeaderProp}/>
            </Box>
            <Box sx={{flexGrow: 1, overflowY: 'auto', height:'60vh'}}>
            <MessageGrouping messageProp = {{userName,ReceiverUserName,userEmail}}/>
            </Box>

            <Box>
                <MessageInputField setText = {setTextMessage}/>
            </Box>
        </Box>

    </Box>
  )
}
