import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

function UserindividualMessageReceived(props) {
    const theme = useTheme();
    return (
      /* word wrap decides when to break the long char onto the next line */
      <Box sx={{display: `flex`, flexDirection: 'column', justifyContent: 'spaceEvenly'}}>
  
          <Paper sx={{ background: theme.palette.primary.messageBlue1, wordWrap: `break-word`,
           overflow: `hidden`, display: 'inline-block',
          whiteSpace: 'pre-wrap',
          maxWidth: '50%', boxShadow: `0px 2px 4px ${theme.palette.primary.messageBlue1}`, borderRadius: '0px 20px 20px 20px' }} 
          variant='outlined' elevation={6}>
          <Typography variant='messages' color={theme.palette.background.default}>{props.message}</Typography>
          </Paper>

      </Box>
    )
}

export default UserindividualMessageReceived