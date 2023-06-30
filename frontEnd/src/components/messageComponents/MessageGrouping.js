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
  const textMessage = props.messageProp.textMessage;

  useEffect(()=>{
    if(userName !=='' && ReceiverUserName !==''){
    axios.get(`http://localhost:3001/Chandra/conversation/${userName}/${ReceiverUserName}`)
    .then((response)=>{
      console.log(response.data.conversation);
      setPost(response.data.conversation);
    })
    .catch((error)=>{
      return(console.log(error));
    },);
  }

  },[textMessage,userName,ReceiverUserName,userEmail]);
      
    // console.log(props.messageProp);
  return (
    <Box sx = {{display: 'flex', flexDirection: 'column-reverse',}}>

    {console.log(post.content)}
    {post.content && Array.isArray(post.content) && (post.content).map((individualPost,index)=>{return(
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