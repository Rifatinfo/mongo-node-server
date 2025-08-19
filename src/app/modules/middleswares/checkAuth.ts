import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { verifyToken } from "../utiles/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { StatusCodes } from "http-status-codes";
import { IsActive } from "../user/user.interface";

export const checkAuth = (...authRole: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken ;
        
        if (!accessToken) {
            throw new AppError(403, "No Token Received");
        }
        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;
        const isUserExist = await User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exit");
        }
        if ((isUserExist.isActive === IsActive.BLOCKED) || (isUserExist.isActive === IsActive.INACTIVE)) {
            throw new AppError(StatusCodes.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new AppError(StatusCodes.BAD_REQUEST, `User is Deleted`);
        }
        if (!verifiedToken) {
            throw new AppError(403, `You are not authorized ${verifiedToken}`)
        }

        if (!authRole.includes(verifiedToken.role)) {
            throw new AppError(403, "You Are Not Permitted to view this route!!!");
        }
        req.user = verifiedToken;
        next();
    } catch (error) {
        next(error)
    }
}