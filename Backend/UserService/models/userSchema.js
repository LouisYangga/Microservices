const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmitted: Boolean,
  enrolledSubject: [String],
});

// Create a Mongoose model for the User
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model
