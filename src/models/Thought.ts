import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reaction: Schema.Types.ObjectId[],
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (timestamp: Date | undefined): string => timestamp ? timestamp.toISOString().split('T')[0]: ''
            // get: (timestamp: Date | undefined): string => timestamp.toISOString().split('T')[0]
            // get: (timestamp: Date): string => timestamp.toISOString().split('T')[0]
            // get: (timestamp: Date) => timestamp.toISOString().split('T')[0]
            /*
            get: function (this: IReaction, timestamp: Date | undefined): string {
                return timestamp ? timestamp.toISOString().split('T')[0] : '';
                */
        }
    },
    {
        timestamps: true,
        toJSON: {getters: true},
        toObject: {getters: true},
    }
)

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // also wants a getter method, which was never demonstrated
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reactionSchema]
        // in case the above reaction field doesn't work
        // thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
            id: true
    }
);

// Creating a virtual property "reactionCount"
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction?.length;
})

// initialize the Thought model
const Thought = model('thought', thoughtSchema);

export default Thought;