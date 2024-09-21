// Imports
import ApplicationError from "../../../errors/applicationError.js";
import DraftsModel from "../model/draft.model.js";

export default class DraftsController{

    // Function to get all drafts
    getDrafts(req,res){
        try {
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError("User id is not received", 400);
            }
            const userDrafts = DraftsModel.userDrafts(userId);
            return res.status(200).json({ success: true, data: userDrafts});
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, data: error.message});
        }
    }

    // Toggling drafts
    toggleDrafts(req,res){
        try {
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError('User Id not received', 400);
            }
            const postId = req.params.postId;
            if(!postId)
            {
                throw new ApplicationError('Post Id not received', 400);
            }
    
            // Checking if user has already drafted the post.
            const drafts = DraftsModel.userDrafts(userId);
            const userdrafted = drafts.some(draft => draft.post.postId == postId);
    
            if(userdrafted){
                // If user has drafted then removing drafts.
                const result = DraftsModel.removeDraft(postId,userId)
                return res.status(200).json({ success: true, data: result, message: 'Post Undrafted' });
            }else{
                // If user has not drafted then adding to drafts.
                const draft = DraftsModel.saveAsDraft(userId,postId);
                return res.status(200).json({ success: true, data: draft , message: 'Post Drafted' });
            }
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }
    }
}