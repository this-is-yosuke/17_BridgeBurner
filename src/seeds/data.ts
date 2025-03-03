const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Grace',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
  ];
  
  const thoughts = [
    'I have friends?',
    'This food sucks',
    'Watch me flex',
    'Down with the government',
    'This class is overpriced',
    'Your autograder sucks',
    'What is your sleep paralysis demon?',
    'Is toast supposed to be black?',
    'Koreans think a loaf of bread is actually a pastry',
    'Head empty',
    'Do not redeem lmao'
  ];

  const reactions = [
    'No way!',
    'lmfao',
    'fr',
    '100%',
    'I experienced that, too',
    'Can confirm that the autograder is trash',
    'That is hilarious',
    'lol',
    'no cap',
    'L',
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random full name
  const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
  
  // Function to generate random thoughts that we can add to the database.
  const getRandomThoughts = (int: number) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        published: Math.random() < 0.5,
        description: getRandomArrItem(thoughts),
        buildSuccess: Math.random() < 0.5,
      });
    }
    return results;
  };

  // Function to generate random assignments that we can add to student object.
const getRandomReactions = (int: number) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        name: getRandomArrItem(reactions),
        score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  export { getRandomName, getRandomThoughts, getRandomReactions };
  