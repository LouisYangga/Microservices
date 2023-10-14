const mongoose = require('mongoose');

const studentDetailsSchema = new mongoose.Schema({
  email: String,
  isAdmitted: Boolean,
  enrolledSubject: [String]
});

const adviceSchema = new mongoose.Schema({
  studentEmail: String,
  studentDetails: studentDetailsSchema,
  topic: String
});

const AdviceModel = mongoose.model('Advice', adviceSchema);

module.exports = AdviceModel;