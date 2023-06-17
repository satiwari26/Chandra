import { Box, Paper, Typography, useTheme } from '@mui/material';

function UserIndividualMessageSend(props) {
    const theme = useTheme();
  return (
    /* word wrap decides when to break the long char onto the next line */
    <Box sx={{display: `flex`, flexDirection: 'column', justifyContent: 'spaceEvenly'}}>

        <Paper sx={{ background: theme.palette.primary.messageBlue2, wordWrap: `break-word`,
         overflow: `hidden`, display: 'inline-block',
        whiteSpace: 'pre-wrap',
        maxWidth: '30%', boxShadow: `0px 2px 4px ${theme.palette.primary.messageBlue2}`, borderRadius: '12px' }} 
        variant='outlined' elevation={6}>
        <Typography variant='messages' color={theme.palette.background.default}>{props.message}</Typography>
        </Paper>

            {/* to display if the message is sent or not. */}
            {props.status? <Typography variant='users' color={theme.palette.primary.light} sx={{fontSize: '15px'}}>Sent</Typography>
        : <Typography variant='users' color={theme.palette.primary.light} sx={{fontSize: '15px'}}>Sending...</Typography> }
    </Box>
  )
}

export default UserIndividualMessageSend