import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default new class UserService {
    async GetAllUsers() {
        try {
            const getData = await prisma.user.findMany()

            return {
                status: "success",
                messages: "success get all users",
                data: getData
            }
        } catch (error) {
           throw error 
        }
    }

    async GetUsersById(id: number) {
        try {
            const getData = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            if(!getData?.id) {
                return {
                    status: "failed",
                    messages: "failed get users",
                }
            } else {
                return {
                    status: "success",
                    messages: "success get users",
                    data: getData
                }
            }

        } catch (error) {
           throw error 
        }
    }

    async UpdateUsers(id: number, data: Prisma.UserUpdateInput) {
        try {
            const updateData = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    fullName: data.fullName,
                    userName: data.userName,
                    email: data.email,
                    password: data.password,
                    image: data.image,
                    tier: data.tier,
                }
            })

            if(!updateData.id) {
                return {
                    status: "failed",
                    messages: "failed update users",
                }
            } else {
                return {
                    status: "success",
                    messages: "success update users",
                    data: updateData
                }
            }

        } catch (error) {
           throw error 
        }
    }

    async DeleteUsers(id: number) {
        try {
            const usersDelete = await prisma.user.delete({
                where: {
                    id: id
                }
            })

            if(!usersDelete.id) {
                return {
                    status: "failed",
                    messages: "failed delete users",
                }
            } else {
                return {
                    status: "success",
                    messages: "success delete users",
                }
            }

        } catch (error) {
           throw error 
        }
    }
}