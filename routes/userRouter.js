// routes/userRouter.js
const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("All users"));
userRouter.get("/:userId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author ID: ${authorId}`);
});

module.exports = userRouter;
