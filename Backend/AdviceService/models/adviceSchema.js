const mongoose = require('mongoose');


const adviceSchema = new mongoose.Schema({
  id:Number,
  studentEmail: String,
  topic: String
});

const AdviceModel = mongoose.model('Advice', adviceSchema);

module.exports = AdviceModel;