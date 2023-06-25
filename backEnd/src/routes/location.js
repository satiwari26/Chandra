const {Router} = require('express');

const router  = Router();

const location = [{
    city: 'Cameron Park',
    country: 'USA'
},
{
    city: 'Lucknow',
    country: 'India'
},
{
    city: 'SFO',
    country: 'USA'
},
];

router.get('/', (req,res)=>{
    res.send(location);
});

router.get('/:userCity',(req,res)=>{
    const {userCity} = req.params;
    const foundLocation = location.find((individualLocation)=>{return(
        individualLocation.city ===userCity
    );});
    res.send(foundLocation);
});

router.post('/',(req,res)=>{
    console.log(req.body);
    location.push(req.body);
    res.sendStatus(200);
})


module.exports = router;