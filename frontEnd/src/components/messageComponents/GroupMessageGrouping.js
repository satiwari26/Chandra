import React, { useEffect,useState } from 'react'

import { Box } from '@mui/material';
import UserIndividualMessageSend from './UserIndividualMessageSend';
import UserindividualMessageReceived from './UserindividualMessageReceived';
import axios from 'axios';

function GroupMessageGrouping(props) {

  const [post,setPost] = useState([]);

  const groupName = props.messageProp.groupName;
  const userEmail = props.messageProp.userEmail;

  useEffect(()=>{
    const fetchData = () => {
      if (groupName !=='') {
        axios
          .get(`http://localhost:3001/Chandra/groupConversation/${groupName}`)
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

  },[groupName,userEmail,post]);
      
    // console.log(props.messageProp);
  return (
    <Box sx = {{display: 'flex', flexDirection: 'column-reverse',}}>

    {/* {console.log(post)} */}
    {post.message === 'Group Conversation exists' && post.group.content && Array.isArray(post.group.content) && (post.group.content).slice().reverse().map((individualPost,index)=>{return(
      <React.Fragment key={index}>
        {individualPost.email === userEmail? <UserIndividualMessageSend textMessage = {{message: individualPost.message, userImage: individualPost.userImage}} />:
        <UserindividualMessageReceived textMessage = {{message: individualPost.message, userImage: individualPost.userImage}}/>}
      </React.Fragment>
    )})}
        {/* <UserindividualMessageReceived message = {props.messageProp.textMessage}/>
        <UserIndividualMessageSend {...sentMessageProp}/> */}

    </Box>
  )
}

export default GroupMessageGrouping;