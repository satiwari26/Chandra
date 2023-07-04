const {Router} = require('express');
const axios = require('axios');
const canvas_API_KEY = require('./Canvas_token.js');

const router = Router(); //creating the router to handle my canvas api req

router.get('/canvas-api', (req, res) => {
    const url = 'https://canvas.calpoly.edu/api/v1/users/self';
  
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${canvas_API_KEY}`,
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
  });

module.exports = router;