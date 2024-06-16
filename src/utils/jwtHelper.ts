import jwt, { Jwt, JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config';



export const generateToken = async (payload: { userId: number }, secret: Secret) => {
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return token
}
export const verifyToken = async (token: string, secret: Secret) => {
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return decoded;
    } catch (err) {
        return null;
    }

}

export const jwtHelper = {
    generateToken,
    verifyToken
}