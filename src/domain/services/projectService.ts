import { prisma } from "../../config/db/connection"
import { CreateProjectDto } from "../dtos/projects/createProjectDto"
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

    public async updateProject() {
        return 'update'
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