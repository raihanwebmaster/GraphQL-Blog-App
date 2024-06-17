export const User = {
    posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
        const isMyProile = parent.id === userInfo.userId
        if (isMyProile) {
            return await prisma.post.findMany({
                where: {
                    authorId: parent.id
                }
            })
        } else {
            return await prisma.post.findMany({
                where: {
                    authorId: parent.id,
                    published: true
                }
            })
        }

    }
}