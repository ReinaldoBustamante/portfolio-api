import { Request, Response } from 'express'
import { ProjectService } from '../../../domain/services/projectService'
import { CreateProjectDto } from '../../../domain/dtos/projects/createProjectDto'
import { CustomError } from '../../../domain/errors/customError'

export class ProjectController {

    constructor(
        public projectService: ProjectService
    ) { }

    public getProjects = async (req: Request, res: Response) => {
        try {
            const resp = await this.projectService.getAllProjects()
            res.json(resp)
        } catch (error) {
            console.log(error)
        }
    }

    public createProject = async (req: Request, res: Response) => {
        const [error, createProjectDto] = CreateProjectDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            const resp = await this.projectService.createProject(createProjectDto!, req.body.userId)
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

    public updateProject = async (req: Request, res: Response) => {
        try {
            const resp = await this.projectService.updateProject()
            res.json(resp)
        } catch (error) {
            console.log(error)
        }
    }

    public deleteProject = async (req: Request, res: Response) => {
        const id = +req.params.id
        try {
            if (isNaN(id)) throw CustomError.badRequest('id must be a number')
            const resp = await this.projectService.deleteProject(id)
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