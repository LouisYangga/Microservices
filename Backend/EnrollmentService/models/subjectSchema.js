const mongoose = require('mongoose');

// Define the schema for the "Subject" model
const subjectSchema = new mongoose.Schema({
  subjectCode: String,
  subjectName: String,
  commencement: String,
  students: [String], // An array of student emails
});

// Create the "Subject" model using the schema
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;