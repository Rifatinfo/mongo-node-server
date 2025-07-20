import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { UserServices } from "./user.services";
import { catchAsync } from "../middleswares/catchAsync";
import { sendResponse } from "../middleswares/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    res.status(StatusCodes.CREATED).json({
        message: "User Created Successfully",
        user
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();
    // res.status(StatusCodes.OK).json({
    //     success: true,
    //     message: "Users fetched successfully",
    //     users
    // })

    sendResponse(res , {
        success : true,
        statusCode : StatusCodes.OK,
        message : "All Users Retrieved Successfully",
        data : users.data,
        meta : users.meta
    })
})

export const UserController = {
    createUser,
    getAllUsers
}