// Imports
import ApplicationError from "../../../errors/applicationError.js";
import PostModel from "../../post/model/post.model.js";

// Drafts Array
const drafts = [];

export default class DraftsModel{
    constructor(userId,post)
    {
        this.id = drafts.length+1;
        this.userId = userId;
        this.post = post;
    }

    // Getting all drafts
    static userDrafts(userId)
    {
        const userdrafts = drafts.filter(drafts => drafts.userId == userId);
        if(!userdrafts){
            throw new ApplicationError("User has no post in drafts", 404);
        }
        return userdrafts;
    }

    // Saving a post in draft
    static saveAsDraft(userId,postId)
    {
        const post = PostModel.postById(postId);
        if(!post)
        {
            throw new ApplicationError("No post exist on this postId.", 404);
        }
        const newDraft = new DraftsModel(userId,post);
        drafts.push(newDraft);
        return this.userDrafts(userId);
    }

    // Removing a post from draft
    static removeDraft(postId,userId){
        const index = drafts.findIndex(drafts=> drafts.post.postId==postId && drafts.userId==userId);
        if(index == -1)
        {
            throw new ApplicationError("No post exist on this postId.", 404);
        }
        const removedPost = drafts.splice(index, 1);
        return removedPost;
    }
}