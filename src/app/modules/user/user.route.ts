import { Router } from "express";
import { UserController } from "./user.controller";
import { validationRequest } from "../middleswares/validationRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router();
router.post("/register", validationRequest(createUserZodSchema), UserController.createUser);
router.get("/all-users", UserController.getAllUsers);

export const UserRoutes = router;