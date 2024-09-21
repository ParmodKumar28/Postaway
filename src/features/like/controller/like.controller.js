//  Imports
import LikeModel from "../model/like.model.js";
import ApplicationError from "../../../errors/applicationError.js";

export default class LikeController{

    // Retrieving likes on a specific post
    getLikesOnAPost(req,res){
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
    
            const likes = LikeModel.likesOnPost(postId);
            return res.status(200).json({ success: true, data: likes });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

    // Toggle like status for a specific post
    toggleLikeOnPost(req,res){
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
    
            // Checking if user has already liked the post.
            const likes = LikeModel.likesOnPost(postId,userId);
            const userHasLiked = likes.some(like=>like.userId==userId);
    
            if(userHasLiked){
                // If user has liked then removing like.
                const result = LikeModel.delete(postId,userId);
                return res.status(200).json({ success: true, data: result, message: 'Post Unliked' });
            }else{
                // If user has not liked then adding new like.
                const newLike = LikeModel.add(postId,userId);
                return res.status(200).json({ success: true, data: newLike, message: 'Post Liked' });
            }
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }
}