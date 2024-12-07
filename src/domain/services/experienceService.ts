import { prisma } from "../../config/db/connection";
import { CreateExperienceDto } from "../dtos/experience/createExperience.dto";
import { UpdateExperienceDto } from "../dtos/experience/updateExperience.dto.";
import { AddTechnologyDto } from "../dtos/projects/addTechnology";
import { CustomError } from "../errors/customError";

export class ExperienceService {

    public async getExperience() {
        const experiences = await prisma.experience.findMany({
            include: {
                technologies: true
            }
        })
        return experiences
    }

    public async createExperience(createExperienceDto: CreateExperienceDto, userId: number) {
        const experience = await prisma.experience.create({
            data: {
                ...createExperienceDto,
                user_id: userId
            }
        })
        return experience
    }

    public async addTech(addTechnologyDto: AddTechnologyDto, experienceId: number) {
        const experience = await prisma.experience.findUnique({
            where: { id: experienceId },
            include: { technologies: true }  // Incluye las tecnologías asociadas al proyecto
        });

        // Si la experiencia no existe
        if (!experience) {
            throw CustomError.notFound('Proyecto no encontrado');
        }

        const technologyExists = experience.technologies.some(
            (tech) => tech.id === addTechnologyDto.id
        );

        if (technologyExists) {
            throw CustomError.conflict('Esta tecnología ya está asociada a la experiencia');
        }

        const updatedExperience = await prisma.experience.update({
            where: { id: experienceId },
            include: {technologies: true},
            data: {
                technologies: {
                    connect: { id: addTechnologyDto.id }  // Conecta la tecnología al proyecto
                }
            }
        });

        return updatedExperience;
    }


    public async updateExperience(updateExperience: UpdateExperienceDto, experienceId: number, userId: number) {
        const experience = await prisma.experience.findUnique({
            where: {
                id: experienceId
            }
        })
        if (!experience) throw CustomError.notFound(`Experience with id: ${experienceId} not found`)
        if (experience.user_id !== userId) throw CustomError.unauthorized('unauthorized')

        const experienceUpdated = await prisma.experience.update({
            where: {
                id: experienceId
            },
            data: updateExperience
        })

        return experienceUpdated
    }

    public async deleteExperience(experienceId: number, userId: number) {
        const experience = await prisma.experience.findUnique({
            where: {
                id: experienceId
            }
        })
        if (!experience) throw CustomError.notFound(`Experience with id: ${experienceId} not found`)
        if (experience.user_id !== userId) throw CustomError.unauthorized('unauthorized')

        const experienceDeleted = await prisma.experience.delete({
            where: {
                id: experienceId
            }
        })
        return experienceDeleted
    }
}