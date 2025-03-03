import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

export const userCount = async () => {
    const userNumber = await User.aggregate()
        .count('userCount');
    return userNumber;
}

/**
 * GET All Users /users
 * @returns an array of Users
*/
// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try{
        const users = await User.find();
        const userObj = {
            users,
            userCount: await userCount();
        }
        res.json(userObj);
    }catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET User based on id /users/:id
 * @param string id
 * @returns a single User object
*/
// Get user by id
export const getUsersById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try{
        const user = await User.findById(userId);
        if(user) {
            res.json({
                user
            });
        }else{
            res.status(404).json({
                message: 'User not found'
            });
        }
    }catch (error: any){
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST User /users
 * @param object user
 * @returns a single User object
*/
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }catch (err) {
        res.status(500).json(err);
    }
}

/**
 * DELETE Student based on id /students/:id
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId});
        if(!user){
            return res.status(404).json({message: 'User does not exist.'})
        }

        // Delete a thought when its user is deleted
        const thought = await Thought.findOneAndDelete(
            {users: req.params.userId},
            {$pull: {users: req.params.userId}}
        );
        if(!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts were found.',
            });
        }
        return res.json({message: 'User successfully deleted!'})
    }catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}