import { inject, injectable } from "inversify";
import { UserModel } from "../Models/User.Model";
import bcrypt from 'bcrypt'
import 'reflect-metadata'
import { IUser } from "../Interfaces/userInterface";
import { JwtUtiils } from "../utils/jwtUtills";


@injectable()
export class UserService {
    async createUser(username: string, password: string, email: string, role: string): Promise<IUser> {
        const hashPass = await bcrypt.hash(password, 10);
        // const newUser = await UserModel.create({username,password:hashPass,email,role});
        const newUser = new UserModel({ username, password: hashPass, email, role });
        await newUser.save();
        return newUser

    }

    async loginUser(username: string, password: string): Promise<string> {
        const user = await UserModel.findOne({ username: username });
        // console.log(user);
        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("Invalid password !");
        }

        const token = JwtUtiils.generateToken(user._id);

        return token

    }

    async getUserByUsername(username: string): Promise<any> {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async getAllUser():Promise<IUser[]>{
        const allUser = await UserModel.find();
        return allUser
    }
}