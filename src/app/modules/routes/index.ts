import { Router } from "express";
import { UserRoutes } from "../user/user.route";
import { AuthRoutes } from "../auth/auth.route";
import { DivisionRoutes } from "../division/division.route";
import { TourRoutes } from "../tour/tour.route";
import { OTPRouters } from "../otp/otp.routes";


export const router = Router();

const modulesRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/division", route: DivisionRoutes},
    {
        path: "/tour",
        route: TourRoutes
    },
    {
        path : "/otp",
        route : OTPRouters
    }
];

modulesRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
