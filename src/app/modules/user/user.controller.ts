import { Request, Response } from "express";
import { User } from "./user.model";
import { StatusCodes } from 'http-status-codes';
const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({
            name,
            email
        })
        res.status(StatusCodes.CREATED).json({
            message: "User Created Successfully",
            user
        })
    } catch(err : any) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: `Something Went Wrong !! ${err.message}`
        })
    }
}

export const UserController = {
    createUser
}