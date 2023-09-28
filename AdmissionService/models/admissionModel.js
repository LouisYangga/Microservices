const utils = require('../../Shared/utils')
class admissionFile {
    static admissionId = 1001
    constructor(studentEmail, major, degree, commencement){
        this.admissionId = admissionFile.admissionId++;
        this.studentEmail = studentEmail;
        this.major = major
        this.degree = degree
        this.commencement = commencement
    }
    // Getter and setter methods 
    getAdmissionId(){
        return this.admissionId;
    }
    getStudentEmail(){
        return this.studentEmail;
    }
    getMajor() {
        return this.major;
    }
    setMajor(newMajor) {
        this.major = newMajor;
    }
    getDegree() {
        return this.degree;
    }
    setDegree(newDegree) {
        this.degree = newDegree;
    }
    getCommencement() {
        return this.commencement;
    }

    setCommencement(newCommencement) {
        this.commencement = newCommencement;
    }
}
const file1 = new admissionFile('user1@example.com','Computer Science','Undergraduate','Spring')
var files = [file1]

module.exports = {

    createAdmission: async(studentEmail, major, degree, commencement)=>{
        // Validate the user before creating the admissionFile object
        try {
            const userData = await utils.validateUser(studentEmail);
            console.log(userData)
            if (userData) {
            // User is valid, create the admissionFile object
            const admission = new admissionFile(studentEmail, major, degree, commencement);
            files.push(admission)
            // Continue with your logic using the admission object
            console.log('Admission created:', admission);
            } else {
                throw new Error('User not found')
            }
        } catch (error) {
            console.error('User validation error:', error);
        }
    },
    findAdmission:(id)=>{
        const file = files.find((file)=> file.getAdmissionId() === parseInt(id))
        return file
    },
    findByEmail:(email)=>{
        return files.find((file)=> file.getStudentEmail() === email)
    }
    ,
    updateAdmission:async(id, major, degree, commencement)=>{
        const admission = await findAdmission(id);
        if(!admission){
            throw new Error('Admission File Not Found')
        }else{
            admission.setMajor(major)
            admission.setDegree(degree)
            admission.setCommencement(commencement)
        }
    },
    deleteAdmission:(admissionToDelete)=>{
        const updated = files.filter((file)=> file.admissionId !==admissionToDelete);
        files = updated
    } 

}