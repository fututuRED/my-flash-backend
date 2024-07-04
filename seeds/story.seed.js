const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const Story = require("../models/Story.model");
const User = require("../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/my-flash-backend";

const password = "password";

const users = [
  {
    username: "Jack",
    email: "Jack@dit.com",
    password,
  },
  {
    username: "Jean",
    email: "Jean@dit.com",
    password,
  },
  {
    username: "Jess",
    email: "Jess@dit.com",
    password,
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
