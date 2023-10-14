const utils = require('../../Shared/utils')
const Advice = require('./adviceSchema')

const findByEmail = async(studentEmail)=>{
    const result = await Advice.findOne({studentEmail})
    console.log(result)
    return result
}
const createAdviceRequest = async(studentEmail, topic)=>{
    const exists = await findByEmail(studentEmail)
    if(exists){
        throw new Error(`Student with email ${studentEmail} has existing request`)
    }
    const lastID = await Advice.findOne().sort({ id: -1 }).exec();
    let newID = 1001;
    if (lastID) {
        newID = lastID.id + 1;
    }
    const newRequest = {
        id:newID,
        studentEmail,
        topic
    }
    await Advice.create(newRequest)
    return newRequest
};
const deleteRequest = async(studentEmail)=>{
    await Advice.deleteOne({studentEmail})
}
const getAll = async()=>{
    return await Advice.find({})
}
module.exports = {
    findByEmail,
    createAdviceRequest,
    deleteRequest,
    getAll
}