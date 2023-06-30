const {Router, response} = require('express');

//importing the model created by the mongoose
const User = require('../database/schemas/User');

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
    response.cookie('visited', true,{  //in the response we send the cookie to the client before sending the response
        maxAge: 600000,
    });
    response.send(profile);

});


router.get('/:user', (request,response)=>{
    console.log(request.headers.cookie);//the cookies usually live in the header so this is where and how we can access them

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

router.get('/naming/suffix', (request,response)=>{
    const {suffix} = request.session;
    if(!suffix){
        response.send("you haven't provided us your suffix");
    }
    else{
        response.send(suffix);
    }
});

// //creating the data for the mongoose dataBase,
// router.post('/register', async(request,response)=>{ //need to add async to make sure that it performs this operation async
//     const {userName, password, email} = request.body;
//     const userDB = await User.findOne({$or: [{userName}, {email}]});

//     if(userDB){ //if we found the user with the corresponding name or email
//         response.status(400).send({msg: 'user already exist'});
//     }
//     else{
//         const newUser = await User.create({userName,password,email});  //create a new user with these values
//         response.status(200).send({msg: 'registration successful!'});
//     }
// })

router.post('/naming/suffix/gender',(req,res)=>{
    const {name,lastName} = req.body;
    const userTry = {name,lastName};
    if(req.session.suffix){
        req.session.suffix.gender.push(userTry);
    }
    else{
        req.session.suffix = {
            gender: [userTry],
        }
    }
    res.sendStatus(201);
})

//export the router from this file
module.exports = router;