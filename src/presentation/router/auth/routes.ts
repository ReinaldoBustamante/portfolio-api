import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../../../domain/services/authService";

export class AuthRoutes {

    public static router(): Router {
        const authService = new AuthService()
        const controller = new AuthController(authService)
        const router = Router()

        router.post('/register', controller.register)
        router.post('/login', controller.login)

        return router
    }
}