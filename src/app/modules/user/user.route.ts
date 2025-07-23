import { NextFunction, Router , Request, Response,} from "express";
import { UserController } from "./user.controller";
import { validationRequest } from "../middleswares/validationRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../middleswares/checkAuth";

const router = Router();
router.post("/register", validationRequest(createUserZodSchema), UserController.createUser);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN) , UserController.getAllUsers);
router.patch("/:id", validationRequest(updateUserZodSchema) , checkAuth(...Object.values(Role)), UserController.updateUser);
export const UserRoutes = router;