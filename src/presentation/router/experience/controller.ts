import { Request, Response } from 'express'

export class ExperienceController {

    public getExperience = (req: Request, res: Response) => {
        res.json({ 'msg': 'getexperience method not allowed' })
    }

    public createExperience = (req: Request, res: Response) => {
        res.json({ 'msg': 'getexperience method not allowed' })
    }

    public updateExperience = (req: Request, res: Response) => {
        res.json({ 'msg': 'getexperience method not allowed' })
    }

    public deleteExperience = (req: Request, res: Response) => {
        res.json({ 'msg': 'getexperience method not allowed' })
    }
}