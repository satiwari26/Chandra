import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SidePanelPage } from './SidePanelPage'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent'
import MessageGrouping from '../components/messageComponents/MessageGrouping'
import MessageInputField from '../components/messageComponents/MessageInputField'
import GroupMessageGrouping from '../components/messageComponents/GroupMessageGrouping'
//to create a connection of socketIO from the backend
import io from 'socket.io-client';

import chandra from '../assets/chandra_static.jpg'  //temp

//creating connection to the socket server
const socket = io.connect("http://localhost:3001");

//OPEN AI api key, temporary putting it here for the use
const open_ai_API_KEY = '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';
const openAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const MainPageCombined = () => {
    const [textMessage,setTextMessage] = useState('');
    const [userID,setUserID] = useState(0); //to uniquely identify each user
    const [userName,setUserName] = useState('');  //senders info
    const [userImage,setUserImage] = useState('');

    //to specify if the message that we are sending is a group message or not
    const [isGroupMessage,setIsGroupMessage] = useState('false');
    const [groupName,setGroupName] = useState('');
    const [groupMembers,setGroupMembers] = useState(['saumitra','dhruv','shrey']);

    //extracting the prompt from the message, looking for the open-ai keyword
    const [containsKeyword,setContainsKeyword] = useState(false);
    // const [prompt,setPrompt] = useState('');  //to get the prompt value

    // const [receivedTextMessage,setReceivedTextMessage] = useState('');
    // const [messageState, setMessageState] = useState(false);

    //messageHeader &receiver info
    const [ReceiverUserImage, setReceiverUserImage] = useState('');
    const [ReceiverUserName, setReceiverUserName] = useState('');
    const [isMessageHeader, setIsMessageHeader] = useState(true);
    

    const messageHeaderProp = {ReceiverUserImage, ReceiverUserName,isMessageHeader};

  //access the usres info from the backend using canvas api
  // useEffect(()=>{
    
  // });



  // //to make the request from the open-ai
  //   useEffect(()=>{
  //       //extracting the prompt from the textMessage
  //       const keyword = '/open-ai';
  //       const tempmessage = textMessage.trim();
  //       let prompt = '';
      
  //       if (tempmessage.startsWith(keyword.toLowerCase())) {
  //       setContainsKeyword(true);
  //        prompt = tempmessage.slice(keyword.length).trim(); //set the prompt state value
  //       // Use the extracted prompt for further processing or API call
  //       console.log('Prompt:', prompt);
  //       } 
  //       else {
  //         setContainsKeyword(false);
  //       }

  //       const generate = async()=>{
  //         try{
  //           const response = await fetch(openAI_API_URL,{
  //             method: "POST",
  //             headers: {
  //               "Content-type": "application/json",
  //               Authorization: `Bearer ${open_ai_API_KEY}`
  //             },
  //             body: JSON.stringify({
  //               model: "gpt-3.5-turbo",
  //               messages: [{role: "user",content: prompt}]
  //             })
  //           });
  //           const data = await response.json()
  //           console.log(data);
  //         }
  //         catch(error){
  //           console.log("Error: ",error);
  //         }
  //       }

  //       if(containsKeyword){
  //       generate(); //calling my function to generate the response
  //     }

  //   },[textMessage,containsKeyword]);

    //individual message sideEffects
    useEffect(()=>{

      if (groupName !== '') { //check for the state if it's a group chat or individual chat
        setIsGroupMessage(true);
      } else {
        setIsGroupMessage(false);
      }
      console.log(isGroupMessage,containsKeyword);
      if(isGroupMessage===false && containsKeyword === false){  //render this when not the group message
      if(userName !=='' && ReceiverUserName !=='' && userID !==0 && textMessage !==''){
        socket.emit('sendChatMessage',{sender: userName, receiver: ReceiverUserName, content: {message: textMessage, senderID: userID, userImage: chandra}}); //we are emitting the message to the server from the client
      }
    }

      if(isGroupMessage===true && containsKeyword === false){ //render this conditionally when sending the group message
        if(groupName !== '' && textMessage !==''){
          socket.emit('sendGroupChatMessage',{groupName: groupName, members: groupMembers, content: {user: userName, message: textMessage, senderID: userID, userImage: chandra}}); //we are emitting the message to the server from the client
        }
      }

    },[textMessage,ReceiverUserName,userID,userName,groupMembers,groupName,isGroupMessage,containsKeyword]);


    //temp changes
    const [tempVal,setTempVal] = useState(0);
    const [tempValsender,setTempValsender] = useState('');
    const [tempValreceiver,setTempValreceiver] = useState('');
    const [tempGroupName,setTempGroupName] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      setUserID(tempVal);
      setUserName(tempValsender);
      setReceiverUserName(tempValreceiver);
      setGroupName(tempGroupName);
    };
  
    const handleChange1 = (e) => {
      const val = parseInt(e.target.value, 10);
        setTempVal(val);
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
            {userID ===0?
            <form onSubmit={handleSubmit}>
              <label>
               ID:
              <input type="ID" value={tempVal} onChange={handleChange1} />
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
              {isGroupMessage?<><GroupMessageGrouping messageProp = {{groupName,userID}}/></>:
                <>
                <MessageGrouping messageProp = {{userName,ReceiverUserName,userID}}/>
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
