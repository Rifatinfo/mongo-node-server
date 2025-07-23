import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";

const createUser = async (payload: Partial<IUser>) => {
    const { email , password, ...rest} = payload;
    const isUserExist = await User.findOne({email});

    if(isUserExist){
        throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist", "");
    }

    const hashPassword = await bcrypt.hash(password as string, 10);
    const authProvider : IAuthProvider = {
        provider : "credential" , providerId : email as string
    }
    const user = await User.create({
        email,
        password : hashPassword,
        auths : [authProvider],
        ...rest
    })
    return user;
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
     
    const isUserExist = await User.findById(userId);
    if(!isUserExist){
      throw new AppError(StatusCodes.NOT_FOUND, "User Not Found", "");
    }

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized", "");
        }

        // if (payload.role === SUPER_ADMIN && user is ADMIN) {
        //       stop it ❌
        // }
        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized", "");
        }
    }

    if(payload.isActive || payload.isDeleted || payload.isVerified){
       if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
          throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized", "");
       }
    }

    if(payload.password){
       payload.password = await bcrypt.hash(payload.password, Number( envVars.BCRYPT_SALT_ROUND))
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {new:true, runValidators : true});

    return newUpdatedUser;
}

const getAllUsers = async () => {
    const users = await User.find();
    const totalUser = await User.countDocuments();

    return {
        data: users,
        meta: {
            total: totalUser
        }
    }
}

export const UserServices = {
    createUser,
    getAllUsers,
    updateUser
}