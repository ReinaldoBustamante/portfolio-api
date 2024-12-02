import { NextFunction, Response, Request } from "express";
import { CustomError } from "../../domain/errors/customError";
import { JwtAdapter } from "../../config/adapters/jwt.adapter";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";

export class AuthMiddleware {
    public static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization
        try {
            if (!authorization) throw CustomError.badRequest('no token provided')
            const [method, token] = authorization.split(' ')
            if (method !== 'Bearer') throw CustomError.badRequest('Method not valid (bearer required)')

            const payload = await JwtAdapter.decoded(token) as JwtPayload
            req.body.userId = payload.id
            next()

        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg })
            } else if (error instanceof TokenExpiredError) {
                res.status(401).json({ error: 'token Expired' })
            } else if (error instanceof JsonWebTokenError) {
                res.status(401).json({ error: 'invalid Token' })
            } else {
                console.log(error)
                res.status(500).json({ error: 'internal server error' })
            }
        }
    }
}