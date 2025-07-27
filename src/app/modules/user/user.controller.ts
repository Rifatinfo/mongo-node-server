import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { UserServices } from "./user.services";
import { catchAsync } from "../middleswares/catchAsync";
import { sendResponse } from "../middleswares/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res , {
        success : true,
        statusCode : StatusCodes.CREATED,
        message : "User Created Successfully",
        data : user
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Update Successfully",
        data: user
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();
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
    getAllUsers,
    updateUser
}