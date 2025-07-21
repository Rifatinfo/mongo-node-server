import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

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
    getAllUsers
}