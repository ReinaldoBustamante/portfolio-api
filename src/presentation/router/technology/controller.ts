import { Request, Response } from "express";
import { TechnologyService } from "../../../domain/services/technologyService";
import { CreateTechDto } from "../../../domain/dtos/technology/createTechDto";
import { CustomError } from "../../../domain/errors/customError";

export class TechnologyController {
    constructor(
        public technologyService: TechnologyService
    ) { }

    public getTech = async (req: Request, res: Response) => {
        try {
            const resp = await this.technologyService.getTech()
            res.json(resp)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    public createTech = async (req: Request, res: Response) => {
        const [error, createTechDto] = CreateTechDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            const resp = await this.technologyService.createTech(createTechDto!)
            res.status(201).json(resp)
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg })
            } else {
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }

    public deleteTech = async (req: Request, res: Response) => {
        const id = +req.params.id
        try {
            if (isNaN(id)) throw CustomError.badRequest('id must be a number')
            const resp = await this.technologyService.deleteTech(id)
            res.json(resp)
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.msg })
            } else {
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }
}