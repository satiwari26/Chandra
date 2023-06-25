const express = require('express');

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

//express has these predefined methods build in, sice app is an instance of express
//I can use it to listen the request from the clients through this port
app.listen(PORT, console.log('our app is running now!'));

    const profile = [{
        name: 'Ben',
        lastName: 'Unknown',
    },
    {
        name: 'CruelHero',
        lastName: 'Tiwari',
    },
    {
        name: 'Saumitra',
        lastName: 'Tiwari',
    },
    {
        name: 'Dhruv',
        lastName: 'Tiwari',
    },
    ];

//get requests
app.get('/userName',(request,response,next)=>{  //this is our second middleware function that has access to these parameters
    console.log('before calling the main handler function');
    next(); //calls the next middleware(our actual handler function)
} 
,(request,response)=>{
    response.send(profile);

});

app.post('/userName',(req,res)=>{
    console.log(req.body);  //contains the data that is received from the client via req
    res.sendStatus(201);  //success code
    profile.push(req.body);
});