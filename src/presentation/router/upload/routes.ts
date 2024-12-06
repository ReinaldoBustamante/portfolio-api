import { Router } from "express";
import { UploadController } from "./controller";
import { UploadService } from "../../../domain/services/uploadService";

export class UploadRoutes {

    public static router(){
        const router = Router()

        const uploadService = new UploadService()
        const uploadController = new UploadController(uploadService)

        router.post('/', uploadController.fileUpload)

        return router
    }
}