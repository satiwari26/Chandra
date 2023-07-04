const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    Sender: {
        type: mongoose.SchemaTypes.String,
        required: true, //this property must be present
    },
    Receiver: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    content: [{  //to identify if it's sender or receiver sending the message
        message: {
          type: String,
          required: true
        },
        id: {  //will check if the user is you or someone else
          type: Number,
          required: true
        },
        userImage: {
          type: String,
          default: 'https://hips.hearstapps.com/hmg-prod/images/fantastic-moonlight-royalty-free-image-943911344-1553714433.jpg?crop=0.998xw:0.817xh;0.00160xw,0&resize=1200:*'
        },
      }],
    timestamp: {
        type: Date,
        default: Date.now
      },
});

//need to compile our schema into an actual model
module.exports = mongoose.model('ConversationPro1',ConversationSchema);