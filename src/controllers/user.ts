import { UserRequest } from "../middlewares/auth";
import User from "../models/user";
import { Response } from "express";

export const getUserProfile = async (req: UserRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}