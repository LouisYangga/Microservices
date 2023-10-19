const userModel = require("../models/userModel.js");
const userController = {

    loginUser: (async(req,res,next)=>{
        try {
            const { email, password } = req.body;
            const user = await userModel.findByEmail(email);
        
            if (user && user.password === password) {
              res.status(200).json(user);
            } else {
              res.status(404).json({message: "Invalid Credentials"});
              throw new Error('Invalid Credentials');
            }
          } catch (error) {
            // Pass the error to the error-handling middleware
            next(error);
          }
    }),
    findByEmail: (async(req,res,next)=>{
      try {
        const {email} = req.body;
        const user = await userModel.findByEmail(email);
        if(user){
            res.status(200).json(user);
        }else{
            throw new Error('User Not Found');
        }
      } catch (error) {
        res.status(404).json({message:error.message})
      }

    }),
    createUser: (async(req,res)=>{
        const{email, password} = req.body;
        const exist = await userModel.findByEmail(email);
        if(!exist){
            const user = await userModel.createUser(email,password)
            res.status(200).json(user);
        }else{
            res.status(400).json({message:"Email already Exists"})
        }
    }),
    getAllUser: (async(req,res)=>{
        res.status(200).json(await userModel.getAll())
    }),
    deleteUser: (async(req,res)=>{
        const{email} = req.body;
        await userModel.deleteByEmail(email)
        res.status(200).json({message:"User deleted"})
    }),
    setAdmittance: async (req, res) => {
        const { admittance, email } = req.body;
        if (typeof admittance !== "boolean") {
          res.status(400).json({ message: "Invalid status" });
        } else {
          try {
            await userModel.setAdmittance(email, admittance);
            res.status(200).json({ message: "Status Updated" });
          } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
          }
        }
    },
    addSubject: async (req, res) => {
      const { email, subjectCode } = req.body;
      try {
        try {
          await userModel.addSubject(subjectCode, email);
        } catch (error) {
          throw error
        }
        // If execution reaches this point, it means the enrollment was successful
        res.status(200).json(await userModel.findByEmail(email));
      } catch (error) {
        // Handle errors from the first function
        res.status(400).json({ message: error.message });
      }
    },
    removeSubject: async(req,res)=>{
      const { email } = req.body;
      try {
        await userModel.removeSubjects(email)
        res.status(200).json({message:"Subject successfully removed"})
      } catch (error) {
        res.status(400).json({message: error.message})
      }
    },
    getSubjects: async(req,res)=>{
      const {email} = req.body
      try {
        const user = await userModel.findByEmail(email);
        if(user){
          res.status(200).json({
            email:email,
            enrolledSubject: user.enrolledSubject
          });
        }else{
            throw new Error('User Not Found');
        }  
      } catch (error) {
        
      }
    }
}

module.exports = userController;