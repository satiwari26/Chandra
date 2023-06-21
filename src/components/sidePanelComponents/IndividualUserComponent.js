import { useTheme } from '@emotion/react'
import { Avatar, Paper, Typography } from '@mui/material'
import {IoMdArrowDropright} from 'react-icons/io';
import React from 'react'

const IndividualUserComponent = ({userImage, userName}) => {
    const theme = useTheme();
  return (
    <Paper variant='outlined' sx={{backgroundColor: theme.palette.background.variant1, display: 'flex',
    flexDirection: 'row', border: `2px solid ${theme.palette.background.variant2}`, height: '120%'}}>

    <Typography variant="messages" color={theme.palette.primary.messageBlue1} sx={{padding: '5px'}}>
    <Avatar src={userImage} alt={userName}/>
    </Typography>

     <Typography variant="messages" color={theme.palette.primary.messageBlue1} fontSize='28px' 
     sx={{padding: '2px', paddingLeft:'10px', flexGrow: 1}}>{userName}</Typography>

    <Typography variant="messages" color={theme.palette.primary.messageBlue1} fontSize='30px' 
     sx={{padding: '2px'}}><IoMdArrowDropright/></Typography>

    </Paper>

  )
}

export default IndividualUserComponent