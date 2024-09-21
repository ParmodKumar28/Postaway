// Importing Express
import express from 'express';
import BookmarksController from '../controller/bookmarks.controller.js';

// Importing Modules

// Creating Router
const bookmarksRouter = express.Router();

// Creating Objects Of The Classes
const bookmarksController = new BookmarksController();

// All paths to the controller methods.
// Retrieve all likes for a specific post
bookmarksRouter.get('/', bookmarksController.getUserBookmarks);

// Toggle like status for a specific post
bookmarksRouter.get('/toggle/:id', bookmarksController.toggleBookmarks);

// Exporting Router
export default bookmarksRouter;