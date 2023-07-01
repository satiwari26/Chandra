import React from 'react';
import { Avatar,Box, Paper, Typography, useTheme } from '@mui/material';

function UserindividualMessageReceived(props) {
    const theme = useTheme();
    return (
      /* word wrap decides when to break the long char onto the next line */
      <Box sx={{display: `flex`, flexDirection: 'column', justifyContent: 'spaceEvenly', paddingTop: '3%', paddingLeft: '1%'}}>
          {props.textMessage.message !== ''?
          <>
          <Paper sx={{ background: theme.palette.primary.messageBlue1, wordWrap: `break-word`,
           overflow: `hidden`, display: 'flex',
          whiteSpace: 'pre-wrap',
          maxWidth: '40%', boxShadow: `0px 2px 4px ${theme.palette.primary.messageBlue1}`, borderRadius: '0px 20px 20px 20px' }} 
          variant='outlined'>
          <Avatar src={props.textMessage.userImage}/><Typography variant='messages' color={theme.palette.background.default} sx={{paddingLeft: '2%'}}>{props.textMessage.message}</Typography>
          </Paper>
          </>:
          null
          }
      </Box>
    )
}

export default UserindividualMessageReceived