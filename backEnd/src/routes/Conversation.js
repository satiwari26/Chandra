const {Router} = require('express');
const Conversation = require('../database/schemas/Conversation');

const route = Router(); //creating the router to handle my conversation http request

route.get('/:userName/:receiverName', (req,res)=>{
    const {userName,receiverName} = req.params; 

    //finding the conversation in the dataBase, if it exist then we return a response sending this data value back
    Conversation.findOne({
        $or: [
          { Sender: userName, Receiver: receiverName },
          { Sender: receiverName, Receiver: userName }
        ]
      })
        .then(conversation => {
          if (conversation) {
            // Conversation exists
            res.json({ message: 'Conversation exists', conversation });

          } else {
            // Conversation does not exist
            res.json({ message: 'Conversation does not exist' });
          }
        })
        .catch(error => {
          // Handle the error
          res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = route;