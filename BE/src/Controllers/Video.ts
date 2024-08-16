import { Request, Response } from "express";
import VideoServices from "../Services/Video";

export default new class VideoController {
    async GetAllVideo(req: Request, res: Response) {
        try {
            const tier = req.user.data?.tier;
            const response = await VideoServices.GetAllVideo(tier) 

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async GetVideoById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)

            const response = await VideoServices.GetVideoById(id) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async CreateVideo(req: Request, res: Response) {
        try {
            const data = req.body
            

            const response = await VideoServices.CreateVideo(data) 

            res.status(200).json(response)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    async UpdateVideo(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const data = req.body

            if(req.file?.filename) {
                data.video = req.file.filename
            }

            const response = await VideoServices.UpdateVideo(id, data) 

            if(response.status == "failed") {
                res.status(400).json(response)
            } else {
                res.status(200).json(response)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async DeleteVideo(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            
            const response = await VideoServices.DeleteVideo(id) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}