const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['DRIVER', 'COURIER', 'RESTAURANT', 'STORE', 'FLEET_OWNER', 'BOLT_BUSINESS'], required: true },
  name: { type: String, required: true },
  phone: { type: String },
  licenseDetails: { type: String }, // For Driver
  vehicleType: { type: String }, // For Courier
  businessName: { type: String }, // For Restaurant/Store/Bolt Business
  fleetDetails: { type: String }, // For Fleet Owner
  otp: { type: String }, // For OTP-based password reset
  otpExpires: { type: Date }, // For OTP expiration
});



const User = mongoose.model('User', UserSchema);
module.exports = User;