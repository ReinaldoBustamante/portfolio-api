import { Request, Response } from 'express'

export class AuthController {
    
    public register = async (req: Request, res: Response) => {
        
        res.json({ 'msg': 'register method not allowed' })
    }
}