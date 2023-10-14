const utils = require('../../Shared/utils')
const admission = require('./admissionSchema')

const findByEmail = async(email)=>{
    try {
        const file = await admission.findOne({ studentEmail:email });
        return file
      } catch (error) {
        throw new Error(error.message);
      }
};
const createAdmission = async(studentEmail, major, degree, commencement)=>{
    // Validate the user before creating the admissionFile object
    try {
        const userData = await utils.validateUser(studentEmail);
        if (userData) {
        // Find the last used admissionId and increment it by 1
        const lastAdmission = await admission.findOne().sort({ admissionId: -1 }).exec();
        let newAdmissionId = 1001;
        if (lastAdmission) {
            newAdmissionId = lastAdmission.admissionId + 1;
        }
        // User is valid, create the admissionFile object
        const newAdmission = {
            admissionId:newAdmissionId,
            studentEmail,
            major,
            degree,
            commencement
        }
        await admission.create(newAdmission)
        .then(newAdmission => {  })
        .catch(error => {
          console.error('Error creating admission file:', error);
          throw new Error(error);
        });
        // Continue with your logic using the admission object
        return newAdmission
        } else {
            throw new Error('User not found')
        }
    } catch (error) {
        console.error('User validation error:', error);
    }
};
const findAdmission = async(id)=>{
    try {
        return await admission.findOne({ admissionId:id });
      } catch (error) {
        throw new Error(error.message);
      }
};
const updateAdmission = async(id, major, degree, commencement)=>{
    try {
        // Find the admission by ID and update its properties
        const updatedAdmission = await admission.findOneAndUpdate(
          { admissionId: id },
          {
            major,
            degree,
            commencement,
          },
          { new: true } // To return the updated document
        );
    
        if (!updatedAdmission) {
          throw new Error('Admission File Not Found');
        }
        return updatedAdmission;
      } catch (error) {
        console.error('Error updating admission:', error);
        throw error;
      }
};
const deleteAdmission = async(studentEmail)=>{
    await admission.deleteOne({studentEmail:studentEmail})
}
module.exports = {
    createAdmission,
    findAdmission,
    findByEmail,
    updateAdmission,
    deleteAdmission
}