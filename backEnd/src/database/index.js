//importing the mongoose in our project
const mongoose = require('mongoose');

//connect mongoose with my cluster
// console.log(mongodbURI);
mongoose.connect('')
.then(()=>{console.log('connected to db')})
.catch((err)=>{console.log(err)});

