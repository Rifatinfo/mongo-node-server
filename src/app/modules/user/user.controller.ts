import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import { StatusCodes } from 'http-status-codes';
import { UserServices } from "./user.services";
const createUser = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const user = await UserServices.createUser(req.body);
        res.status(StatusCodes.CREATED).json({
            message: "User Created Successfully",
            user
        })
    } catch(err : any) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: `Something Went Wrong !! ${err.message}`
        })
        next(err)
    }
}

export const UserController = {
    createUser
}