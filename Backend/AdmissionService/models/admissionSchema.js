const mongoose = require('mongoose');

// Define the schema
const admissionSchema = new mongoose.Schema({
  admissionId: {
    type: Number,
    required: true,
    unique: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  major: {
    type: String,
  },
  degree: {
    type: String,
  },
  commencement: {
    type: String,
  },
});

// Create a Mongoose model based on the schema
const AdmissionFile = mongoose.model('AdmissionFile', admissionSchema);

module.exports = AdmissionFile;
