const mongoose = require('mongoose');

//for the group conversation.
const GroupConversationSchema = new mongoose.Schema({
    GroupName: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    Members: [{
      type: mongoose.SchemaTypes.String,
      required: true,
    }],
    content: [{
      user: {
        type: mongoose.SchemaTypes.String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      userImage: {
        type: String,
        default: 'https://hips.hearstapps.com/hmg-prod/images/fantastic-moonlight-royalty-free-image-943911344-1553714433.jpg?crop=0.998xw:0.817xh;0.00160xw,0&resize=1200:*'
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
  });
  

//need to compile our schema into an actual model
module.exports = mongoose.model('groupConversationPro',GroupConversationSchema);