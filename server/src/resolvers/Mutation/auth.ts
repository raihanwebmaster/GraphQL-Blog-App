
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";
import bcrypt from 'bcrypt';


interface User {
    name: string;
    email: string;
    password: string;
    bio?: string;
}
export const authResolvers = {
    signup: async (parent: any, args: User, { prisma }: any, info: any) => {
        const isExistingUser = await prisma.user.findFirst({
            where: {
                email: args.email
            }
        });
        if (isExistingUser) {
            return {
                userError: 'User already exists',
                token: null
            }
        }
        const hashedPassword = await bcrypt.hash(args.password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
                password: hashedPassword
            }
        })
        if (args.bio) {
            await prisma.profile.create({
                data: {
                    bio: args.bio,
                    userId: newUser.id
                }
            })
        }
        const token = await jwtHelper.generateToken({ userId: newUser.id }, config.jwt.secret as string);
        return {
            userError: null,
            token
        };
    },
    signin: async (parent: any, args: { email: string, password: string }, { prisma }: any, info: any) => {
        const user = await prisma.user.findFirst({
            where: {
                email: args.email
            }
        });
        if (!user) {
            return {
                userError: 'User not found',
                token: null
            }
        }
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
            return {
                userError: 'Invalid password',
                token: null
            }
        }
        const token = await jwtHelper.generateToken({ userId: user.id }, config.jwt.secret as string);
        return {
            userError: null,
            token
        }
    },
}