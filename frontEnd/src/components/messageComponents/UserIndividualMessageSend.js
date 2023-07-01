import { Avatar, Box, Paper, Typography, useTheme } from '@mui/material';

function UserIndividualMessageSend(prop) {
  // console.log(prop.textMessage.message)
    const theme = useTheme();
  return (
    /* word wrap decides when to break the long char onto the next line */
    <Box sx={{display: `flex`, flexDirection: 'column', justifyContent: 'spaceEvenly', paddingTop: '3%', paddingLeft: '1%'}}>
      {
        prop.textMessage.message !==''?
        <>
        <Paper sx={{ background: theme.palette.primary.messageBlue2, wordWrap: `break-word`,
         overflow: `hidden`, display: 'flex',
        whiteSpace: 'pre-wrap',
        maxWidth: '40%', boxShadow: `0px 2px 4px ${theme.palette.primary.messageBlue2}`, borderRadius: '20px 20px 0px 20px' }} 
        variant='outlined'>
        <Avatar src={prop.textMessage.userImage}/><Typography variant='messages' color={theme.palette.background.default} sx={{paddingLeft: '2%'}}>{prop.textMessage.message}</Typography>
        </Paper>

            {/* to display if the message is sent or not. */}
            {/* {messageState? <Typography variant='users' color={theme.palette.primary.light} sx={{fontSize: '15px'}}>Sent</Typography>
        : <Typography variant='users' color={theme.palette.primary.light} sx={{fontSize: '15px'}}>Sending...</Typography> } */}
      </>: null}
    </Box>
  )
}

export default UserIndividualMessageSend