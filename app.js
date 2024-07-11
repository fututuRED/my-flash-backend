// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

require("./db");

const express = require("express");

const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: [process.env.FRONT_END],
  })
);

app.use(express.json());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
