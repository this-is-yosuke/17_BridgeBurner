import { Schema, model, Document, ObjectId } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: ObjectId[];
    reactions: typeof Reaction[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [
            {
            type: Schema.Types.ObjectId,
            required: true,
            }
        ],
        reactions: [Reaction],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;