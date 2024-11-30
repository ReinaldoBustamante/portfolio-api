import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {

    public static router(): Router {
        const controller = new AuthController()

        const router = Router()
        router.post('/register', controller.register)
        return router
    }
}