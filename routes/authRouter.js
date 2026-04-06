// routes/authRouter.js
const { Router } = require("express");

const passport = require("passport");

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

// this is redundant cos we now have the passport middlware.
// authRouter.post("/login", authController.handleLogin);

// this route is using passport middleware
authRouter.post(
  "/login",
  // following function just to test whether the post route has been hit
  (req, res, next) => {
    console.log("POST /auth/login hit");
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  }),
);

authRouter.get("/join", authController.handleSignUp);
authRouter.post("/join", authController.handleJoin);

authRouter.get("/:userId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author ID: ${authorId}`);
});

module.exports = authRouter;
