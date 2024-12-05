import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { ExperienceRoutes } from "./experience/routes";
import { AuthRoutes } from "./auth/routes";
import { ProjectRoutes } from "./project/routes";
import { TechnologyRoutes } from "./technology/routes";

export class ServerRoutes {
    
    public static router(): Router{
        const router = Router()
        router.use('/auth', AuthRoutes.router())
        router.use('/user', UserRoutes.router())
        router.use('/experience', ExperienceRoutes.router())
        router.use('/project', ProjectRoutes.router())
        router.use('/technology', TechnologyRoutes.router())
        return router
    }
}