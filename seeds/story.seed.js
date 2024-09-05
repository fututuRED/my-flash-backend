const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const Story = require("../models/Story.model");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/my-flash-backend";

const passwordPlain = "password";
const saltRounds = 12;

const users = [
  {
    username: "Jack",
    email: "Jack@dit.com",
    password: bcrypt.hashSync(passwordPlain, saltRounds),
  },
  {
    username: "Jean",
    email: "Jean@dit.com",
    password: bcrypt.hashSync(passwordPlain, saltRounds),
  },
  {
    username: "Jess",
    email: "Jess@dit.com",
    password: bcrypt.hashSync(passwordPlain, saltRounds),
  },
];

const myStories = [
  {
    title: "Are They Cake",
    content:
      "'Five minutes!' the PA drone calls out, winging past the nozzle tinting the fondant of Franklin’s left arm. He watches the drone zoom through the open trailer door—sees green fields, sunshine. Thinks of his allotment back home, Bolinda planting her seeds. The fabricators have him by the armpits before he slides all the way to […]",
  },
  {
    title: "The Brides, The Hunted",
    content:
      "At lunchtime, away from the watchful eyes of our teachers, the girls always want to play brides. Any rag or tear in their clothing is proudly shown off, as if they were grown up already. The boys know better than to protest about the game. Smart boys keep their mouths shut and trot around, whimpering, […]",
  },
  {
    title: "Jelly",
    content:
      "“Four cups?” I stared at the recipe on the kitchen counter. Four cups of sugar? And under no circumstances were you to mess with the four cups. It said so, in big letters. Don’t fuck with the sugar. Well, it actually said to measure carefully, but this was my first time making strawberry jelly. I […]",
  },
  {
    title: "A Life Full of Holes: A Free Short Story by Mary Papas",
    content:
      "The book that your sister gave you. Your favorite. She said she bought it. You know it was a gift from someone. She didn’t like it so she gave it to you. The purse your mother gave you. Full of chore lists. She said she forgot them there. You know she wanted you to find them.Your college diploma. Your father said it would make you happy. You The one they loved. know it would make him happy. The office job. The one you hated. The wedding dress your grandma gave you. She said she would give it to you only when you would find Mr Right. Poor sweet Grandma. He fooled you too. The photo album. Lips smiling. Eyes crying. The cemetery. Your ghost comes here every night. You can’t accept that you died without having lived.",
  },
  {
    title: "Tale Hunt",
    content: "She waited. He called. They talked. Silence. His breath caught.",
  },
  {
    title: "Spark Fiction",
    content:
      "Doorbell. Sweet intent. Lies in waiting? Hysteria. The world awaits.",
  },
  {
    title: "attempt n°3",
    content:
      "Grocery store. Mass chaos. Baby food aisle. Matriarchs duel: life.",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to database: ${MONGO_URI}`);

    // Clear existing collections
    const deletedUsers = await User.deleteMany({});
    const deletedStories = await Story.deleteMany({});
    console.log(
      `Deleted ${deletedUsers.deletedCount} users and ${deletedStories.deletedCount} stories`
    );

    // Create users
    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    // Assign random author to stories and create them
    const storiesWithAuthors = myStories.map((story) => {
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      return { ...story, author: randomUser._id };
    });

    const createdStories = await Story.create(storiesWithAuthors);
    console.log(`Created ${createdStories.length} stories`);

    // Update each user's stories array with the corresponding stories
    for (const story of createdStories) {
      await User.findByIdAndUpdate(story.author, {
        $push: { stories: story._id },
      });
    }
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

seed();
