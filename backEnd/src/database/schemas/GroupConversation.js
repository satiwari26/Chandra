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
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
  });
  

//need to compile our schema into an actual model
module.exports = mongoose.model('groupConversation',GroupConversationSchema);