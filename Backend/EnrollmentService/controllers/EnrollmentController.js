const utils = require('../../Shared/utils');
const subjectModel = require('../models/EnrollmentModel')
const axios = require("axios")
const admissionController = {

  createSubject:async (req,res)=>{
    const {subjectCode, subjectName, commencement} = req.body;

    try {
      const subject = await subjectModel.createSubject(subjectCode,subjectName,commencement);
      res.status(201).json(subject)
    } catch (error) {
      res.status(400).json({ message: error.message }); // Return the custom error message
    }
  },
  findSubject:async(req,res)=>{
    const code = req.params.subjectCode;
    const subject = await subjectModel.findSubject(code)
    if(!subject){
      res.status(400).json({message:"Subject Not Found"})
    }
    res.status(200).json(subject)
  },
  getStudents:async(req,res)=>{
    const code = req.params.subjectCode;
    const subject = await subjectModel.findSubject(code)
    if(!subject){
      res.status(400).json({message:"Subject Not Found"})
    }
    const students = await subject.getStudents();
    res.status(200).json(students)
  },
  enrollStudent:async(req,res)=>{
    try {
      const {email,subjectCode} = req.body;
      const student = await utils.validateUser(email)
      if(student.isAdmitted){
        subjectModel.enrollStudent(student.email,subjectCode)
        res.status(200).json({meesage: "Student enrolled successfully"})
      }else{  
        throw new Error ("Unable to enroll student")
      }
      
    } catch (error) {
      res.status(400).json({ message: error.message }); // Return the custom error message
    }

  }

}

module.exports = admissionController;