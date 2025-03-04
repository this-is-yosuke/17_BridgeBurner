// Sample data arrays
const users = [
    'johnDoe123',
    'janeSmith456',
    'alexJohnson789',
    'emilyBrown101',
    'michaelWhite202',
];

const email = [
    'johnDoe123@gmail.com',
    'janeSmith456@gmail.com',
    'alexJohnson789@gmail.com',
    'emilyBrown101@gmail.com',
    'michaelWhite202@gmail.com',
];

const thoughts = [
    'I love coding!',
    'I love to read!',
    'I love to travel!',
    'I love to eat!',
    'I love to sleep!',
];

const friends = [
    'janeSmith456',
    'alexJohnson789',
    'emilyBrown101',
    'michaelWhite202',
];

const possibleReactions = [
    'like',
    'dislike',
    'love',
    'hate',
    'laugh',
];

// Generate a random user object
const getRandomUser = (users: any[]): { username: string, email: string, thoughts: string, friends: string } => {
    return {
        username: users[getRandomIndex(users)],
        email: email[getRandomIndex(email)],
        thoughts: thoughts[getRandomIndex(thoughts)],
        friends: friends[getRandomIndex(friends)],
    };
};

// Generate a random number of thought objects
const getRandomThought = (): { thoughtText: string, username: string, reactions: { reactionBody: string, username: string }[] }[] => {
    let results = [];
    for (let i = 0; i < thoughts.length; i++) {
        results.push({
            thoughtText: thoughts[i],
            username: users[i],
            reactions: [...getReactionTags()],
        });
    }
    return results;
};

// Generate a random number of reaction tags
const getReactionTags = (): { reactionBody: string, username: string }[] => {
    let results = [];
    for (let i = 0; i < 3; i++) {
        results.push({
            reactionBody: getRandomArrItem(possibleReactions),
            username: users[getRandomIndex(users)],
        });
    }
    return results;
};

// Generate a random index
const getRandomIndex = (arr: any[]): number => {
    return Math.floor(Math.random() * arr.length);
};

// Get a random item from an array
const getRandomArrItem = (arr: any[]): any => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// Export functions for use in other modules
export { getReactionTags, getRandomUser, getRandomThought, getRandomIndex, getRandomArrItem };