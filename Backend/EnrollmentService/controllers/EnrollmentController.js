const utils = require('../../Shared/utils');
const subjectModel = require('../models/subjectModel')
const axios = require('axios')
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
    }else{
      res.status(200).json(subject)
    }
  },
  getStudents:async(req,res)=>{
    const code = req.params.subjectCode;
    const subject = await subjectModel.findSubject(code)
    if(!subject){
      res.status(400).json({message:"Subject Not Found"})
    }
    const students =  subject.students;
    res.status(200).json(students)
  },
  enrollStudent:async(req,res)=>{
    try {
      const {email,subjectCode} = req.body;
      const student = await utils.validateUser(email)
      //need to check whether student is enrolled or not
      if(student.isAdmitted){
        var enrollStudent = await subjectModel.enrollStudent(student.email,subjectCode)
        const response = await axios.post('http://localhost:3000/user/addSubject', req.body);
        if(response.status === 400){
          throw new Error ("Unable to enroll student")
        }
        res.status(200).json({message: "Student enrolled successfully"})
      }else{  
        throw new Error ("Unable to enroll student")
      }
    } catch (error) {
      res.status(400).json({ message: error.message }); // Return the custom error message
    }
  },
  getSubjects:async(req,res)=>{
    const subjects = await subjectModel.getSubjects()
    res.status(200).json(subjects)
  }

}

module.exports = admissionController;