import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { createUserToken } from "../utiles/userToken";

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

export const AuthService = {
    credentialLogin,    
}