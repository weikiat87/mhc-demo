const express = require('express')
const router = express.Router()
const eventController = require('../controller/Event');
const eventTypeController = require('../controller/EventType');
const userController = require('../controller/User');


const isAuth = (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
  };
  
  

/// routes for EVENT TYPE request
router.get("/eventtypes",isAuth, (req, res) => {
    eventTypeController.findEventType()
        .then((result) => res.json(result))
        .catch(err => res.send(err))
})

router.post("/eventtypes/create",isAuth, (req, res) => {
    eventTypeController.createEventType(req.body)
        .then(result => res.json(result))
        .catch(err => res.send(err))
})

/// routes for EVENT request
router.get("/events", isAuth, (req, res) => {
    eventController.findEvent()
        .then((result) => {
            console.log(result)
            res.json(result)
        })
})

router.get("/events/vendor/:id", isAuth, (req, res) => {
    console.log(req.params.id)
    eventController.findEventByVendor(req.params.id)
        .then((result) => {
            console.log(result)
            res.json(result)
        }
        )
})



router.get("/events/admin/:id", isAuth, (req, res) => {
    console.log(req.params.id)
    eventController.findEventByAdmin(req.params.id)
        .then((result) => {
            console.log(result)
            res.json(result)
        }
        )
})

router.get("/events/eventid/:id", isAuth, (req, res) => {
    console.log(req.params.id)
    eventController.findEventById(req.params.id).then(result => {
        console.log(result)
        res.json(result)
    }
    )
})


router.post("/events/id/:id", isAuth, (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    eventController.updateEvent(req.params.id, req.body)
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post("/events/create", isAuth, (req, res) => {
    console.log(req.body)
    eventController.createEvent(req.body)
        .then((result) => {
            console.log(result);
            res.send(result)
        }).catch((err) => {
            res.send(err)
        })
})

// Routes for USERS request
router.get('/users', (req, res) => {
    userController.findUsers()
        .then((result) => res.json(result))
        .catch(err => res.send(err))
})
// Routes for VENDOR request
router.get('/vendors', (req, res) => {
    userController.findVendors()
        .then(result => res.json(result))
        .catch(err => res.send(err))
})
// Routes for ADMIN request
router.get('/admins', (req, res) => {
    userController.findAdmins()
        .then(result => res.json(result))
        .catch(err => res.send(err))
})
module.exports = router