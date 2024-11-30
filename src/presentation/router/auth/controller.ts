import { Request, Response } from 'express'
import { RegisterUserDto } from '../../../domain/dtos/auth/registerDto';
import { AuthService } from '../../../domain/services/authService';
import { CustomError } from '../../../domain/errors/customError';

export class AuthController {
    constructor(
        public authService: AuthService
    ) { }

    public register = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            const user = await this.authService.registerUser(registerUserDto!)
            res.status(201).json(user)
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg })
            } else {
                console.log(error)
                res.status(500).json({error: 'Internal Server Error'})
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        const registerData = req.body;

        res.json('method not allowed')
    }
}