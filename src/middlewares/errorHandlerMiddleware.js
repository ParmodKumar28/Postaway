import ApplicationError from "../errors/applicationError.js";

export const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof ApplicationError)
    {
        res.status(err.statuscode).send(err.message);
    }
    res.status(500).send("Oops! Something went wrong... Please try again later!");
};