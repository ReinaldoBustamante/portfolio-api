import { Router } from "express";
import { ExperienceController } from "./controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { ExperienceService } from "../../../domain/services/experienceService";



export class ExperienceRoutes {

    public static router(): Router {
        const experienceService = new ExperienceService() 
        const controller = new ExperienceController(experienceService)

        const router = Router()
        router.get('/', controller.getExperience)
        router.post('/', AuthMiddleware.validateJWT, controller.createExperience)
        router.put('/:id', AuthMiddleware.validateJWT, controller.updateExperience)
        router.delete('/:id', AuthMiddleware.validateJWT, controller.deleteExperience)

        return router
    }
}