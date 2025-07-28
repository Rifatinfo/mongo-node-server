import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../../errorHelpers/AppError";
import { TErrorSources } from "../../interfaces/error.types";
import { handleDuplicateError } from "../../helpers/handleDuplicateError";

export const globalErrorHandler = (err : any, req : Request , res : Response,  next : NextFunction) => {
   let errorSources : TErrorSources[] = []
   let statusCode = 500;
   let message = "Something Went Wrong!!"
   if(err.code === 11000){
      const simplifiedError = handleDuplicateError(err);
      statusCode = simplifiedError.statusCode ?? 400
      message = simplifiedError.message;
   } else if(err instanceof AppError){
      statusCode = err.statusCode
      message = err.message
   } else if(err instanceof Error) {
      statusCode = 500;
      message = err.message
   }
   res.status(statusCode).json({
    success : false,
    message,
    err,
    stack : envVars.NODE_ENV === "development" ? err.stack : null
   })
}