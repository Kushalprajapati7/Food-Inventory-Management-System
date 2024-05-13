import { inject, injectable } from "inversify";
import e, { Request, Response,NextFunction } from "express"
import { UserService } from "../Services/UserServices";
import { controller, httpGet, httpPost, next } from "inversify-express-utils";
import { TYPES } from "../types/types";
import { validateUserMiddleware } from "../Middleware/validation";
import authMiddlware from "../Middleware/authMiddlware";
import CustomRequest from "../utils/customRequest";

@controller('/user')
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) { }

    @httpPost('/signup')
    async createUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const { username, password, email, role } = req.body;

            const newUser = await this.userService.createUser(username, password, email, role);
            // console.log(newUser);

            res.status(201).json(newUser);
        }
        catch (error: any) {
            // console.error("Error While creating user", error);
            // res.status(500).json({ message: error.message })
            next(error)
      
        }

    }

    @httpPost('/login')
    async loginUser(req: Request, res: Response, next:NextFunction): Promise<void> {
        try {
            const { username, password } = req.body;
            const token = await this.userService.loginUser(username, password);
    
            res.status(200).json({ token:token,message: "User Loggin Successfully" });

        }
        catch (error) {
            // console.error("Error While login user", error);
            // res.status(500).json({ message: error.message })
            next(error)
        }
    }


    @httpGet('/',authMiddlware)
    async allUser(req:CustomRequest, res:Response,next:NextFunction):Promise<void>{
        try {
            const alluser = await this.userService.getAllUser();
            res.status(200).json(alluser);

        } catch (error) {
            next(error)
        }
    }
}