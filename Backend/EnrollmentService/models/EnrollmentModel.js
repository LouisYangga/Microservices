const utils = require('../../Shared/utils')
class Subject {
    constructor(subjectCode, subjectName, commencement, students){
        this.subjectCode = subjectCode;
        this.subjectName = subjectName
        this.commencement = commencement
        this.students = students
    }
    // Getter and setter methods 
    getSubjectCode(){
        return this.subjectCode
    }
    getSubjectName(){
        return this.subjectName
    }
    getCommencement(){
        return this.commencement
    }
    getStudents(){
        return this.students
    }
    setCommencement(commencement){
        this.commencement = commencement;
    }
    addStudent(studentEmail){
        this.students.push(studentEmail);
    }
}
const subject1 = new Subject('CS123','Programming','Spring',["user1@example.com","user2@example.com"])
var subjects = [subject1]

function findSubject(subjectCode){
    const subject = subjects.find((subject)=> subject.getSubjectCode() === subjectCode)
    return subject
}

module.exports = {
    findSubject,
    createSubject: async(subjectCode, subjectName, commencement)=>{
        // Validate the user before creating the admissionFile object
        var exists = await findSubject(subjectCode);
        if(exists){
            throw new Error('Subject exists')
        }else{
            subject = new Subject(subjectCode,subjectName,commencement,[])
            subjects.push(subject)
            return subject
        }
        
    },
    findByName:(subjectName)=>{
        const subject=  subjects.find((subject)=> subject.getSubjectName() === subjectName)
        return subject
    }
    ,
    getStudents:async (subjectCode)=>{
        const subject = await findSubject(subjectCode)
        return subject.getStudents()
    },
    enrollStudent:async(students)=>{
        var subject = await findSubject(subjectCode);
        subject.addStudent(students)

    }
    // updateAdmission:async(id, major, degree, commencement)=>{
    //     const admission = await findAdmission(id);
    //     if(!admission){
    //         throw new Error('Admission File Not Found')
    //     }else{
    //         admission.setMajor(major)
    //         admission.setDegree(degree)
    //         admission.setCommencement(commencement)
    //     }
    // },
    // deleteAdmission:(studentEmail)=>{
    //     const updated = files.filter((file)=> file.studentEmail !==studentEmail);
    //     console.log(updated)
    //     files = updated
    // } 

}