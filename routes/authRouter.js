// routes/authRouter.js
const { Router } = require("express");

const passport = require("passport");

const authRouter = Router();

const authController = require("../controllers/authController");
const validation = require("../validation/authValidators");

authRouter.get("/signUp", authController.showSignUpForm);

authRouter.post(
  "/signUp",
  validation.validateUser,
  authController.handleSignUp,
);

authRouter.get("/login", authController.showLoginForm);

// this route is using passport middleware, and so it's kept in the router
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  }),
);

authRouter.get("/logout", (req, res, next) => {
  console.log("loggingout");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.get("/join", authController.handleSignUp);
authRouter.post("/join", authController.handleJoin);

// authRouter.get("/:userId", (req, res) => {
//   const { authorId } = req.params;
//   res.send(`Author ID: ${authorId}`);
// });

module.exports = authRouter;
