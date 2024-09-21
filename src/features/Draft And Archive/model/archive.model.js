// Imports
import ApplicationError from "../../../errors/applicationError.js";
import PostModel from "../../post/model/post.model.js";

const archivedPosts = [];

export default class ArchiveModel {
  constructor(userId, post) {
    this.id = archivedPosts.length + 1;
    this.userId = userId;
    this.post = post;
  }

//   Getting user archives.
  static userArchivedPosts(userId) {
    const userArchivedPosts = archivedPosts.filter((archive) => archive.userId == userId);
    if (!userArchivedPosts) {
      throw new ApplicationError("User has no post in the archive", 404);
    }
    return userArchivedPosts;
  }

//   Add to archive
  static archivePost(userId, postId) {
    const post = PostModel.postById(postId);
    if (!post) {
      throw new ApplicationError("No post exists with this postId.", 404);
    }
    const newArchive = new ArchiveModel(userId, post);
    archivedPosts.push(newArchive);
    return this.userArchivedPosts(userId);
  }

//   Remove archive
  static unarchivePost(postId, userId) {
    const index = archivedPosts.findIndex(
      (archive) =>
        archive.post.postId == postId && archive.userId == userId
    );
    if (index === -1) {
      throw new ApplicationError("No post found in the archive for this postId.", 404);
    }
    const removedPost = archivedPosts.splice(index, 1);
    return removedPost;
  }
}
