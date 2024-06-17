import { User } from "@prisma/client"
import { prisma } from ".."
import DataLoader from "dataloader"

const batchUsers = async (id: number[]): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: id
            }
        }
    })
    const userData: { [key: string]: User } = {}
    users.forEach((user) => {
        userData[user.id] = user
    })

    return id.map((id) => userData[id])
}

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);