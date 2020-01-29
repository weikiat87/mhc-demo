const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Base User
const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
}, { discriminatorKey: '_type' });

// Company HR Admin User for future use
const AdminHR = new Schema({})

// Vendor User for future use
const Vendor = new Schema({})

module.exports.User = mongoose.model('User', User);
module.exports.AdminUser = module.exports.User.discriminator('HRAdmin', AdminHR);
module.exports.VendorUser = module.exports.User.discriminator('Vendor', Vendor);
