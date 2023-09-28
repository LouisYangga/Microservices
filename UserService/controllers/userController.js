const userModel = require("../models/userModel");

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
    findByEmail: (async(req,res)=>{
        const {email} = req.body;
        const user = await userModel.findByEmail(email);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(400).json({message:"User Not Found"})
        }
    }),
    createUser: (async(req,res)=>{
        const{email, password} = req.body;
        const exist = await userModel.findByEmail(email);
        if(!exist){
            const user = userModel.createUser(email,password)
            res.status(200).json(user);
        }else{
            res.status(400).json({message:"Email already Exists"})
        }
    }),
    getAllUser: (async(req,res)=>{
        res.status(200).json(userModel.getAll())
    }),
    deleteUser: (async(req,res)=>{
        const{email} = req.body;
        await userModel.deleteByEmail(email)
        res.status(200).json({message:"User deleted"})
    })
}

module.exports = userController;