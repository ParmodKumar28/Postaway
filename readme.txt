# Social Media Application Documentation

## Overview

This is the documentation for a social media application built with Node.js and Express. The application includes various features like posts, likes, comments, drafts, archives, and bookmarks. The code is organized into different modules for each feature, making it easy to understand and maintain.

## Features

### 1. Posts

Posts are the core feature of the application, allowing users to create, read, update, and delete posts. Each post has an associated ID, content, author, and other relevant data.

#### Code Organization:
- `post.model.js`: Defines the PostModel class to handle posts' data.
- `post.controller.js`: Manages the logic for creating, updating, and deleting posts.
- `post.routes.js`: Defines routes for CRUD operations on posts.
- `post.router.js`: Combines the routes and controllers into a single router.

### 2. Likes

Users can like posts, and this feature keeps track of who liked a specific post. Users can also toggle their like status on a post.

#### Code Organization:
- `like.model.js`: Defines the LikeModel class for managing likes data.
- `like.controller.js`: Contains methods for getting likes on a post and toggling like status.
- `like.routes.js`: Defines routes for handling likes.
- `like.router.js`: Combines the routes and controllers into a single router.

### 3. Comments

Users can add comments to posts and also update or delete their own comments. Comments are associated with posts and users.

#### Code Organization:
- `comment.model.js`: Defines the CommentModel class to manage comments data.
- `comment.controller.js`: Contains methods for retrieving, adding, updating, and deleting comments.
- `comment.routes.js`: Defines routes for handling comments.
- `comment.router.js`: Combines the routes and controllers into a single router.

### 4. Drafts

Users can save posts as drafts and remove them. Drafts are associated with users and posts.

#### Code Organization:
- `draft.model.js`: Defines the DraftsModel class to manage draft posts.
- `draft.controller.js`: Contains methods for retrieving and toggling drafts.
- `draft.routes.js`: Defines routes for handling drafts.
- `draft.router.js`: Combines the routes and controllers into a single router.

### 5. Archives

Users can archive and unarchive posts, and this feature is also associated with users and posts.

#### Code Organization:
- `archive.model.js`: Defines the ArchiveModel class to manage archived posts.
- `archive.controller.js`: Contains methods for retrieving and toggling archived posts.
- `archive.routes.js`: Defines routes for handling archived posts.
- `archive.router.js`: Combines the routes and controllers into a single router.

### 6. Bookmarks

Users can bookmark posts and toggle the bookmark status on posts.

#### Code Organization:
- `bookmarks.model.js`: Defines the BookmarksModel class to manage bookmarks.
- `bookmarks.controller.js`: Contains methods for retrieving and toggling bookmarks.
- `bookmarks.routes.js`: Defines routes for handling bookmarks.
- `bookmarks.router.js`: Combines the routes and controllers into a single router.

## Dependencies

The application uses several npm packages for various functionalities. Here are the primary dependencies:

- `express`: For building the web server and handling routes.
- `cors`: To enable Cross-Origin Resource Sharing for API requests.
- `winston`: A logging library for logging events and errors.
- `swagger-ui-express`: For generating and serving API documentation using Swagger.
- `jsonwebtoken`: For handling user authentication and generating tokens.
- `multer`: A middleware for handling file uploads (if needed).
- `file-system` and `fs`: For file system operations (if needed).

## Code Organization

The code is organized into modules for different features, each consisting of a model, controller, routes, and a router. This modular approach makes the codebase more maintainable and easier to understand.

- `models/`: Contains classes that define data structures for various features.
- `controller/`: Contains logic for handling various actions related to each feature.
- `routes/`: Defines routes and their corresponding HTTP methods.
- `router/`: Combines routes and controllers into routers.
- `errors/`: Contains the `ApplicationError` class for consistent error handling.
- `server.js`: The main entry point of the application that sets up the server, middleware, and routes.

## Usage

To run the application, make sure you have Node.js installed. Then, install the required dependencies using `npm install`. After that, start the server with `npm start`.

## Conclusion

This social media application provides various features for users to create, interact with, and manage posts. The modular code organization, comprehensive documentation, and consistent error handling make it easy to understand and extend the application for future enhancements.