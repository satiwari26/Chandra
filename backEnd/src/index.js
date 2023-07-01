const express = require('express');

//importing data base files
 require('./database');
 const Conversation = require('./database/schemas/Conversation');

 //importing Groupconversation Model
 const groupConversation = require('./database/schemas/GroupConversation');

 //importing the conversation router
 const conversationRouter = require('./routes/Conversation');

 //importing the groupConversation router
 const groupConversationRouter = require('./routes/GroupConversation');

const session = require('express-session');

//app is now the instance of the express 
const app = express();

//adding http module is not required but it is recomended to use with the socket.io
const http = require('http');

//import the socketIO 
const {Server} = require('socket.io');

//importing the cors library
const cors = require('cors');

//we also need to tell our app to accept the cors using the app middleware
app.use(cors());

//letting the app know about the conversation Router and prefix endpoint using middleware
app.use('/Chandra/conversation',conversationRouter);
app.use('/Chandra/groupConversation',groupConversationRouter);


//create the http serve that socket io uses to work with
const server = http.createServer(app);

//variable that we will be using to work with socket io
const io = new Server(server,{
   cors: {  //cors is useful to identify on which port our front-end is running
    origin: "http://localhost:3000",
    methods: ["GET","POST"],
   }
});

//creating connection using this socket
io.on(('connection'),(socket)=>{//every time user loads up this website 
  //each client will get their own socket. With this socket we can send message down to the user
  console.log('new User');

  // {Sender: message.sender, Receiver: message.receiver},
  // {Sender: message.receiver, Receiver: message.sender}

    socket.on('sendChatMessage',(newMessage)=>{  //we are adding listner to the server so it is listening to
      //individual messages that we sent from the client
      // console.log(newMessage);
      
      Conversation.findOne({
        $or: [
          {Sender: newMessage.sender, Receiver: newMessage.receiver},
          {Sender: newMessage.receiver, Receiver: newMessage.sender}
        ],
      }).then((existingConversation) => {
          if(existingConversation){//if there exist a conversation schema we want to append messages to it's array
            existingConversation.content.push({
              message: newMessage.content.message,
              email: newMessage.content.senderEmail
            });

            //save the updated conversation
            existingConversation.save().then((updatedConversation)=>{
              console.log('Conversation updated:', updatedConversation);
            })
            .catch((error) => {
              console.log('Error updating conversation:', error);
            });

          }

          else{ //if conversation doesn't exist
                const newConversation = new Conversation({
                  Sender: newMessage.sender,
                  Receiver: newMessage.receiver,
                  content: [{
                    message: newMessage.content.message,
                    email: newMessage.content.senderEmail
                  }]
                });

                
              // Save the new conversation
              newConversation.save()
              .then((savedConversation) => {
                console.log('Conversation saved:', savedConversation);
              })
              .catch((error) => {
                console.log('Error saving conversation:', error);
              });

          }

      }).catch((error) => {
        console.log('Error finding conversation:', error);
      });

          //to send the message to everyone that is on this server, except to the one that is sending this message
        // socket.broadcast.emit('chatMessage',message);
    });


    //adding another listner that is going to listent to groupMessages sent from the client
    socket.on('sendGroupChatMessage',(newMessage)=>{
      groupConversation.findOne({GroupName: newMessage.groupName})
      .then((existingConversation) => {
        if(existingConversation){//if there exist a conversation schema we want to append messages to it's array
          existingConversation.content.push({
            user: newMessage.content.user,
            message: newMessage.content.message,
            email: newMessage.content.senderEmail
          });

          //save the updated conversation
          existingConversation.save().then((updatedConversation)=>{
            console.log('Conversation updated:', updatedConversation);
          })
          .catch((error) => {
            console.log('Error updating conversation:', error);
          });

        }
        else{ //if conversation doesn't exist
          const newGroupConversation = new groupConversation({
            GroupName: newMessage.groupName,
            Members: newMessage.members,
            content: [{
              user: newMessage.content.user,
              message: newMessage.content.message,
              email: newMessage.content.senderEmail
            }]
          });

          
        // Save the new conversation
        newGroupConversation.save()
        .then((savedConversation) => {
          console.log('Conversation saved:', savedConversation);
        })
        .catch((error) => {
          console.log('Error saving conversation:', error);
        });
    }
      
      }).catch((error) => {
        console.log('Error finding conversation:', error);
      });
      
    });
});



const PORT = 3001;  //custom port, because react is running on 3000


 app.use(express.json());   //middle ware, basically means it acts as a in-between
 //program that is declared before the handler function(i.e (req,res)) function is declared
 // the reason is because every time client makes the request that request first goes through the middleware method
 //where it's data gets parsed and then handler function gets executed.



//express has these predefined methods build in, sice app is an instance of express
//I can use it to listen the request from the clients through this port
server.listen(PORT, console.log('our app is running now!'));

    