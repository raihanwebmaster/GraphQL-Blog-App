export const postResolvers = {
    addPost: async (parent: any, args: { post: { title: string, content: string } }, { prisma, userInfo }: any, info: any) => {
        const userId = userInfo?.userId;
        if (!userId) {
            return {
                userError: 'Unauthorized',
                post: null
            }
        }
        const newPost = await prisma.post.create({
            data: {
                title: args.post.title,
                content: args.post.content,
                authorId: userId
            }
        });
        return {
            userError: null,
            post: newPost
        }
    },
    updatePost: async (parent: any, args: { id: number, post: { title: string, content: string } }, { prisma, userInfo }: any, info: any) => {
        const userId = userInfo?.userId;
        if (!userId) {
            return {
                userError: 'Unauthorized',
                post: null
            }
        }
        const post = await prisma.post.findFirst({
            where: {
                id: args.id
            }
        });
        if (!post) {
            return {
                userError: 'Post not found',
                post: null
            }
        }
        if (post.authorId !== userId) {
            return {
                userError: 'Unauthorized',
                post: null
            }
        }
        const updatedPost = await prisma.post.update({
            where: {
                id: args.id
            },
            data: {
                title: args.post.title,
                content: args.post.content
            }
        });
        return {
            userError: null,
            post: updatedPost
        }
    },
}