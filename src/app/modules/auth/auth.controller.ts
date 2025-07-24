import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleswares/catchAsync";
import { sendResponse } from "../middleswares/sendResponse";
import { AuthService } from "./auth.services";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../utiles/setCookies";

const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialLogin(req.body);
    //  res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly : true,
    //     secure : false
    // })
    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly : true,
    //     secure : false
    // })
    setAuthCookie(res, loginInfo);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No refresh token received from cookies")
    }
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string)


    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})

export const AuthController = {
    credentialLogin,
    getNewAccessToken
}