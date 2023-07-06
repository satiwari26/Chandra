import React, {useState} from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

function SignInPage({setIsSignInPage,setSignUserName,setSignUserEmail,setSignUserToken}) {
  const theme = useTheme();

  const [tempUserName,setTempUserName] = useState('');
  const [tempUserEmail,setTempUserEmail] = useState('');
  const [tempUserToken,setTempUserToken] = useState('');

  const [signInError,setSignInError] = useState(false);

  const textFieldVariants = {
    normal: {
      scale: 1,
      backgroundColor: 'transparent',
    },
    hover: {
      scale: 1.005,
      boxShadow: `0px 4px 4px ${theme.palette.primary.messageBlue1}`
    },
    error: {
        scale: 1.1,
        backgroundColor: theme.palette.primary.messageBlue1,
        boxShadow: `0px 4px 8px ${theme.palette.primary.messageBlue1}`,
        borderColor: 'red',
      },
  };

  const SignInHandler = () => {
    if (tempUserName.trim() === '' || tempUserEmail.trim() === '' || tempUserToken.trim() === '') {
        setSignInError(true);
        return;
    }
    else{
        setSignUserName(tempUserName);
        setSignUserEmail(tempUserEmail);
        setSignUserToken(tempUserToken);
        setIsSignInPage(false);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', m: '5%' }}>
      <Typography variant="heading" color={theme.palette.primary.messageBlue1} sx={{
        [theme.breakpoints.up('md')]: { fontSize: '70px' },
        [theme.breakpoints.up('sm')]: { fontSize: '60px' },
        [theme.breakpoints.up('xs')]: { fontSize: '50px' }
      }}>
        Chandra
      </Typography>

      <Typography variant="messages" color={theme.palette.primary.messageBlue1} sx={{
        [theme.breakpoints.up('md')]: { fontSize: '70px' },
        [theme.breakpoints.up('sm')]: { fontSize: '60px' },
        [theme.breakpoints.up('xs')]: { fontSize: '50px' }
      }}>
        Canvas Linked messaging
      </Typography>

      <Box sx={{ width: '500px', mt: '30px',}}>
      <motion.div variants={signInError?textFieldVariants.error : textFieldVariants} whileHover="hover" initial="normal">
      <TextField
            label="User Name"
            variant="filled"
            fullWidth
            margin="normal"
            value={tempUserName}
            onChange={(e)=>{setTempUserName(e.target.value)}}
            InputProps={{
                style: {
                    color: theme.palette.primary.messageBlue2,
                }
            }}
            InputLabelProps={{
                style: {
                    color: theme.palette.primary.messageBlue2
                }
            }}
            />
        </motion.div>

        <motion.div variants={signInError?textFieldVariants.error : textFieldVariants} whileHover="hover" initial="normal">
            <TextField
            label="Email"
            variant="filled"
            value={tempUserEmail}
            onChange={(e)=>{setTempUserEmail(e.target.value)}}
            fullWidth
            margin="normal"
            InputProps={{
                style: {
                    color: theme.palette.primary.messageBlue2,
                }
            }}
            InputLabelProps={{
                style: {
                    color: theme.palette.primary.messageBlue2
                }
            }}
            />
        </motion.div>
        <motion.div variants={signInError?textFieldVariants.error : textFieldVariants} whileHover="hover" initial="normal">
            <TextField
            label="Canvas Token"
            variant="filled"
            fullWidth
            margin="normal"
            value={tempUserToken}
            onChange={(e)=>{setTempUserToken(e.target.value)}}
            type="password"
            InputProps={{
                style: {
                    color: theme.palette.primary.messageBlue2,
                }
            }}
            InputLabelProps={{
                style: {
                    color: theme.palette.primary.messageBlue2
                }
            }}
            />
            </motion.div>

            <Button variant="contained" color="primary" fullWidth sx={{mt: '30px'}} onClick={SignInHandler}>
            Sign In
            </Button>
            </Box>
      </Box>
  );
}

export default SignInPage;
