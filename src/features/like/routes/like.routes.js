// Importing Express
import express from 'express';
import LikeController from '../controller/like.controller.js';

// Importing Modules

// Creating Router
const likeRouter = express.Router();

// Creating Objects Of The Classes
const likesController = new LikeController();

// All paths to the controller methods.
// Retrieve all likes for a specific post
likeRouter.get('/:postId', likesController.getLikesOnAPost);

// Toggle like status for a specific post
likeRouter.get('/toggle/:postId', likesController.toggleLikeOnPost);

// Exporting Router
export default likeRouter;