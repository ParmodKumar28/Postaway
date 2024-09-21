// Importing Express
import express from 'express';

// Importing Modules
import UserController from '../controller/user.controller.js';

// Creating Router
const userRouter = express.Router();

// Creating Objects Of The Classes
const usersController = new UserController();

// All paths to the controller methods.
// Register a new user account
userRouter.post('/signup', usersController.userSignUp);

// Log in as a user
userRouter.post('/signin', usersController.userSignIn);

// Exporting Router
export default userRouter;