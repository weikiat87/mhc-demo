var EventController = require('../model/Event');
const status = {
    pending: "pending",
    approved: "approved"
}

const eventCtr = {
    createEvent: (data) => {
        return new Promise((resolve, reject) => {
            EventController.create({
                eventName: data.eventName,
                createdBy: {
                    name: data.name
                },
                proposedDate: data.proposedDate,
                location: data.location,
                status: status.pending

            }).then(result => {
                console.log(result);
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    },
    findEventById: (id) => {
        return new Promise((resolve, reject) => {
            EventController.findById(id, (err, response) => {
                if (err) reject(err)
                else resolve(response)
            })
        })
    },
    findEventByVendor: (data) => {
        return new Promise((resolve, reject) => {
            resolve(EventController.find({ 'createdBy.name': data }))
        })
    },
    findEvent: () => {
        return new Promise((resolve, reject) => {
            resolve(EventController.find())
        })
    }

}


module.exports = eventCtr