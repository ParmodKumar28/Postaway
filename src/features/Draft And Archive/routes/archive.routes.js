// Importing Express
import express from 'express';

// Importing Modules
import ArchiveController from '../controller/archive.controller.js';

// Creating Router
const archiveRouter = express.Router();

// Creating Objects Of The Classes
const archiveController = new ArchiveController();

// All paths to the controller methods.
// Retrieve all likes for a specific post
archiveRouter.get('/', archiveController.getArchivedPosts);

// Toggle like status for a specific post
archiveRouter.get('/toggle/:postId', archiveController.archivePost);

// Exporting Router
export default archiveRouter;