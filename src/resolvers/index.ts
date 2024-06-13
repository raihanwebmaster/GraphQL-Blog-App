import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtHelper } from "../utils/jwtHelper";
import config from "../config";

const prima = new PrismaClient();

interface User {
    name: string;
    email: string;
    password: string;
    bio?: string;
}

export const resolvers = {
    Query: {
        users: async () => {
            return await prima.user.findMany()
        }
    },
    Mutation: {
        signup: async (parent: any, args: User, context: any, info: any) => {
            const isExistingUser = await prima.user.findFirst({
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
            const newUser = await prima.user.create({
                data: {
                    name: args.name,
                    email: args.email,
                    password: hashedPassword
                }
            })
            if(args.bio) {
                await prima.profile.create({
                    data: {
                        bio: args.bio,
                        userId: newUser.id
                    }
                })
            }
            const token = await jwtHelper({ userId: newUser.id }, config.jwt.secret as string);
            return {
                userError: null,
                token
            };
        },
        signin: async (parent: any, args: { email: string, password: string }, context: any, info: any) => {
            const user = await prima.user.findFirst({
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
            const token = await jwtHelper({ userId: user.id }, config.jwt.secret as string);
            return {
                userError: null,
                token
            }
        }
    },
};