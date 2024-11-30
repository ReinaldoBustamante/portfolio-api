import { Request, Response } from 'express'

export class UserController {
    
    public getUser = async (req: Request, res: Response) => {
        res.json({ 'msg': 'getUser method not allowed' })
    }

}