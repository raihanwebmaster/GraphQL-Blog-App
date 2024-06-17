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
    }
}