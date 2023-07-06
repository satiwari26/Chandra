//importing data base files
require('../database');
const {Router} = require('express');

const router = Router(); // Creating the router to handle my Canvas API requests
const userAuth = require('../database/schemas/UserAuth');

router.get('/userInfo/:userName/:userEmail/:userToken', (req, res) => {
    const { userName, userEmail, userToken } = req.params;
  
    userAuth.findOne({ email: userEmail })
      .then(userInfo => {
        if (userInfo) {
          userInfo.accessToken = userToken;
          return userInfo.save();
        } else {
          const newUserAuth = new userAuth({
            name: userName,
            email: userEmail,
            accessToken: userToken
          });
          return newUserAuth.save();
        }
      })
      .then(savedUserInfo => {
        console.log('User info updated/created:', savedUserInfo);
        res.json(savedUserInfo);
      })
      .catch(error => {
        console.error('Error saving/updating user info:', error);
        res.status(500).json({ error: 'An error occurred' });
      });
  });

module.exports = router;