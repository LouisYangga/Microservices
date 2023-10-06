const utils = require('../../Shared/utils')
const admissionModel = require('../models/EnrollmentModel')
const admissionController = {

    createAdmission: async (req, res) => {
        try {
          const { studentEmail, major, degree, commencement } = req.body;
      
          // Validate user and check if admission exists
          await utils.validateUser(studentEmail);
          const admitted = await admissionModel.findByEmail(studentEmail);
      
          if (admitted) {
            throw new Error('Admission already exists');
          }
      
          // Create admission
          const admission = await admissionModel.createAdmission(
            studentEmail,
            major,
            degree,
            commencement
          );
          console.log('Admission created:', admission);
          await utils.setUserAdmittance(studentEmail,true)
          res.status(201).json(admission); // Use 201 status for resource creation
        } catch (error) {
          console.error('Error creating admission:', error);
          res.status(400).json({ message: error.message }); // Return the custom error message
        }
      },
    findById: async (req,res)=>{
        const id = req.params.id
        const admission = await admissionModel.findAdmission(id)
        if(admission){
            res.status(200).json(admission)
        }else{
            res.status(400).json({message: 'Admission not found'})
        }

    },
    findByEmail: async(req,res)=>{
      const email = req.body.email; 
      const admission = await admissionModel.findByEmail(email)
      if(admission){
        res.status(200).json(admission)
      }else{
          res.status(400).json({message: 'Admission not found'})
      }
    },
    deleteAdmission: async (req, res)=>{
        const {email} = req.body;
        admissionModel.deleteAdmission(email)
        await utils.setUserAdmittance(email,false)
        res.status(200).json({message: 'Admission deleted'})
    }
}

module.exports = admissionController;