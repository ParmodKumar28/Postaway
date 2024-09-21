// Imports
import PostModel from '../../post/model/post.model.js'
import ApplicationError from '../../../errors/applicationError.js';
// Likes Arrays
const likes = [];

export default class LikeModel{
    constructor(postId,userId)
    {
        this.id = likes.length+1;
        this.postId = postId;
        this.userId = userId;
    }

    // get all likes on a specific post.
    static likesOnPost(postId)
    {
        const post = PostModel.postById(postId);
        if(!post)
        {
            throw new ApplicationError('No post exists with the given postId.', 404);
        }
        const postLikes = likes.filter(l=>l.postId==postId);
        return postLikes;
    }

    // Adding a comment on a post
    static add(postId,userId)
    {
        const post = PostModel.postById(postId);
        if(!post)
        {
            throw new ApplicationError('No post exists with the given postId.', 404);
        }
        const newLike = new LikeModel(postId,userId);
        likes.push(newLike);
        post.likes++;
        return newLike;
    }

    // Deleting a commet on a post
    static delete(postId,userId)
    {
        const post = PostModel.postById(postId);
        const likeIndex = likes.findIndex(l=>l.postId==postId && l.userId==userId);
        if(likeIndex == -1)
        {
            throw new ApplicationError('No likes on this post from this user.', 404);
        }
        post.likes--;
        return likes.splice(likeIndex,1);
    }
}