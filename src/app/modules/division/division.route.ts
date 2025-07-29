import { Router } from "express";
import { checkAuth } from "../middleswares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../middleswares/validationRequest";
import { createDivisionSchema } from "./division.validation";
import { DivisionController } from "./division.controller";

const router = Router();
router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validationRequest(createDivisionSchema), DivisionController.createDivision);


export const DivisionRoutes = router