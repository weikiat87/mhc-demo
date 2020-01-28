const EventModel = require("../model/Event");

// status for events (added 1 more called reject)
const status = {
  pending: "pending",
  approved: "approved",
  reject: "rejected"
};

//Event Business Logic 
const EventController = {
  createEvent: data => {
    return new Promise((resolve, reject) => {
      EventModel.create({
        eventName: data.eventName,
        createdBy: {
          name: data.name
        },
        proposedDate: data.proposedDate,
        location: data.location,
        status: status.pending
      })
        .then(result => {
          console.log(result);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  findEventById: id => {
    return new Promise((resolve, reject) => {
      EventModel.findById(id)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  findEventByVendor: data => {
    return new Promise((resolve, reject) => {
      EventModel.find({ "createdBy.name": data })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  findEvent: () => {
    return new Promise((resolve, reject) => {
      EventModel.find()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  updateEvent: (id, updateData) => {
    if (updateData.remark === undefined) {
      updateData.status = status.approved;
      updateData.$unset = { remark: 1 };
      // updateData.$unset = { remark: 1, proposedDate: 1 }; // if we want to remove the date as well
    } else {
      updateData.status = status.reject;
      updateData.$unset = { confirmDate: 1 }
      // updateData.$unset = { confirmDate: 1, proposedDate: 1 }; // if we want to remove the date as well
    }
    return new Promise((resolve, reject) => {
      EventModel.findByIdAndUpdate(id, updateData, { new: true })
        .then(result => resolve(result))
        .catch(err => {
          reject(err);
        });
    });
  }
};

module.exports = EventController;
