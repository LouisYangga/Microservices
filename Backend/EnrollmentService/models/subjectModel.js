const utils = require('../../Shared/utils')
const Subject = require('./subjectSchema')
const findSubject = async(subjectCode)=>{
    try {
        return await Subject.findOne({subjectCode});
      } catch (error) {
        throw new Error(error.message);
      }
};
const createSubject = async(subjectCode, subjectName, commencement)=>{
    var exists = await findSubject(subjectCode);
    try {
        if(exists){
            throw new Error('Subject exists')
        }else{
            const newSubject = {
                subjectCode,
                subjectName,
                commencement,
                students: []
            }
            await Subject.create(newSubject)
            return newSubject;
        }
    } catch (error) {
        throw new Error(error)
    }
};
const findByName = async(subjectName)=>{
    try {
        return await Subject.findOne({ subjectName});
      } catch (error) {
        throw new Error(error.message);
      }
};
const getStudents = async(subjectCode)=>{
    const subject = await findSubject(subjectCode)
    return subject.students
};
const enrollStudent = async(studentEmail, subjectCode)=>{
    var subject = await findSubject(subjectCode);
    if(!subject){
        throw new Error ("Unable to find Subject")
    }
    const students = subject.students
    const exists = students.includes(studentEmail)
    if(!exists){
        const updateCriteria = { subjectCode };
        const update = { $push: { students: studentEmail } };
        await Subject.findOneAndUpdate(updateCriteria, update, { new: true });
    }else{
        throw new Error('Student already enrolled')
    }
};
const getSubjects = async()=>{
    return await Subject.find({})
};
module.exports = {
    findSubject,
    createSubject,
    findByName,
    getStudents,
    enrollStudent,
    getSubjects
}