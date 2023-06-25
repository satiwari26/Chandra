const express = require('express');

//import the router from the userName and use it in my main index file
const userNameRouter = require('./routes/userName');

const userLocationRouter = require('./routes/location');

//app is now the instance of the express 
const app = express();

const PORT = 3000;  //custom port

 app.use(express.json());   //middle ware, basically means it acts as a in-between
 //program that is declared before the handler function(i.e (req,res)) function is declared
 // the reason is because every time client makes the request that request first goes through the middleware method
 //where it's data gets parsed and then handler function gets executed.

 app.use((req,res,next)=>{  //global middleware that would work for any routes and globally
    console.log(`${req.method} : ${req.url}`);
    next(); //important to call the next middleware other wise it won't work as expected
 });



 //let the express know about the router using the middleware function
 app.use('/userName',userNameRouter);  //now express knows about our routes

 app.use('/location', userLocationRouter);


//express has these predefined methods build in, sice app is an instance of express
//I can use it to listen the request from the clients through this port
app.listen(PORT, console.log('our app is running now!'));

    