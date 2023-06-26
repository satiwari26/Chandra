//importing the mongoose in our project
const mongoose = require('mongoose');

//connect mongoose with my cluster
mongoose.connect('mongodb+srv://satiwari:Cruelhero26@chandracluster.xalyxxa.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{console.log('connected to db')})
.catch((err)=>{console.log(err)});

