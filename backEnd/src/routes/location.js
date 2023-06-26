const {Router} = require('express');

const router  = Router();

const location = [{
    id: 1,
    city: 'Cameron Park',
    country: 'USA',
    miles: 20,
},
{
    id: 2,
    city: 'Lucknow',
    country: 'India',
    miles: 50000,
},
{
    id: 3,
    city: 'SFO',
    country: 'USA',
    miles: 200,
},
{
    id: 4,
    city: 'Eldorado Hills',
    country: 'USA',
    miles: 15,
},
{
    id: 5,
    city: 'Raebareli',
    country: 'India',
    miles: 56000,
},
{
    id: 6,
    city: 'LA',
    country: 'USA',
    miles: 206,
},
];



router.get('/', (req,res)=>{
    const {miles} = req.query;
    const parseMiles = parseInt(miles);

    if(!isNaN(parseMiles)){
        const filterLocation = location.filter((individualLocation)=>{return(individualLocation.miles<=parseMiles)});
        res.send(filterLocation);
    }
    else{res.send(location);}
    
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