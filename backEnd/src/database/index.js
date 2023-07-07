//importing the mongoose in our project
const mongoose = require('mongoose');

//connect mongoose with my cluster
// console.log(mongodbURI);
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('connected to db')})
.catch((err)=>{console.log(err)});

