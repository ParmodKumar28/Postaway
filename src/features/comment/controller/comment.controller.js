// Imports
import CommentModel from "../model/comment.model.js";
import ApplicationError from "../../../errors/applicationError.js";

export default class CommentController{

    // Retrieving all comments on a post.
    getCommentsOnPost(req,res){
        try {
            const postId = req.params.id;
            if(!postId)
            {
                throw new ApplicationError("Please send a post id.", 400);
            }
            const comments = CommentModel.commentsOnPost(postId);
            return res.status(200).json({ success: true, data: comments });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

    // Adding new comment on a post.
    addNewComment(req,res){
        try {
            const postId = req.params.id;
            if(!postId)
            {
                throw new ApplicationError("Please send a post id.", 400);
            }
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError("User id is not received", 400);
            }
            const content = req.body.content;
            if (!content) {
                throw new ApplicationError("Please provide content for the comment.", 400);
            }
            const comment = CommentModel.addNewComment(userId,postId,content);
            return res.status(201).json({ success: true, data: comment });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

    // Deleting a comment.
    deleteComment(req,res){
        try {
            const commentId = req.params.id;
            if(!commentId)
            {
                throw new ApplicationError("Please provide comment id", 400);
            }
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError("User id is not received", 400);
            }
            const deletedComment = CommentModel.delete(commentId,userId);
            return res.status(200).json({ success: true, deletedcomment : deletedComment, message: "Comment deleted successfully" });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

    // Updating a comment.
    updateComment(req,res){
        try {
            const commentId = req.params.id;
            if(!commentId)
            {
                throw new ApplicationError("Please provide comment id", 400);
            }
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError("User id is not received", 400);
            }
            const newContent = req.body.content;
            if (!newContent) {
                throw new ApplicationError("Please provide new content for the comment.", 400);
            }
            const result = CommentModel.update(commentId,userId,newContent);
            return res.status(200).json({ success: true, data: result, message: "Comment updated successfully" });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

}