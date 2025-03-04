import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'No thought found'
            });
        }
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({ thoughtText, username });
        res.status(201).json(newThought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}