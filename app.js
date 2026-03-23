const express = require("express");
const app = express();
app.set("view engine", "ejs");

const { body, validationResult } = require("express-validator");

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
