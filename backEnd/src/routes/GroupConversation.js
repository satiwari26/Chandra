const {Router} = require('express');
const GroupConversation = require('../database/schemas/GroupConversation');

const router = Router(); //creating the router to handle my conversation http request

router.get('/:groupName', (req,res)=>{
    const {groupName} = req.params; 

    GroupConversation.findOne({GroupName: groupName})   //doesn't require any query because we are soting it based on the group
    //name, we are assuming that each course name is going to be unique
    .then((group)=>{
        if(group){
            res.json({ message: 'Group Conversation exists', group });
        }
        else{
            // Conversation does not exist
            res.json({ message: 'Group Conversation does not exist' });
        }
    })
    .catch((error)=>{
        res.status(500).json({ error: 'Internal server error' });
    })

});

module.exports = router;