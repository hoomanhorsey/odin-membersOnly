const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const msgRouter = require("./routes/msgRouter");

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/", msgRouter);

app.get("/", (req, res) => res.send("Hello, world!"));
app.get("/newmessage", (req, res) => res.send("newmessage"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
