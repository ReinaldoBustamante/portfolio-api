import { Router } from "express";
import { TechnologyService } from "../../../domain/services/technologyService";
import { TechnologyController } from "./controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class TechnologyRoutes {

    public static router(): Router {
        const technologyService = new TechnologyService()
        const technologyController = new TechnologyController(technologyService)

        const router = Router()

        router.get('/', technologyController.getTech)
        router.post('/', AuthMiddleware.validateJWT, technologyController.createTech)
        router.delete('/:id', AuthMiddleware.validateJWT, technologyController.deleteTech)

        return router
    }
}