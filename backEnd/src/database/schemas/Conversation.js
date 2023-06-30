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
        email: {  //will check if the user is you or someone else
          type: String,
          required: true
        }
      }],
    timestamp: {
        type: Date,
        default: Date.now
      },
});

//need to compile our schema into an actual model
module.exports = mongoose.model('users',ConversationSchema);