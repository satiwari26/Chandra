import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SidePanelPage } from './SidePanelPage'
import MessageHeaderComponent from '../components/messageComponents/MessageHeaderComponent'
import MessageGrouping from '../components/messageComponents/MessageGrouping'
import MessageInputField from '../components/messageComponents/MessageInputField'
import GroupMessageGrouping from '../components/messageComponents/GroupMessageGrouping'
import axios from 'axios';
import chandra from '../assets/chandra_static.jpg';

//google library for generativeLanguageModel
// const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
// const { GoogleAuth } = require("google-auth-library");


//to create a connection of socketIO from the backend
import io from 'socket.io-client';
import DefaultPageBlank from './DefaultPageBlank/DefaultPageBlank'

//creating connection to the socket server
const socket = io.connect("http://localhost:3001");

//google api_url

export const MainPageCombined = ({signUserName,SignUserEmail,SignUserToken}) => {
    const [textMessage,setTextMessage] = useState('');
    const [userID,setUserID] = useState(0); //to uniquely identify each user
    const [userName,setUserName] = useState('');  //senders info
    const [userImage,setUserImage] = useState('');

    //to specify if the message that we are sending is a group message or not
    const [isGroupMessage,setIsGroupMessage] = useState('false');
    const [groupName,setGroupName] = useState('');
    const [groupMembers,setGroupMembers] = useState(['saumitra','dhruv','shrey']);
    const [groupID,setGroupID] = useState(0); //would be useful to access the specific course by their id

    //list of the conversation
    const [coversationList,setConversationList] = useState([{name: '', avatar: chandra, id: 0}]);
    const [userList,setUserList] = useState([]);

    //extracting the prompt from the message, looking for the open-ai keyword
    const [containsKeyword,setContainsKeyword] = useState(false);
    // const [prompt,setPrompt] = useState('');  //to get the prompt value

    //default page view
    const [isDefaultPage,setIsDefaultPage] = useState(true);

    //messageHeader &receiver info
    const [ReceiverUserImage, setReceiverUserImage] = useState('');
    const [ReceiverUserName, setReceiverUserName] = useState('');
    const isMessageHeader = true; //true when message header is present
    

    const messageHeaderProp = {ReceiverUserImage, ReceiverUserName,isMessageHeader};

    //storing the user info, including the name, email, token
    useEffect(() => {
      axios
          .get(`http://localhost:3001/Chandra/authentication/userInfo/${signUserName}/${SignUserEmail}/${SignUserToken}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },[]);

  //access the user info from the backend using canvas api
  useEffect(()=>{
    axios
          .get(`http://localhost:3001/Chandra/self/canvas-api/${SignUserEmail}`)
          .then((response) => {
            setUserName(response.data.name);
            setUserID(response.data.id);
            setUserImage(response.data.avatar_url);
          })
          .catch((error) => {
            console.log(error);
          });
  },[]);

  //access the course info from the canvas api and generate the list with this
  useEffect(()=>{
    let newCourseArray = [];
    axios
          .get(`http://localhost:3001/Chandra/courses/canvas-api/${SignUserEmail}`)
          .then((response) => {
            // console.log(response.data);

            newCourseArray = response.data.map((value) => {
              if (value.name !== '' && value.name !== undefined) {
                const parts = (value.name).split(' - ');  //access the course number and name part of the string
                const courseName = parts[0];
                return { name: courseName, avatar: chandra, id: value.id };
              }
              return null; // Ignore elements with empty or undefined name
            }).filter((value) => value !== null); // Filter out null values
      
            setConversationList(() => [ ...newCourseArray]);

          // Access all the users list from the course
            newCourseArray.forEach((value) => {
              if(value.name !==undefined){
              axios
                .get(`http://localhost:3001/Chandra/courseUsers/canvas-api/${SignUserEmail}/${value.id}`)
                .then((response) => {
                  // console.log(response.data);
                  setUserList((prevUserList) => [...prevUserList, ...response.data]);
                })
                .catch((error) => {
                  console.log(error);
                });
              }
            })

          })
          .catch((error) => {
            console.log(error);
          });

  },[]);

  // useEffect(() => {
  //   // console.log(userList);
  //   console.log(coversationList);
  // }, [coversationList]);



  //to make the request from the google generativeModel
    // useEffect(()=>{
    //     const url = `${API_URL}?key=${API_KEY}`;
    //     //extracting the prompt from the textMessage
    //     const keyword = '/chandra';
    //     const tempmessage = textMessage.trim();
    //     let prompt = '';
      
    //     if (tempmessage.startsWith(keyword.toLowerCase())) {
    //     setContainsKeyword(true);
    //      prompt = tempmessage.slice(keyword.length).trim(); //set the prompt state value
    //     // Use the extracted prompt for further processing or API call
    //     console.log('Prompt:', prompt);
    //     } 
    //     else {
    //       setContainsKeyword(false);
    //     }

    //     const generate = async()=>{
    //       try {
    //         const response = await axios.post(url, { prompt });
    //         return console.log(response.data);
    //       } catch (error) {
    //         console.error('Error generating text:', error);
    //         throw error;
    //       }
    //     }

    //     if(containsKeyword){
    //     generate(); //calling my function to generate the response
    //   }

    // },[textMessage,containsKeyword]);

    //individual message sideEffects
    useEffect(()=>{
      console.log(isGroupMessage,containsKeyword);
      if(isGroupMessage===false && containsKeyword === false){  //render this when not the group message
      if(userName !=='' && ReceiverUserName !=='' && userID !==0 && textMessage !==''){
        socket.emit('sendChatMessage',{sender: userName, receiver: ReceiverUserName, content: {message: textMessage, senderID: userID, userImage: userImage}}); //we are emitting the message to the server from the client
      }
      setTextMessage(''); //reset the text message to empty sting so it doesn't send other users some different message.
    }

      if(isGroupMessage===true && containsKeyword === false){ //render this conditionally when sending the group message
        if(groupName !== '' && textMessage !==''){
          socket.emit('sendGroupChatMessage',{groupName: groupName, members: groupMembers, content: {user: userName, message: textMessage, senderID: userID, userImage: userImage}}); //we are emitting the message to the server from the client
        }
        setTextMessage(''); //reset the text message to empty sting so it doesn't send other users some different message.
      }

    },[textMessage,ReceiverUserName,userID,userName,groupMembers,groupName,isGroupMessage,containsKeyword,userImage]);

    const sidePanelProp = {setConversationList,coversationList,userImage,userName,setIsGroupMessage,setGroupName,setGroupID,
      setReceiverUserImage,setReceiverUserName,userList,setIsDefaultPage};

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <SidePanelPage style={{height: '100vh'}} {...sidePanelProp}/>
      {isDefaultPage  ? <DefaultPageBlank/> :
        <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>

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
      }

    </Box>
  )
}
