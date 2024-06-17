import { profile } from "console"

export const Query = {
    me: async (parent: any, args: any, { prisma, userInfo }: any) => {
        const userId = userInfo.userId
        if (!userId) {
            throw new Error('You are not authenticated')
        }
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    },
    users: async (parent: any, args: any, { prisma }: any) => {
        return await prisma.user.findMany()
    },
    posts: async (parent: any, args: any, { prisma }: any) => {
        return await prisma.post.findMany({
            where: {
                published: true
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ]
        })
    },
    profile: async (parent: any, { userId }: any, { prisma }: any) => {
        return await prisma.profile.findUnique({
            where: {
                userId: Number(userId)
            }
        })
    }
}