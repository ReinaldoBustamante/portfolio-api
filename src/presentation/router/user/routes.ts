import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {

    public static router(): Router {
        const controller = new UserController()

        const router = Router()
        router.get('/', controller.getUser)
        return router
    }
}