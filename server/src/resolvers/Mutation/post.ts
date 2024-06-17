import { checkUserAccess } from "../../utils/checkUserAccess";

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
        const error = await checkUserAccess(prisma, userId, args.id);
        if (error) {
            return error;
        }
        const updatedPost = await prisma.post.update({
            where: {
                id: Number(args.id)
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
    deletePost: async (parent: any, args: { id: number }, { prisma, userInfo }: any, info: any) => {
        const userId = userInfo?.userId;
        if (!userId) {
            return {
                userError: 'Unauthorized',
                post: null
            }
        }
        const error = await checkUserAccess(prisma, userId, args.id);
        if (error) {
            return error;
        }
        const post  = await prisma.post.delete({
            where: {
                id: Number(args.id)
            }
        });
        return {
            userError: null,
            post: post
        }
    },
    publishPost: async (parent: any, args: { id: number }, { prisma, userInfo }: any, info: any) => {
        const userId = userInfo?.userId;
        if (!userId) {
            return {
                userError: 'Unauthorized',
                post: null
            }
        }
        const error = await checkUserAccess(prisma, userId, args.id);
        if (error) {
            return error;
        }
        const post = await prisma.post.update({
            where: {
                id: Number(args.id)
            },
            data: {
                published: true
            }
        });
        return {
            userError: null,
            post: post
        }
    }
}