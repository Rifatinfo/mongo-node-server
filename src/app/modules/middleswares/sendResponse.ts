import { Response } from "express";

interface TMeta {
   total : number
}

interface TResponse<T>{
    statusCode : number;
    success : boolean;
    message : string;
    data : T;
    meta ? : TMeta
}

export const sendResponse = <T>(res : Response, data : TResponse<T>) => {
  res.status(data.statusCode).json({
    StatusCodes : data.statusCode,
    success : data.statusCode,
    message : data.meta,
    data : data.data
  })
}