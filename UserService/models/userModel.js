var users = [
    {
      id: 1,
      email: 'user1@example.com',
      password: 'hashedPassword1', 
    },
    {
      id: 2,
      email: 'user2@example.com',
      password: 'hashedPassword2',
    },
  ];
  
  module.exports = {
    getAll: () =>{
      return users;
    },
    findByEmail: (email) => {
      return users.find((user) => user.email === email);
    },
    findById: (id) => {
      return users.find((user) => user.id === id);
    },
    createUser: (email, password) => {
      const newUser = {
        id: users.length + 1,
        email: email,
        password: password, // In practice, hash and salt the password here
      };
      users.push(newUser);
      return newUser;
    },
    deleteByEmail: (emailToDelete)=>{
      const updated = users.filter((user)=> user.email !== emailToDelete );
      users = updated
    }
  };