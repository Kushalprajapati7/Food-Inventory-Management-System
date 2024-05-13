import jwt from 'jsonwebtoken';
import * as env from 'dotenv'

env.config();
export class JwtUtiils {
    private static secrateKey = process.env.Secrate_Key;

    static generateToken(userId:string| object):string{
        const token = jwt.sign({userId},this.secrateKey);
        return token;
    }

    static verifyToken(token:string):string | object{
        const decoded = jwt.verify(token, this.secrateKey);
        return decoded
    }
}
