// routes/authRouter.js
const { Router } = require("express");

const authRouter = Router();

const authController = require("../controllers/authController");
const validation = require("../validation/authValidators");

authRouter.get("/sign-up", authController.showSignUpForm);
authRouter.post(
  "/sign-up",
  validation.validateUser,
  authController.handleSignUp,
);

authRouter.get("/login", authController.showLoginForm);
authRouter.post("/l ogin", authController.handleLogin);

authRouter.get("/join", authController.handleSignUp);
authRouter.post("/join", authController.handleJoin);

authRouter.get("/:userId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author ID: ${authorId}`);
});

module.exports = authRouter;
