const { Router } = require('express');
const axios = require('axios');
const canvas_API_KEY = require('./Canvas_token.js');


const router = Router();

router.get('/canvas-api/:course_ID', (req, res) => {
    const {course_ID} = req.params;
  const url = `https://canvas.calpoly.edu/api/v1/courses/${course_ID}/students`;

  axios.get(url, {
    headers: {
      Authorization: `Bearer ${canvas_API_KEY}`,
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
});

module.exports = router;
