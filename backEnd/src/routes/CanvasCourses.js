const {Router} = require('express');
const axios = require('axios');
const userAuth = require('../database/schemas/UserAuth.js');
// const canvas_API_KEY = require('./Canvas_token.js');

const router = Router(); //creating the router to handle my canvas api req

router.get('/canvas-api/:userEmail', (req, res) => {
    const url = 'https://canvas.calpoly.edu/api/v1/courses';
    const {userEmail} = req.params;

    userAuth.findOne({ email: userEmail }) // Replace userEmail with the user's email
    .then(userInfo => {
      if (!userInfo) {
        throw new Error('User not found'); // Handle the case where the user is not found
      }
  
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    })
    .then(response => {
      // Handle the response data
      res.send(response.data);
    })
    .catch(error => {
      // Handle the error
      res.status(500).send(error.message);
    });
  })
    .catch(error => {
      // Handle the error
      res.status(500).send(error.message);
    });
  });

module.exports = router;