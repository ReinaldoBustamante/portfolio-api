import { prisma } from "../../config/db/connection"
import { AddTechnologyDto } from "../dtos/projects/addTechnology"
import { CreateProjectDto } from "../dtos/projects/createProjectDto"
import { UpdateProjectDto } from "../dtos/projects/updateProjectDto"
import { CustomError } from "../errors/customError"

export class ProjectService {

    public async getAllProjects() {
        const project = await prisma.project.findMany({
            include: {
                technologies: true
            }
        })
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

    public async addTech(addTechnologyDto: AddTechnologyDto, projectId: number) {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { technologies: true }  // Incluye las tecnologías asociadas al proyecto
        });

        // Si el proyecto no existe
        if (!project) {
            throw CustomError.notFound('Proyecto no encontrado');
        }

        const technologyExists = project.technologies.some(
            (tech) => tech.id === addTechnologyDto.id
        );

        if (technologyExists) {
            throw CustomError.conflict('Esta tecnología ya está asociada al proyecto');
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            include: {technologies: true},
            data: {
                technologies: {
                    connect: { id: addTechnologyDto.id }  // Conecta la tecnología al proyecto
                }
            }
        });

        return updatedProject;
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