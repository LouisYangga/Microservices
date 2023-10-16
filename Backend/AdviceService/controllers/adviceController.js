const utils = require('../utils/utils');
const adviceModel = require('../models/adviceModel')
var nodemailer = require('nodemailer');

const adviceController = {

  createAdviceRequests: async(req,res)=>{
    try {
      const {studentEmail, topic} = req.body
      await utils.validateUser(studentEmail);
      const createdReq = await adviceModel.createAdviceRequest(studentEmail,topic)
      res.status(200).json(createdReq)
    } catch (error) {
      res.status(400).json({message:error.message})
    }
  },
  findByEmail: async(req,res)=>{
    try {
      const {studentEmail} = req.body;
      res.status(200).json(await adviceModel.findByEmail(studentEmail))
    } catch (error) {
      res.status(400).json({message: error.message})      
    }
  },
  getAll: async(req,res)=>{
    res.status(200).json(await adviceModel.getAll())
  },
  sendEmail:async(req,res)=>{
    const {studentEmail, message, topic} = req.body;
    try {
      await utils.validateUser(studentEmail);
      const exists = await adviceModel.findByEmail(studentEmail)
      if(!exists){
        throw new Error('There is no requests from student')
      }
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adviceprovider4@gmail.com',
          pass: 'fovv idqh mdqb mvkm'
        }
      });
      var mailOptions = {
        from: 'adviceprovider4@gmail.com',
        to: studentEmail,
        subject: `Advice From University- Topic - ${topic}`,
        text: message
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(400).json({message:error.message})
        } else {
          res.status(200).json({message:"Email Sent"})
        }
      });
      
    } catch (error) {
      res.status(400).json({message:error.message})
    }
  }
}

module.exports = adviceController;