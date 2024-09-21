// Imports
import ApplicationError from "../../../errors/applicationError.js";
import PostModel from "../../post/model/post.model.js";


// Bookmarks Array
const bookmarks = [];

export default class BookmarksModel{
    constructor(userId,postId)
    {
        this.id = bookmarks.length+1;
        this.userId = userId;
        this.postId = postId;
    }

    // Getting bookmarks
    static userBookmarks(userId)
    {
        const userBookmarks = bookmarks.filter(bookmark => bookmark.userId == userId);
        if(userBookmarks.length == 0)
        {
            throw new ApplicationError("User has not bookmarked any post.", 404);
        }
        return userBookmarks;
    }

    // Toggle bookmarks
    static toggle(userId,postId)
    {
        const posts = PostModel.allPosts();
        const postIndex = posts.findIndex((post) => post.postId == postId);

        if (postIndex == -1) {
          throw new ApplicationError("No post found by this ID.", 404);
        }
      
        const isBookmarked = bookmarks.some((bookmark) => bookmark.userId == userId && bookmark.postId == postId);
      
        if (isBookmarked) {
          // Remove the bookmark
          const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.userId == userId && bookmark.postId == postId);
          bookmarks.splice(bookmarkIndex, 1);
        } else {
          // Add the bookmark
          bookmarks.push({ userId, postId });
        }
        return this.userBookmarks(userId);
    }
}