// routes/userRouter.js
const { Router } = require("express");

const authRouter = Router();

const authController = require("../controllers/authControllers");

authRouter.get("/sign-up", authController.signUpDisplay);
authRouter.post("/sign-up", authController.createUser);

authRouter.get("/login", authController.loginDisplay);
authRouter.post("/login", authController.loginUser);

authRouter.get("/join", (req, res) => res.send("Join membership"));
authRouter.post("/join", (req, res) => res.send("Join membership"));

authRouter.get("/", (req, res) => res.send("All users"));

authRouter.get("/:userId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author ID: ${authorId}`);
});

module.exports = authRouter;
