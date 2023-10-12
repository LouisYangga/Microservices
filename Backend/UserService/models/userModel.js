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
}
const user1 = new User('user1@example.com', 'hashedPassword1', true);
const user2 = new User('user2@example.com', 'hashedPassword2', false);
var users = [user1,user2];
  
  module.exports = {
    getAll: () =>{
      return users;
    },
    findByEmail: (email) => {
      return users.find((user) => user.getEmail() === email);
    },
    findById: (id) => {
      return users.find((user) => user.id === id);
    },
    createUser: async(email, password) => {
      const exist = await users.find((user) => user.getEmail() === email);
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
    setAdmittance: (email, admittance) => {
      const user = users.find((user) => user.getEmail() === email);
      if (user) {
        user.setAdmittance(admittance);
        // Also update the users array to reflect the change
        user.isAdmitted = admittance;
      } else {
        throw new Error('User not found');
      }
    }
  };