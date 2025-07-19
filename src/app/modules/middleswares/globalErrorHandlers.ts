import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err : any, res : Response, req : Request, next : NextFunction) => {
   const statusCode = 500;
   const message = `Something Went Wrong!!`

   res.status(statusCode).json({
    success : false,
    message,
    err,
    stack : ""
   })
}