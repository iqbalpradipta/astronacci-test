import { Request, Response } from "express";
import UserServices from "../Services/User";

export default new class UserController {
    async GetAllUsers(req: Request, res: Response) {
        try {
            const response = await UserServices.GetAllUsers() 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async GetUserById(req: Request, res: Response) {
        try {
            const id = req.user?.data.id

            const response = await UserServices.GetUsersById(id) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async UpdateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const data = req.body
            if(req.file?.filename) {
                data.image = req.file.filename
            }

            const response = await UserServices.UpdateUsers(id, data) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async DeleteUsers(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            
            const response = await UserServices.DeleteUsers(id) 

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}