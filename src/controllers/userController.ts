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
            userCount: await userCount(),
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
export const getUserById = async (req: Request, res: Response) => {
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
 * PUT User based on id /users/:id
 * @param object id, username
 * @returns a single User object
*/

export const updateUser = async (req: Request, res: Response) => {
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        );
        if(!user){
            res.status(404).json({message: 'No user with this ID...'});
        }
        res.json(user)
    }catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

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



/**
 * POST Friend based on /users/:userId/friends
 * @param string id
 * @param object friend
 * @returns object user 
*/

export const addFriend = async (req: Request, res: Response) => {
    console.log('You are adding a friend.');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new: true}
        );

        if(!user) {
            return res.status(404).json({message: 'No one found with that ID'});
        }
        return res.json(user);
    }catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE Friend based on /users/:userId/friends
 * @param string friendId
 * @param string userId
 * @returns object user 
*/

export const removeFriend = async (req: Request, res: Response) => {
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: {friendId: req.params.friendId}}},
            {runValidators: true, new: true}
        );
        if(!user){
            return res
                .status(404)
                .json({message: 'Could not find user with specified ID.'});
        }
        return res.json(user);
    }catch (err) {
        return res.status(500).json(err);
    }
}