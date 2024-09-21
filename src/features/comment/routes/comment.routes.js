// Importing Express
import express from 'express';

// Importing Modules
import CommentController from '../controller/comment.controller.js';

// Creating Router
const commentRouter = express.Router();

// Creating Objects Of The Classes
const commentsController = new CommentController();

// All paths to the controller methods.
// Retrieve all comments for a specific post
commentRouter.get('/:id', commentsController.getCommentsOnPost);

// Add a new comment to a specific post
commentRouter.post('/:id', commentsController.addNewComment);

// Delete a specific comment by ID
commentRouter.delete('/:id', commentsController.deleteComment);

// Update a specific comment by ID
commentRouter.put('/:id', commentsController.updateComment);


// Exporting Router
export default commentRouter;