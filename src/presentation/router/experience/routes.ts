import { Router } from "express";
import { ExperienceController } from "./controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";



export class ExperienceRoutes {

    public static router(): Router {
        const controller = new ExperienceController()

        const router = Router()
        router.get('/', controller.getExperience)
        router.post('/', AuthMiddleware.validateJWT, controller.createExperience)
        router.put('/', AuthMiddleware.validateJWT, controller.updateExperience)
        router.delete('/', AuthMiddleware.validateJWT, controller.deleteExperience)

        return router
    }
}