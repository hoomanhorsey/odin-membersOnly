const express = require("express");
const app = express();

const pool = require("./db/pool");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { initializePassport } = require("./config/passport");

initializePassport(passport, pool);
app.use(passport.initialize());

const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const msgRouter = require("./routes/msgRouter");

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use("/", msgRouter);

app.get("/newmessage", (req, res) => res.send("newmessage"));

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
