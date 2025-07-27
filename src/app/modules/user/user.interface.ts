import { Types } from "mongoose";

export interface IAuthProvider {
    provider : "google" | "credential",
    providerId : string
}
export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}
export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}
export interface IUser {
    _id? : string,
    name : string;
    email : string;
    password?: string;
    phone? : string;
    picture? : string;
    address? : string;
    isDeleted? : string;
    isActive? : IsActive;
    isVerified? : boolean;
    auths : IAuthProvider[];
    role : Role ;
    bookings? : Types.ObjectId;
    guides? : Types.ObjectId;
}