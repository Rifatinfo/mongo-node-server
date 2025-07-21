import { Router } from "express";
import { UserRoutes } from "../user/user.route";
import { AuthRoutes } from "../auth/auth.route";


export const router = Router();

const modulesRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes }
];

modulesRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
