// Required Dependencies

const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");

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
  res.locals.user = req.user;
  next();
});

// Routers setup
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const msgRouter = require("./routes/msgRouter");

// Route Middleware
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/", msgRouter);

// Example route (this can be more specific later)
// I"m not sure I even use this, query whether it's better in an router?
app.get("/newmessage", (req, res) => res.send("newmessage"));

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
