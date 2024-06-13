import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';



export const jwtHelper = async (payload: { userId: number }, secret: Secret) => {
    const token = jwt.sign({ payload }, secret, { expiresIn: '7d' });
    return token
}