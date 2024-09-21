// Importing Express
import express from 'express';

// Importing Modules
import DraftsController from '../controller/draft.controller.js';

// Creating Router
const draftRouter = express.Router();

// Creating Objects Of The Classes
const draftsController = new DraftsController();

// All paths to the controller methods.
// Retrieve all likes for a specific post
draftRouter.get('/', draftsController.getDrafts);

// Toggle like status for a specific post
draftRouter.get('/toggle/:postId', draftsController.toggleDrafts);

// Exporting Router
export default draftRouter;