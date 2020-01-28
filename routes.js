const express = require('express')
const router = express.Router()
const eventController = require('./controller/Event');
const userController = require('./controller/User');

/// routes for EVENT request
router.get("/events", (req, res) => {
    eventController.findEvent().then((result) => {
        console.log(result)
        res.json(result)
    }
    )
})

router.get("/events/vendor/:id", (req, res) => {
    console.log(req.params.id)
    eventController.findEventByVendor(req.params.id).then((result) => {
        console.log(result)
        res.json(result)
    }
    )
})
router.get("/events/id/:id", (req, res) =>{
    console.log(req.params.id)
    eventController.findEventById(req.params.id).then(result=>{
        console.log(result)
        res.json(result)
    }
    )
})


router.post("/events/id/:id", (req, res) =>{
    console.log(req.params.id)
    console.log(req.body)
    eventController.updateEvent(req.params.id,req.body).then(result=>{
        console.log(result)
        res.json(result)
    }
    )
})

router.post("/events/create",(req,res)=>{
    console.log(req.body)
    eventController.createEvent(req.body).then((result)=>{
        console.log(result);
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})

// Routes for USERS request
router.get('/users',(req,res)=>{
    userController.findUser().then((result)=>{
        res.json(result)
    })
})
module.exports = router