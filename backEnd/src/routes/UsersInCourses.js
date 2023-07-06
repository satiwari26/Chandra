const { Router } = require('express');
const axios = require('axios');
const userAuth = require('../database/schemas/UserAuth.js');
// const canvas_API_KEY = require('./Canvas_token.js');


const router = Router();

router.get('/canvas-api/:userEmail/:course_ID', (req, res) => {
    const {userEmail,course_ID} = req.params;
  const url = `https://canvas.calpoly.edu/api/v1/courses/${course_ID}/students`;

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
      const users = response.data;
      const usersInfo = users.map(user => ({
        name: user.name,
        avatarUrl: user.avatar_url,
      }));
      res.send(users);
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
