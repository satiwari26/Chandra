import React, { useEffect,useState } from 'react'

import { Box } from '@mui/material';
import UserIndividualMessageSend from './UserIndividualMessageSend';
import UserindividualMessageReceived from './UserindividualMessageReceived';
import axios from 'axios';

function MessageGrouping(props) {

  const [post,setPost] = useState([]);

  const userName =  props.messageProp.userName;
  const ReceiverUserName = props.messageProp.ReceiverUserName;
  const userID = props.messageProp.userID;

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

  },[userName,ReceiverUserName,userID,post]);
      
    // console.log(props.messageProp);
  return (
    <Box sx = {{display: 'flex', flexDirection: 'column-reverse',}}>

    {/* {console.log(post)} */}
    {post.message === 'Conversation exists' && post.conversation.content && Array.isArray(post.conversation.content) && (post.conversation.content).slice().reverse().map((individualPost,index)=>{return(
      <React.Fragment key={index}>
        {individualPost.id === userID? <UserIndividualMessageSend textMessage = {{message: individualPost.message, userImage: individualPost.userImage}} />:
        <UserindividualMessageReceived textMessage = {{message: individualPost.message, userImage: individualPost.userImage}}/>}
      </React.Fragment>
    )})}
        {/* <UserindividualMessageReceived message = {props.messageProp.textMessage}/>
        <UserIndividualMessageSend {...sentMessageProp}/> */}

    </Box>
  )
}

export default MessageGrouping