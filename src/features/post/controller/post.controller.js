// Imports
import PostModel from "../model/post.model.js";
import ApplicationError from "../../../errors/applicationError.js";

export default class PostController{
    
    // Creating new post
    createPost(req,res){
        try {
            const {caption} = req.body;
            // Fetching id from token here.
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError("User id is not received", 400);
            }
            // Validating
            if(!caption || !req.file)
            {
                throw new ApplicationError("Please add all data in the post", 400);
            }
            const imageUrl = req.file.filename;
            // Adding post
            const Post = PostModel.newPost(userId,caption,imageUrl);
            return res.status(201).json({ success: true, data: Post });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }
        
    }

    // Getting all posts
    getAllPosts(req,res){
        try {
            const posts = PostModel.allPosts();
            return res.status(200).json({ success: true, data: posts });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }
        
    }

    // Getting user posts
    getUserPosts(req,res){
        try {
            // Fetching id from token here.
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError("User id is not received", 400);
            }
            const posts = PostModel.userPosts(userId);
            return res.status(200).json({ success: true, data: posts });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

    // Getting post by its id
    getPostById(req,res){
        try {
            const postId = req.params.id;
            if(!postId)
            {
                throw new ApplicationError("Please send a post id.", 400);
            }
            const post = PostModel.postById(postId);
            return res.status(200).json({ success: true, data: post });
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

    // Update a post
    updatePost(req,res){
        try {
            const caption = req.body.caption;
            const userId = req.userId;
            if(!userId)
            {
                throw new ApplicationError("User id is not received", 400);
            }
            const postId = req.params.id;
            if(!postId)
            {
                throw new ApplicationError("Please send a post id.", 400);
            }
            // Validating
            if(!caption || !req.file)
            {
                throw new ApplicationError("Please add all data in the post", 400);
            }
            const imageUrl = req.file.filename;
            const post = PostModel.updatePost(postId,userId,caption,imageUrl);
            return res.status(200).json({ success: true, data: post, message: "Post updated successfully"});
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message });
        }

    }

    // Delete a post
    deletePost(req,res){
    try {
        const userId = req.userId;
        if(!userId)
        {
            throw new ApplicationError("User id is not received", 400);
        }
        const postId = req.params.id;
        if(!postId)
        {
            throw new ApplicationError("Please send a post id.", 400);
        }
        const result = PostModel.deletePost(userId,postId);
        return res.status(200).json({ success: true, data: result, message: "Post deleted successfully" });
    } catch (error) {
        return res.status(error.statuscode || 500).json({ success: false, error: error.message });
    }

    }

    // Filter Posts
    filterPosts(req,res){
        try {
            const caption = req.query.caption;
            if(!caption)
            {
                throw new ApplicationError("Please provide a caption for filtering.");
            }
            const filteredPosts = PostModel.filter(caption);
            return res.status(200).json({ success: true, data: filteredPosts});
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message});
        }
    }

    // Feature to sort post based on engagement
    sortByEngagement(req,res){
        try {
            const sortedPosts = PostModel.sortPostByEngagement();
            return res.status(200).json({ success: true, data: sortedPosts});
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message});
        }
    }

    // Feature to sort post based on date and time
    sortByDate(req,res){
        try {
            const sortedPosts = PostModel.sortPostsByDate();
            return res.status(200).json({ success: true, data: sortedPosts});
        } catch (error) {
            return res.status(error.statuscode || 500).json({ success: false, error: error.message});
        }
    }
}