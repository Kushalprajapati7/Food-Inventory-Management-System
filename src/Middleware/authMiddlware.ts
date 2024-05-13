import { Request, Response, NextFunction } from "express";
import CustomRequest from "../utils/customRequest";
import { JwtUtiils } from "../utils/jwtUtills";
class TokenVerifier {
    async verify(req: CustomRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(500).json({message : "Token Not Provided"});

        try {
            const decoded = JwtUtiils.verifyToken(token) as { userId: string };
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(500).json({ message : "Token Expired"});
        }
    }
}

const tokenVerifier = new TokenVerifier();
export default tokenVerifier.verify.bind(tokenVerifier);
