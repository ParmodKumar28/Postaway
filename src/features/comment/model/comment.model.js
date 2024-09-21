// Imports 
import ApplicationError from "../../../errors/applicationError.js";
import PostModel from "../../post/model/post.model.js";

// Comments Array
const comments = [];

export default class CommentModel{
    constructor(userId,postId,content)
    {
        this.id = comments.length+1;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    // Retrieve all comments for a specific post
    static commentsOnPost(postId)
    {
        const Post = PostModel.postById(postId);
        if(!Post)
        {
            throw new ApplicationError("No post exist by this id", 404);
        }
        const filteredcomments = comments.filter(f=>f.postId==postId);
        if(filteredcomments.length == 0)
        {
            throw new ApplicationError("No comments on this post.", 404);
        }
        return filteredcomments;
    }

    // Add a new comment to a specific post
    static addNewComment(userId,postId,content)
    {
        const Post = PostModel.postById(postId);
        if(!Post)
        {
            throw new ApplicationError("No post exist by this id", 404);
        }
        const newComment = new CommentModel(userId,postId,content);
        // Adding comment
        comments.push(newComment);
        Post.comments++;
        return newComment;
    }

    // Add a new comment to a specific post
    static delete(commentId,userId)
    {
        const postId = this.commentById(commentId).postId;
        const Post = PostModel.postById(postId);
        const commentIndex = comments.findIndex(c=>c.id==commentId);
        if(commentIndex == -1)
        {
            throw new ApplicationError("Comment not found by this id.", 404);
        }
        // Validating User
        const isAllowed = this.commentById(commentId).userId==userId;
        if(!isAllowed)
        {
            throw new ApplicationError("You are not allowed to delete this comment.", 403);
        }
        Post.comments--;
        return comments.splice(commentIndex,1);
    }

    // Update a specific comment by ID
    static update(commentId,userId,content)
    {
        const commentIndex = comments.findIndex(comment => comment.id == commentId);
        if (commentIndex == -1) {
            throw new ApplicationError("Comment not found by this id.", 404);
        }
        // Validating User
        if (comments[commentIndex].userId !== userId) {
            throw new ApplicationError("You are not allowed to update this comment.", 403);
        }
        comments[commentIndex].content = content;
        return comments[commentIndex];
    }

    // Getting comment by id
    static commentById(commentId)
    {
        const comment = comments.find(c=>c.id==commentId);
        if (!comment) {
            throw new ApplicationError("Comment not found by this id.", 404);
        }
        return comment;
    }
}