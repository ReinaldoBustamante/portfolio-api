import { prisma } from "../../config/db/connection";
import { CreateExperienceDto } from "../dtos/experience/createExperience.dto";
import { UpdateExperienceDto } from "../dtos/experience/updateExperience.dto.";
import { CustomError } from "../errors/customError";

export class ExperienceService {

    public async getExperience() {
        const experiences = await prisma.experience.findMany()
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