const express = require('express');

//app is now the instance of the express 
const app = express();

const PORT = 3000;  //custom port

 app.use(express.json());

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
app.get('/userName', (request,response)=>{
    response.send(profile);

});

app.post('/userName',(req,res)=>{
    console.log(req.body);  //contains the data that is received from the client via req
    res.sendStatus(201);  //success code
});