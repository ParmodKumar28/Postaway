// Imports
import BookmarksModel from "../model/bookmarks.model.js";

export default class BookmarksController{

    // Getting all bookmarks of a user
    getUserBookmarks(req,res){
        try {
            const userId = req.userId;
            if (!userId) {
              throw new ApplicationError("User ID is not received", 400);
            }
            const bookmarks = BookmarksModel.userBookmarks(userId);
            return res.status(200).json({ success: true, data: bookmarks});
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, data: error.message});
        }
    }

    // Toggling bookmarks
    toggleBookmarks(req,res){
        try {
            const userId = req.userId;
            const postId = req.params.id;
        
            if (!userId) {
              throw new ApplicationError("User ID is not received", 400);
            }
        
            if (!postId) {
              throw new ApplicationError("Please send a post ID.", 400);
            }
        
            // Toggle the bookmark using the PostModel method
            const bookmarks = BookmarksModel.toggle(userId, postId);
    
            return res.status(200).json({ success: true, data: bookmarks, message: "Bookmark toggled successfully" });
          } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
          }
    }
}