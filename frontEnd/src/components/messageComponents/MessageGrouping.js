import React, { useEffect,useState } from 'react'

import { Box } from '@mui/material';
import UserIndividualMessageSend from './UserIndividualMessageSend';
import UserindividualMessageReceived from './UserindividualMessageReceived';
import axios from 'axios';

function MessageGrouping(props) {

  const [post,setPost] = useState([]);

  const userName =  props.messageProp.userName;
  const ReceiverUserName = props.messageProp.ReceiverUserName;
  const userEmail = props.messageProp.userEmail;

  useEffect(()=>{
    const fetchData = () => {
      if (userName !== '' && ReceiverUserName !== '') {
        axios
          .get(`http://localhost:3001/Chandra/conversation/${userName}/${ReceiverUserName}`)
          .then((response) => {
            setPost(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    // Fetch data initially
    fetchData();

      // Fetch data every 10 seconds
    const interval = setInterval(fetchData, 30000);

    return () => {
      clearInterval(interval);
    };

  },[userName,ReceiverUserName,userEmail,post]);
      
    // console.log(props.messageProp);
  return (
    <Box sx = {{display: 'flex', flexDirection: 'column-reverse',}}>

    {/* {console.log(post)} */}
    {post.message === 'Conversation exists' && post.conversation.content && Array.isArray(post.conversation.content) && (post.conversation.content).slice().reverse().map((individualPost,index)=>{return(
      <React.Fragment key={index}>
        {individualPost.email === userEmail? <UserIndividualMessageSend textMessage = {individualPost.message} />:
        <UserindividualMessageReceived textMessage = {individualPost.message}/>}
      </React.Fragment>
    )})}
        {/* <UserindividualMessageReceived message = {props.messageProp.textMessage}/>
        <UserIndividualMessageSend {...sentMessageProp}/> */}

    </Box>
  )
}

export default MessageGrouping