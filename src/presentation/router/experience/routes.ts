import { Router } from "express";
import { ExperienceController } from "./controller";


export class ExperienceRoutes {

    public static router(): Router {
        const controller = new ExperienceController()

        const router = Router()
        router.get('/', controller.getExperience)

        return router
    }
}