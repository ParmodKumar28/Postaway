    // Imports
    import ApplicationError from "../../../errors/applicationError.js";

    // Posts Array
    const posts = [
        {
            "userId" : 1,
            "caption": "First Posts",
            "imageUrl": "2023-11-03T12-56-39.617Z.jpg",
            "postId": 1, 
            "likes" : 0,
            "comments" : 0,
            "postDate": "Mon, 02 Nov 2023 14:44:03 GMT",
        },
        {
            "userId" : 2,
            "caption": "Kawasaki",
            "imageUrl": "2023-11-03T12-55-03.000Z.jpg",
            "postId": 2,
            "likes" : 0,
            "comments": 0,
            "postDate": "Mon, 01 Nov 2023 14:44:03 GMT"
        },
    ];

    export default class PostModel{
            constructor(userId,caption,imageUrl)
            {
                this.userId = userId;
                this.caption = caption;
                this.imageUrl = imageUrl;
                this.likes = 0;
                this.comments = 0;
                this.postDate = new Date().toUTCString();
                this.postId = posts.length+1;
            }

            // Creating a new post
            static newPost(userId,caption,imageUrl)
            {
                const newPost = new PostModel(userId,caption,imageUrl);
                // Adding new post to array
                newPost.likes = 0;
                newPost.comments = 0;
                posts.push(newPost);
                return newPost;
            }

            // Retrieving all posts
            static allPosts()
            {
                if(!posts)
                {
                    throw new ApplicationError("Oops! no posts published", 404);
                }
                return posts;
            }

            // Retrieving user posts
            static userPosts(userId)
            {
                const userPosts = posts.filter((post) => post.userId == userId);
                if (userPosts.length == 0) {
                    throw new ApplicationError("User has not posted anything.", 404);
                }
                return userPosts;
            }

            // Getting post by its Id
            static postById(postId)
            {
                const post = posts.find(p=>p.postId == postId);
                if(!post)
                {
                    throw new ApplicationError("No post exist by this id", 404);
                }
                return post;
            }

            // Updating a post
            static updatePost(postId,userId,caption,imageUrl)
            {
                const postIndex = posts.findIndex(p=>p.postId == postId);
                if(postIndex == -1)
                {
                    throw new ApplicationError("No post foundby this Id.", 404);
                }
                // Checking that is user is allowed to delete post or not
                const isAllowed = posts[postIndex].userId == userId;
                if(!isAllowed)
                {
                    throw new ApplicationError("You are not allowed to update this post", 403);
                }
                // posts[postIndex] = { ...posts[postIndex], userId, caption, imageUrl };
                const likes = posts[postIndex].likes;
                const comments = posts[postIndex].comments;
                posts[postIndex].caption = caption;
                posts[postIndex].imageUrl = imageUrl;
                posts[postIndex].likes = likes;
                posts[postIndex].comments = comments;
                return posts[postIndex];
            }

            // Delete a post
            static deletePost(userId,postId)
            {
                const postIndex = posts.findIndex(p=>p.postId == postId);
                if(postIndex == -1)
                {
                    throw new ApplicationError("No post found by this Id.", 404);
                }
                const post = posts[postIndex];
                // Checking that is user is allowed to delete post or not
                const isAllowed = posts[postIndex].userId == userId;
                if(!isAllowed)
                {
                    throw new ApplicationError("You are not allowed to delete this post", 403);
                }
                const deletedPost = posts.splice(postIndex, 1)[0];
                return deletedPost;
            }

            // Feature to filter posts based on caption
            static filter(caption)
            {
                const lowerCaption = caption.toLowerCase(); // Convert the provided caption to lowercase

                const filteredPosts = posts.filter((post) => post.caption.toLowerCase().includes(lowerCaption));
                if (filteredPosts.length === 0) {
                  throw new ApplicationError("No posts found with the provided caption.", 404);
                }
                return filteredPosts;
            }

            // Feature to sort post based on engagement
            static sortPostsByDate()
            {
                return posts.sort((a,b)=>{
                    const dateA = new Date(a.postDate);
                    const dateB = new Date(b.postDate);
                    return dateB - dateA;
                });

            }

            // Feature to sort post based on date and time
            static sortPostByEngagement()
            {
                return posts.sort((a,b)=>{
                    const engagementA = a.likes + a.comments;
                    const engagementB = b.likes + b.comments;
                    return engagementB - engagementA;
                });
            }
    }