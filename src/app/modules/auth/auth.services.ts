import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../utiles/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";

const credentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const isUserExist = await User.findOne({ email })
    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exit", "");
    }
    const isPasswordMatch = await bcrypt.compare(password as string, isUserExist.password as string);
    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect Password", "");
    }
    
    // const jwtPayload = {
    //     userId : isUserExist._id,
    //     email : isUserExist.email,
    //     role : isUserExist.role
    // }
    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES);
    const userToken = createUserToken(isUserExist);
     const { password: pass, ...rest } = isUserExist.toObject();
    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
    return {
        accessToken: newAccessToken.accessToken, 
    };
}
const resetPassword = async (oldPassword: string, newPassword : string, decodedToken : JwtPayload) => {
    const user = await User.findById(decodedToken.userId);
    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user!.password as string);
    if(!isOldPasswordMatch){
      throw new AppError(StatusCodes.FORBIDDEN, "Password is not match");
    }
    user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));
    user!.save();
}

export const AuthService = {
    credentialLogin,    
    getNewAccessToken,
    resetPassword
}