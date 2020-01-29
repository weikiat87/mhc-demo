const EventModel = require("../model/Event");

//Event Business Logic 
const EventController = {
  createEvent: data => {
    return new Promise((resolve, reject) => {
      EventModel.create({
        eventType: data.eventType,
        createdBy: {
          user: data.user
        },
        vendor: data.vendor,
        proposedDate: data.proposedDate,
        location: data.location
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
      EventModel.find({ "vendor": data })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  findEventByAdmin: data => {
    return new Promise((resolve, reject) => {
      EventModel.find({ "createdBy.user": data })
      .populate('eventType','name')
      .populate('vendor','username')
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
      updateData.status = 'APPROVED';
      updateData.$unset = { remark: 1 };
      // updateData.$unset = { remark: 1, proposedDate: 1 }; // if we want to remove the date as well
    } else {
      updateData.status = 'REJECTED';
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
