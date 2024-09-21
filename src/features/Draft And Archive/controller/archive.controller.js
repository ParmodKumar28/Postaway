// Imports
import ArchiveModel from "../model/archive.model.js";
import ApplicationError from "../../../errors/applicationError.js";

export default class ArchiveController {

    // Getting Archives
  getArchivedPosts(req, res) {
    try {
      const userId = req.userId;
      if (!userId) {
        throw new ApplicationError("User id is not received", 400);
      }
      const userArchivedPosts = ArchiveModel.userArchivedPosts(userId);
      return res.status(200).json({ success: true, data: userArchivedPosts });
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json({ success: false, data: error.message });
    }
  }

//   Toggling archive
  archivePost(req, res) {
    try {
      const userId = req.userId;
      if (!userId) {
        throw new ApplicationError("User Id not received", 400);
      }
      const postId = req.params.postId;
      if (!postId) {
        throw new ApplicationError("Post Id not received", 400);
      }

      const userArchivedPosts = ArchiveModel.userArchivedPosts(userId);
      const postInArchive = userArchivedPosts.some(
        (archive) => archive.post.postId == postId
      );

      if (postInArchive) {
        const result = ArchiveModel.unarchivePost(postId, userId);
        return res
          .status(200)
          .json({ success: true, data: result, message: "Post Unarchived" });
      } else {
        const addArchive = ArchiveModel.archivePost(userId, postId);
        return res
          .status(200)
          .json({ success: true, data: addArchive, message: "Post Archived" });
      }
    } catch (error) {
      return res
        .status(error.statuscode || 500)
        .json({ success: false, data: error.message });
    }
  }
}
