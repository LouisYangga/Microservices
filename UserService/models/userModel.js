class User {
  static nextId = 1; // Initialize the next available ID as 1
  constructor(email, password, isEnrolled) {
    this.id = User.nextId++
    this.email = email;
    this.password = password;
    this.isEnrolled = isEnrolled;
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
  isEnrolled() {
    return this.isEnrolled;
  }
  // Setter method to update the enrolled status
  setEnrolledStatus(isEnrolled) {
    this.isEnrolled = isEnrolled;
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
      const exist = await this.findByEmail(email)
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
    }
  };