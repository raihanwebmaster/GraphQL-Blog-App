import { PrismaClient } from "@prisma/client";

const prima = new PrismaClient();
export const Query = {
    users: async () => {
        return await prima.user.findMany()
    }
}