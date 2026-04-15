// Required Dependencies
const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
require("dotenv").config();

console.log("DATABASE_URL exists?", !!process.env.DATABASE_URL);

// Passport config set up in sep file and set up as a side effect import
const passport = require("passport");
require("./config/passport");

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Session startup
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));

// Passport initialisation
app.use(passport.initialize());
app.use(passport.session());

// Loads user from session cookie if logged in
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routers setup
const authRouter = require("./routes/authRouter");
const msgRouter = require("./routes/msgRouter");

// Route Middleware
app.get("/", (req, res) => {
  res.redirect("/messages");
});
app.use("/auth", authRouter);
app.use("/messages", msgRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Members only app. Listening on ${PORT}!`);
});
