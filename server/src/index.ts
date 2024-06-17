import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library';
import { JwtPayload, } from 'jsonwebtoken';
import config from './config';
import { jwtHelper } from './utils/jwtHelper';

export const prisma = new PrismaClient();

interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
    userInfo: JwtPayload | null

}


const main = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({req}): Promise<Context> => {
            const userInfo = await jwtHelper.verifyToken(req.headers.authorization as string , config.jwt.secret as string);    
            return {
                prisma,
                userInfo,
            }
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}
main()