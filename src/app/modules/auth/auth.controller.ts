import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleswares/catchAsync";
import { sendResponse } from "../middleswares/sendResponse";
import { AuthService } from "./auth.services";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../utiles/setCookies";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../utiles/userToken";
import { envVars } from "../config/env";

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
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken" , {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
     })
     res.clearCookie("refreshToken" , {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
     })
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User Logout Successfully",
        data: null,
    })
})
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    await AuthService.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload); 
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Password Change Successfully",
        data: null,
    })
})
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? req.query.state as string : "";
    if(redirectTo.startsWith("/")){
       redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }
    const tokenInfo = createUserToken(user);
    setAuthCookie(res, tokenInfo);
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})

export const AuthController = {
    credentialLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}