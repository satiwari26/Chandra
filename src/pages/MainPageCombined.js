import { Box } from '@mui/material'
import React from 'react'
import { SidePanelPage } from './SidePanelPage'
import ChatPage from './ChatPage'

export const MainPageCombined = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Box sx={{flexGrow:1}}>
    <SidePanelPage/>
    </Box>
    <Box sx={{flexGrow:1}}>
    <ChatPage/>
    </Box>

    </Box>
  )
}
