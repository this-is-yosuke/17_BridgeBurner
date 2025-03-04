import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
    friendCount: number;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            default: []
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function() {
    return this.friends ? this.friends.length : 0;
});

userSchema.index({ username: 1, email: 1 });

const User = model('User', userSchema);

export default User;