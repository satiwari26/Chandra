const {Router} = require('express');

//similar to  express we create the router by calling the Router function
const router = Router();


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
router.get('/',(request,response,next)=>{  //this is our second middleware function that has access to these parameters
console.log('before calling the main handler function');
next(); //calls the next middleware(our actual handler function)
} 
,(request,response)=>{
response.send(profile);

});


router.get('/:user', (request,response)=>{
const {user} = request.params;  //we can also destructure the object and get the individual value from route param

//for the each value of the array, find the user that name matches with the endpoint name
const userName = profile.find((individualUser)=>{return(individualUser.name ===user)});

response.send(userName);    // this would be an object because we looked at individual object and searched it with 
//the first name
});

router.post('/',(req,res)=>{
console.log(req.body);  //contains the data that is received from the client via req
res.sendStatus(201);  //success code
profile.push(req.body);
});

//export the router from this file
module.exports = router;