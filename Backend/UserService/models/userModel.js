class User {
  static nextId = 1; // Initialize the next available ID as 1
  constructor(email, password, isAdmitted) {
    this.id = User.nextId++
    this.email = email;
    this.password = password;
    this.isAdmitted = isAdmitted;
    this.enrolledSubject = [];
  }
  // Getter method to retrieve user's ID
  getId() {
    return this.id;
  }
  // Getter method to retrieve user's email
  getEmail() {
    return this.email;
  }
  // Getter method to retrieve user's password
  getPassword() {
    return this.password;
  }
  // Getter method to check if the user is enrolled
  isAdmitted() {
    return this.isAdmitted;
  }
  setAdmittance(status){
    this.isAdmitted = status
  }
  // Setter method to update the enrolled status
  setEnrolledStatus(isAdmitted) {
    this.isAdmitted = isAdmitted;
  }
  addSubject(subjectCode){
    this.enrolledSubject.push(subjectCode)
  }
  getSubjects(){
    return this.enrolledSubject
  }
  updateSubject(subjectList){
    this.enrolledSubject = subjectList
  }
}
const user1 = new User('user1@example.com', 'hashedPassword1', true);
const user2 = new User('user2@example.com', 'hashedPassword2', false);
var users = [user1,user2];

function findById(id){
  return users.find((user) => user.id === id);
}
function findByEmail(email){
  return users.find((user) => user.getEmail() === email);
}
function subjectEnrolled(email, subjectCode){
  const user = findByEmail(email)
  subjects = user.getSubjects()
  if(subjects.includes(subjectCode)){
    return true
  }else{
    return false
  }
  
}
  module.exports = {
    getAll: () =>{
      return users;
    },
    findByEmail,
    findById,
    createUser: async(email, password) => {
      const exist = await findByEmail(email)
      if(exist){
        throw new Error('User exists');
      }
      const newUser = new User(email,password,false) //not enrolled as default
      users.push(newUser);
      return newUser;
    },
    deleteByEmail: (emailToDelete)=>{
      const updated = users.filter((user)=> user.email !== emailToDelete );
      users = updated
    },
    setAdmittance: async(email, admittance) => {
      const user = await findByEmail(email)
      if (user) {
        user.setAdmittance(admittance);
        // Also update the users array to reflect the change
        user.isAdmitted = admittance;
      } else {
        throw new Error('User not found');
      }
    },
    addSubject: async (subjectCode,email)=>{
      const user = await findByEmail(email)
      if(user){
        if(await subjectEnrolled(email,subjectCode)===true){
          throw new Error ("Already Enrolled")
        }else{
          await user.addSubject(subjectCode);
        }
      }else{
         throw new Error("Student Not Found")
      }
    },
    removeSubjects: async(email)=>{
      const user = await findByEmail(email)
      if(user){
        await user.updateSubject([])
      }else{
         throw new Error("Student Not Found")
      }
    }
  };