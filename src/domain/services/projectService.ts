import { prisma } from "../../config/db/connection"
import { CreateProjectDto } from "../dtos/projects/createProjectDto"
import { UpdateProjectDto } from "../dtos/projects/updateProjectDto"
import { CustomError } from "../errors/customError"

export class ProjectService {

    public async getAllProjects() {
        const project = await prisma.project.findMany()
        return project
    }

    public async createProject(createProjectDto: CreateProjectDto, userId: number) {
        const project = await prisma.project.create({
            data: {
                ...createProjectDto,
                user_id: userId
            }
        })
        return project
    }

    public async updateProject(updateProjectDto: UpdateProjectDto, userId: number, projectId: number) {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })
        if (!project) throw CustomError.notFound(`Project with id: ${projectId} not found`)
        if (project.user_id !== userId) throw CustomError.unauthorized('user not authorized')
        const projectUpdated = await prisma.project.update({
            where: {
                id: projectId
            },
            data: updateProjectDto
        })
        return projectUpdated
    }

    public async deleteProject(id: number) {
        const project = await prisma.project.findUnique({
            where: {
                id
            }
        })
        if (!project) throw CustomError.notFound(`Project with id: ${id} not found`)
        const projectDeleted = await prisma.project.delete({
            where: {
                id
            }
        })
        return projectDeleted
    }
}