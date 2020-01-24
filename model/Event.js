const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
  created_date: { type: Date, required: true },
  name: { type: String, required: true },
  proposed_date: [{ type: Date, required: true }],
  location: { type: String, required: true },
  status: { type: String, required: true },
  remark: String,
  confirmed_date: Date
});

module.exports = mongoose.model("Event", Event);
