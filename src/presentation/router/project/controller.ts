import { Request, Response } from 'express'
import { ProjectService } from '../../../domain/services/projectService'
import { CreateProjectDto } from '../../../domain/dtos/projects/createProjectDto'
import { CustomError } from '../../../domain/errors/customError'
import { UpdateProjectDto } from '../../../domain/dtos/projects/updateProjectDto'
import { AddTechnologyDto } from '../../../domain/dtos/projects/addTechnology'

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

    public addTechnology = async (req: Request, res: Response) => {
        const projectId = +req.params.projectId
        const [error, addTechnologyDto] = AddTechnologyDto.create(req.body)

        try {
            if (isNaN(projectId)) throw CustomError.badRequest('id must be a number')
            if (error) throw CustomError.badRequest(error)
            const resp = await this.projectService.addTech(addTechnologyDto!, projectId)
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
        const [error, updateProjectDto] = UpdateProjectDto.create(req.body)
        const projectId = +req.params.id
        try {
            if (error) throw CustomError.badRequest(error)
            if (isNaN(projectId)) throw CustomError.badRequest('id must be a number')
            const resp = await this.projectService.updateProject(updateProjectDto!, req.body.userId, projectId)
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