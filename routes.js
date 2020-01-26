const express = require('express')
const router = express.Router()
const eventController = require('./controller/Event');
const userController = require('./controller/User');

router.get("/events", (req, res) => {
    eventController.findEvent().then((result) => {
        console.log(result)
        res.json(result)
    }
    )
})

router.get("/events/:vendor", (req, res) => {
    console.log(req.params.vendor)
    eventController.findEventByVendor(req.params.vendor).then((result) => {
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

router.get('/users',(req,res)=>{
    userController.findUser().then((result)=>{
        res.json(result)
    })
})
module.exports = router