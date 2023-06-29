const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: mongoose.SchemaTypes.String,
        required: true, //this property must be present
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

//need to compile our schema into an actual model
module.exports = mongoose.model('users',UserSchema);