import { Request, Response } from "express";
import ArtikelServices from "../Services/Artikel";
import { ArtikelSchema } from "../utils/validation/ArtikelValidation";

export default new class ArtikelController {
    async GetAllArtikel(req: Request, res: Response) {
        try {

            const tier = req.user.data?.tier;

            const response = await ArtikelServices.GetAllArtikel(tier) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async GetArtikelById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)

            const response = await ArtikelServices.GetArtikelById(id) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async CreateArtikel(req: Request, res: Response) {
        try {
            const data = req.body
            data.image = req.file?.filename
            data.userId = req.user?.data.id
            const response = await ArtikelServices.CreateArtikel(data) 

            res.status(200).json(response)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    async UpdateArtikel(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const data = req.body
            if(req.file?.filename){
                data.image = req.file.filename
            }
            const response = await ArtikelServices.UpdateArtikel(id, data) 

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

    async DeleteArtikel(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            
            const response = await ArtikelServices.DeleteArtikel(id) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}