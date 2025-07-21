import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleswares/catchAsync";
import { sendResponse } from "../middleswares/sendResponse";
import { AuthService } from "./auth.services";
import { StatusCodes } from "http-status-codes";

const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialLogin(req.body);
   
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})

export const AuthController = {
    credentialLogin
}