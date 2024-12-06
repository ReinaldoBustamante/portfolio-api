import { Request, Response } from 'express'
import { ExperienceService } from '../../../domain/services/experienceService'
import { CreateExperienceDto } from '../../../domain/dtos/experience/createExperience.dto'
import { CustomError } from '../../../domain/errors/customError'
import { UpdateExperienceDto } from '../../../domain/dtos/experience/updateExperience.dto.'
import { AddTechnologyDto } from '../../../domain/dtos/projects/addTechnology'

export class ExperienceController {
    constructor(
        public experienceService: ExperienceService
    ) { }

    public getExperience = async (req: Request, res: Response) => {
        try {
            const resp = await this.experienceService.getExperience()
            res.json(resp)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    public createExperience = async (req: Request, res: Response) => {
        const [error, createExperienceDto] = CreateExperienceDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            const resp = await this.experienceService.createExperience(createExperienceDto!, req.body.userId)
            res.status(201).json(resp)
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg });
            } else {
                console.log(error)
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }

    public addTechnology = async (req: Request, res: Response) => {
        const experienceId = +req.params.experienceId
        const [error, addTechnologyDto] = AddTechnologyDto.create(req.body)

        try {
            if (isNaN(experienceId)) throw CustomError.badRequest('id must be a number')
            if (error) throw CustomError.badRequest(error)
            const resp = await this.experienceService.addTech(addTechnologyDto!, experienceId)
            res.status(201).json(resp)
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg })
            } else {
                console.log(error)
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }

    public updateExperience = async (req: Request, res: Response) => {
        const experienceId = +req.params.id
        const [error, updateExperienceDto] = UpdateExperienceDto.create(req.body)
        try {
            if (isNaN(experienceId)) throw CustomError.badRequest('id must be a number')
            if (error) throw CustomError.badRequest(error)
            const resp = await this.experienceService.updateExperience(updateExperienceDto!, experienceId, req.body.userId)
            res.json(resp)
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg })
            } else {
                console.log(error)
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }

    public deleteExperience = async (req: Request, res: Response) => {
        const experienceId = +req.params.id
        try {
            if (isNaN(experienceId)) throw CustomError.badRequest('id must be a number')
            const resp = await this.experienceService.deleteExperience(experienceId, req.body.userId)
            res.json(resp)
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg })
            } else {
                console.log(error)
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }
}