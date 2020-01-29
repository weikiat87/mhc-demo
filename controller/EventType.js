const EventTypeModel = require("../model/EventType");

// status for events (added 1 more called reject)

//Event Type Business Logic 
const EventTypeController = {
    findEventType: () => {
        return new Promise((resolve, reject) => {
            EventTypeModel.find()
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    },
    createEventType: data => {
        return new Promise((resolve, reject) => {
            EventTypeModel.create({ name: data.name })
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    },
};

module.exports = EventTypeController;
