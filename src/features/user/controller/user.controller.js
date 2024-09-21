// Imports
import UserModel from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import ApplicationError from "../../../errors/applicationError.js";

export default class UserController{

    // User signup
    userSignUp(req,res){
        try {
            const {name,email,password} = req.body;
            // Validating user input
            if(!name || !email || !password)
            {
                throw new ApplicationError("Please provide all required inputs", 400);
            }
    
            // If already a user
            const oldUser = UserModel.getAllUsers().find(u=>u.email==email);
            if(oldUser)
            {
                throw new ApplicationError("User Already Exists, Please Login", 400);
            }
            // Adding new user
            const user = UserModel.signUp(name,email,password);
            return res.status(201).json({
                "success" : "true",
                "user" : user,
            });
        } catch (error) {
            return res.status(error.statuscode || 500).json({
                success: false,
                error: error.message,
            });
        }

    }

    // User signin
    userSignIn(req,res){
        try {
            const {email,password} = req.body;
            // Validating user input
            if(!email || !password)
            {
                throw new ApplicationError("Please provide all required inputs", 400);
            }
            // Signing In
            const result = UserModel.signIn(email,password);
            if(!result)
            {
                throw new ApplicationError("Invalid Credentials", 400);
            }
            else
            {
                // 1.Create Token
                const token = jwt.sign({userId : result.id, email : result.email},
                    'B4qgW5Cf5yFDCFoF3wleaNXoaO5Ps2xu',
                    {expiresIn : '1h'}
                    );
    
                // 2. Send Token
                return res.status(200).json({
                    "success" : "true",
                    "user" : result,
                    "token" : token,
                });
            }
        } catch (error) {
            return res.status(error.statuscode || 500).json({
                success: false,
                error: error.message,
            });
        }

    }
}