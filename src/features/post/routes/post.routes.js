// Importing Express
import express from 'express';

// Importing Modules
import { upload } from '../../../middlewares/fileupload.middleware.js';
import PostController from '../controller/post.controller.js';

// Creating Router
const postRouter = express.Router();

// Creating Objects Of The Classes
const postsController = new PostController();

// All paths to the controller methods.

// Additional Tasks
// Filter posts based on the posts caption.
postRouter.get('/filter', postsController.filterPosts);

// Additional Features
// Sorting posts by the engagements
postRouter.get('/sort-by-engagement', postsController.sortByEngagement);

// Sorting posts by the date and time
postRouter.get('/sort-by-date', postsController.sortByDate);

/*--------------------------Main Features------------------------------*/ 
// Retrieve all posts
postRouter.get('/all', postsController.getAllPosts);

// Retrieve a specific post by ID
postRouter.get('/:id', postsController.getPostById);

// Retrieve posts based on user credentials
postRouter.get('/', postsController.getUserPosts);

// Create a new post (Image upload functionality included)
postRouter.post('/', upload.single('imageUrl'), postsController.createPost);

// Delete a specific post by ID
postRouter.delete('/:id', postsController.deletePost);

// Update a specific post by ID (Image upload functionality included)
postRouter.put('/:id', upload.single('imageUrl'), postsController.updatePost);



// Exporting Router
export default postRouter;