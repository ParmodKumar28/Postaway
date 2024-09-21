// Modules Imported
import express from 'express';
import swagger from "swagger-ui-express";
import apiDocs from './swagger.json' assert{type : 'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import { errorHandlerMiddleware } from './src/middlewares/errorHandlerMiddleware.js';
import cors from 'cors';


// Routers imported
import userRouter from './src/features/user/routes/user.routes.js';
import postRouter from './src/features/post/routes/post.routes.js';
import commentRouter from './src/features/comment/routes/comment.routes.js';
import likeRouter from './src/features/like/routes/like.routes.js';
import bookmarksRouter from './src/features/bookmarks/routes/bookmarks.routes.js';
import draftRouter from './src/features/Draft And Archive/routes/draft.routes.js';
import archiveRouter from './src/features/Draft And Archive/routes/archive.routes.js';

// Server Created
const app = express();

// Using CORS
var corsOptions = {
    origin : 'http://127.0.0.1:5500',
    allowedHeaders : '*',
}
app.use(cors(corsOptions));

// Json parser
app.use(express.json());

// Routes realted to all features
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
app.use('/api/users', userRouter);
app.use('/api/posts', jwtAuth, loggerMiddleware, postRouter);
app.use('/api/comments', jwtAuth, loggerMiddleware, commentRouter);
app.use('/api/likes', jwtAuth, loggerMiddleware, likeRouter);
// Additional features
app.use('/api/bookmarks', jwtAuth, loggerMiddleware, bookmarksRouter);
app.use('/api/drafts', jwtAuth, loggerMiddleware, draftRouter);
app.use('/api/archive',jwtAuth, loggerMiddleware, archiveRouter);

// Default Route
app.get('/',(req,res)=>{
    res.send("Welcome To The Social Media App");
});

// Error Handler
app.use(errorHandlerMiddleware);

// 404 Route
app.use((req,res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:5000/api-docs");
})

// Server Listening
app.listen('5000',()=>{
    console.log("Server is listening on localhost:5000");
});
