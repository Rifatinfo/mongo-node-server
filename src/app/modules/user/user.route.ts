import { NextFunction, Router , Request, Response,} from "express";
import { UserController } from "./user.controller";
import { validationRequest } from "../middleswares/validationRequest";
import { createUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../middleswares/checkAuth";

const router = Router();
router.post("/register", validationRequest(createUserZodSchema), UserController.createUser);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN) , UserController.getAllUsers);

export const UserRoutes = router;