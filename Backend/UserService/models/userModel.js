const User = require('./userSchema')
const findByEmail = async (email) => {
  try {
    return await User.findOne({ email:email });
  } catch (error) {
    throw new Error(error.message);
  }
};
const subjectEnrolled = (email, subjectCode) => {
  const user = findByEmail(email);
  if (Array.isArray(user.enrolledSubject)) {
    if (user.enrolledSubject.includes(subjectCode)) {
      return true;
    }
  }
  return false;
};
const createUser= async(email, password) => {
  const exist = await findByEmail(email)
  if(exist){
    throw new Error('User exists');
  }
  const newUser = {
    email,
    password,
    isAdmitted: false,
    enrolledSubject: [],
  };
  User.create(newUser)
  .then(newUser => {  })
  .catch(error => {
    console.error('Error creating user:', error);
    throw new Error(error);
  });
  return newUser
};
const deleteByEmail = async(emailToDelete)=>{
  await User.deleteOne({ email: emailToDelete });
};
const setAdmittance= async(email, admittance) => {
  const user = await findByEmail(email)
  if (user) {
    await User.updateOne({email},{
      isAdmitted: admittance
    })
  } else {
    throw new Error('User not found');
  }
};
const addSubject= async (subjectCode,email)=>{
  const user = await findByEmail(email)
  if(user){
    if(await subjectEnrolled(email,subjectCode)===true){
      throw new Error ("Already Enrolled")
    }else{
      const updateCriteria = { email };
      const update = { $push: { enrolledSubject: subjectCode } };
      await User.findOneAndUpdate(updateCriteria, update, { new: true });
    }
  }else{
     throw new Error("Student Not Found")
  }
};
const removeSubjects= async(email)=>{
  const user = await findByEmail(email)
  if(user){
      const update = {
        $set: { enrolledSubject: [] }, 
      };
      await User.updateOne({ email: email }, update);
  }else{
     throw new Error("Student Not Found")
  }
};
const getAll = async()=>{
  const users = await User.find({})
  return users
};
  module.exports = {
    getAll,
    findByEmail,
    createUser,
    deleteByEmail,
    setAdmittance,
    addSubject,
    removeSubjects
  };