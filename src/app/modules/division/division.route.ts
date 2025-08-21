import { Router } from "express";
import { checkAuth } from "../middleswares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../middleswares/validationRequest";
import { createDivisionSchema } from "./division.validation";
import { DivisionController } from "./division.controller";
import { updateUserZodSchema } from "../user/user.validation";
import { multerUpload } from "../config/multer.config";

const router = Router();
router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), 
multerUpload.single("file"),
validationRequest(createDivisionSchema), DivisionController.createDivision);
router.patch("/:id", checkAuth(Role.ADMIN , Role.SUPER_ADMIN), validationRequest(updateUserZodSchema), DivisionController.updateDivision);
router.get("/", DivisionController.getAllDivisions);
router.get("/:slug", DivisionController.getSingleDivision);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision);

export const DivisionRoutes = router;