import { Router } from "express";
import { ProjectController } from "./controller";
import { ProjectService } from "../../../domain/services/projectService";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class ProjectRoutes {

    public static router(): Router {
        const projectService = new ProjectService()
        const projectController = new ProjectController(projectService)
        const router = Router();

        router.get('/', projectController.getProjects)
        router.post('/', AuthMiddleware.validateJWT, projectController.createProject)
        router.put('/:id', AuthMiddleware.validateJWT, projectController.updateProject)
        router.delete('/:id', AuthMiddleware.validateJWT, projectController.deleteProject)

        return router
    }
}