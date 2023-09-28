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
    findByEmail: (async(req,res,next)=>{
        const {email} = req.body;
        const user = await userModel.findByEmail(email);
        if(user){
            res.status(200).json(user);
            console.log(user)
        }else{
            const error = new Error('User Not Found');
            error.status = 404; // Set the HTTP status code to 404 (Not Found)
            next(error); // Pass the error to the error handling middleware
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
      }
}

module.exports = userController;