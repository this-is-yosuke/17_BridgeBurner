import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getRandomIndex } from './data.js';

connection.on('error', (err) => console.error(`Connection error: ${err}`));

connection.once('open', async () => {
    console.log('Connected to the database');

    try {
        // Drop existing collections if they exist
        const userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
        if (userCheck?.length) {
            await connection.dropCollection('users');
            console.log('Dropped "users" collection');
        }

        const thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
        if (thoughtCheck?.length) {
            await connection.dropCollection('thoughts');
            console.log('Dropped "thoughts" collection');
        }

        // Generate random data
        const users = [];
        const thoughts = [];

        // Step 1: Create users
        for (let i = 0; i < 10; i++) {
            users.push({
                username: `user${i}`,
                email: `user${i}@gmail.com`,
                friends: [], // Friends will be added later
            });
        }

        // Insert users into the database
        const insertedUsers = await User.insertMany(users);

        // Step 2: Create thoughts with valid usernames
        for (let i = 0; i < 10; i++) {
            const randomUser = insertedUsers[getRandomIndex(insertedUsers)];
            thoughts.push({
                thoughtText: `Thought ${i}`,
                username: randomUser._id, 
                reactions: [], // Reactions will be added later
            });
        }

        // Insert thoughts into the database
        const insertedThoughts = await Thought.insertMany(thoughts);

        // Step 3: Add thoughts and friends to users
        for (let user of insertedUsers as any) {
            const userThoughts = insertedThoughts
                .filter((thought: any) => thought.username.toString() === user._id.toString())
                .map((thought) => thought._id);

            // Assign random friends (avoid self-referencing)
            const randomFriends = insertedUsers
                .filter((u: any) => u._id.toString() !== user._id.toString())
                .sort(() => Math.random() - 0.5)
                .slice(0, 3) // Select up to 3 friends
                .map((friend) => friend._id);

            // Update the user with thoughts and friends
            await User.findByIdAndUpdate(user._id, {
                thoughts: userThoughts,
                friends: randomFriends,
            });
        }

        console.info('Database seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error(`Error seeding the database: ${err}`);
        process.exit(1);
    }
});