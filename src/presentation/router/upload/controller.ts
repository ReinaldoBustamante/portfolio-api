import { Request, Response } from "express";
import { UploadService } from "../../../domain/services/uploadService";

export class UploadController {
    constructor(
        public uploadService: UploadService
    ){}

    public fileUpload = (req: Request, res: Response) => {
        res.json('img')
    }
}