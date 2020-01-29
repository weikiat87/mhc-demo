const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
  // hr admin create event
  createdBy: {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: Date.now }
  },
  // hr admin appoints vendor 
  vendor:{type: Schema.Types.ObjectId, ref: 'User'},
  // the event type
  eventType: {
    type: Schema.Types.ObjectId,
    ref: 'EventType',
    required: true
  },
  proposedDate: [{ type: Date, required: true }],
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
    required: true
  },
  remark: String,
  confirmDate: Date
});

module.exports = mongoose.model("Event", Event);
