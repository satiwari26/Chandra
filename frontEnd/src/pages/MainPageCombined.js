import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SidePanelPage } from './SidePanelPage'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent'
import MessageGrouping from '../components/messageComponents/MessageGrouping'
import MessageInputField from '../components/messageComponents/MessageInputField'
import GroupMessageGrouping from '../components/messageComponents/GroupMessageGrouping'
//to create a connection of socketIO from the backend
import io from 'socket.io-client';

//creating connection to the socket server
const socket = io.connect("http://localhost:3001");


export const MainPageCombined = () => {
    const [textMessage,setTextMessage] = useState('');
    const [userEmail,setUserEmail] = useState(''); //to uniquely identify each user
    const [userName,setUserName] = useState('');  //senders info

    //to specify if the message that we are sending is a group message or not
    const [isGroupMessage,setIsGroupMessage] = useState('false');
    const [groupName,setGroupName] = useState('');
    const [groupMembers,setGroupMembers] = useState(['saumitra','dhruv','shrey']);

    // const [receivedTextMessage,setReceivedTextMessage] = useState('');
    // const [messageState, setMessageState] = useState(false);

    //messageHeader &receiver info
    const [ReceiverUserImage, setReceiverUserImage] = useState('');
    const [ReceiverUserName, setReceiverUserName] = useState('');
    const [isMessageHeader, setIsMessageHeader] = useState(true);
    

    const messageHeaderProp = {ReceiverUserImage, ReceiverUserName,isMessageHeader};

    //individual message sideEffects
    useEffect(()=>{
      // socket.on('chatMessage',(data)=>{//adding socket event listner to listen to the receiving chatMessages
      //   // setTextMessage(data);
      //   // console.log(data);
      // });

      if (groupName !== '') {
        setIsGroupMessage(true);
      } else {
        setIsGroupMessage(false);
      }

      if(isGroupMessage===false){  //render this when not the group message
      if(userName !=='' && ReceiverUserName !=='' && userEmail !=='' && textMessage !==''){
        socket.emit('sendChatMessage',{sender: userName, receiver: ReceiverUserName, content: {message: textMessage, senderEmail: userEmail}}); //we are emitting the message to the server from the client
      }
    }

      if(isGroupMessage===true){ //render this conditionally when sending the group message
        if(groupName !== '' && textMessage !==''){
          socket.emit('sendGroupChatMessage',{groupName: groupName, members: groupMembers, content: {user: userName, message: textMessage, senderEmail: userEmail}}); //we are emitting the message to the server from the client
        }
      }

      return ()=>{socket.disconnect()}

    },[textMessage,ReceiverUserName,userEmail,userName,groupMembers,groupName,isGroupMessage]);


    //temp changes
    const [tempVal,setTempVal] = useState('');
    const [tempValsender,setTempValsender] = useState('');
    const [tempValreceiver,setTempValreceiver] = useState('');
    const [tempGroupName,setTempGroupName] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      setUserEmail(tempVal);
      setUserName(tempValsender);
      setReceiverUserName(tempValreceiver);
      setGroupName(tempGroupName);
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
    const handleChange4 = (e) => {
      setTempGroupName(e.target.value);
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

              <label>
               Group name:
              <input type="Group's name" value={tempGroupName} onChange={handleChange4} />
              </label>
              
              <button type="submit">Submit</button>
              </form>: null}
            </>

            <Box sx={{height: '10%', minWidth: '100%'}}>
            <MessageHeaderComponent {...messageHeaderProp}/>
            </Box>
            <Box sx={{flexGrow: 1, overflowY: 'auto', height:'60vh'}}>
              {isGroupMessage?<><GroupMessageGrouping messageProp = {{userName,groupName,userEmail}}/></>:
                <>
                <MessageGrouping messageProp = {{userName,ReceiverUserName,userEmail}}/>
                </>
              }
            </Box>

            <Box>
                <MessageInputField setText = {setTextMessage}/>
            </Box>
        </Box>

    </Box>
  )
}
