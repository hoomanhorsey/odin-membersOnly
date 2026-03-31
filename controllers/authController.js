const { body, validationResult, matchedData } = require("express-validator");

// Import the query function from userQueries.js

const {
  createUserQuery,
  loginUserQuery,
} = require("../db/queries/authQueries");

function showSignUpForm(req, res) {
  res.render("signUp");
}

async function handleSignUp(req, res, next) {
  // const userData = matchedData(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("signUp", {
      title: "Create user",
      errors: errors.array(),
    });
  }

  try {
    const userData = matchedData(req, { locations: ["body"] });

    const result = await createUserQuery(userData);

    console.log("Query result:", result);

    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

function showLoginForm(req, res) {
  //   res.send("sign up form");
  res.render("login");
}

async function handleLogin(req, res) {
  console.log("loginuser called");

  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await loginUserQuery(userData);

    if (!user) {
      return res
        .status(401)
        .render("signUp", { error: "Invalid email or password" });
    }

    // Need to include login verification and then cookie shit.
    return res.redirect("/");
  } catch (err) {
    console.error(err.context || err);
    return res.status(500).render("signUp", { error: "Internal Server error" });
  }
}

async function showJoinForm(req, res) {
  // insert logic
  res.redirect("/");
}

async function handleJoin(req, res) {
  // insert logic
  res.redirect("/");
}

module.exports = {
  showLoginForm,
  handleLogin,
  showSignUpForm,
  handleSignUp,
  showJoinForm,
  handleJoin,
};
