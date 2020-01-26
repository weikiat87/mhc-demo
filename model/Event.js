const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
  createdBy: {
    name: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now }
  },
  eventName: { type: String, required: true },
  proposedDate: [{ type: Date, required: true }],
  location: { type: String, required: true },
  status: { type: String, required: true },
  remark: String,
  confirmDate: Date
});

module.exports = mongoose.model("Event", Event);
