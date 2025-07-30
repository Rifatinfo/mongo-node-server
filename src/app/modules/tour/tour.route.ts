import { checkAuth } from "../middleswares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../middleswares/validationRequest";
import { createTourTypeZodSchema, createTourZodSchema } from "./tour.validation";
import { TourController } from "./tour.controller";
import express from "express";

const router = express.Router();

/**Tour Types */
router.post(
    "/create-tour-type",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validationRequest(createTourTypeZodSchema),
    TourController.createTourType
);
 /** Tour  */
router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validationRequest(createTourZodSchema),
    TourController.createTour
);
router.get("/", TourController.getAllTours);

export const TourRoutes = router;