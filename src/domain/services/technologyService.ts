import { prisma } from "../../config/db/connection";
import { CreateTechDto } from "../dtos/technology/createTechDto";
import { CustomError } from "../errors/customError";

export class TechnologyService {

    public async getTech() {
        const techs = await prisma.technology.findMany()
        return techs
    }

    public async createTech(createTechDto: CreateTechDto) {
        const tech = await prisma.technology.findUnique({
            where: {
                name: createTechDto.name
            }
        })
        if (tech) throw CustomError.conflict(`Tech with name: ${createTechDto.name} exists`)

        const techCreated = await prisma.technology.create({
            data: createTechDto
        })

        return techCreated
    }

    public async deleteTech(id: number) {
        const tech = await prisma.technology.findUnique({
            where: {
                id
            }
        })
        if (!tech) throw CustomError.notFound(`tech with id: ${id} not found`)

        const techDeleted = await prisma.technology.delete({
            where: {
                id
            }
        })

        return techDeleted
    }
}