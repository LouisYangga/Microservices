const utils = require('../../Shared/utils');
const adviceModel = require('../models/adviceModel')
const axios = require('axios')
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
      const studentEmail = req.body;
      res.status(200).json(await adviceModel.findByEmail(studentEmail))
    } catch (error) {
      res.status(400).json({message: error.message})      
    }
  }
  
}

module.exports = adviceController;