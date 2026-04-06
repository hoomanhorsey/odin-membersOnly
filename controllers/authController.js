const { body, validationResult, matchedData } = require("express-validator");

// Import the query function from userQueries.js

const { createUserQuery } = require("../db/queries/authQueries");

function showSignUpForm(req, res) {
  res.render("signUp");
}

async function handleSignUp(req, res) {
  // const userData = matchedData(req);

  // calls validationResult, from the express-validator middleware that is called in the sequence setout in th authRouter for /post sign-up path.
  const errors = validationResult(req);

  // displays errors on signUp view if validationResult finds errors
  if (!errors.isEmpty()) {
    return res.status(400).render("signUp", {
      title: "Create user",
      errors: errors.array(),
    });
  }

  try {
    // Extracts data from fields validated by express-validator
    const userData = matchedData(req, { locations: ["body"] });

    // async call to query that updates db with new user data.
    const result = await createUserQuery(userData);

    console.log("Query result:", result);

    res.redirect("/");
  } catch (err) {
    // Unexpected error → log and show simple message
    console.error("Signup error:", err);

    res.status(500).render("signUp", {
      title: "Create user",
      errors: [{ msg: "Something went wrong. Please try again." }],
    });
  }
}

function showLoginForm(req, res) {
  //   res.send("sign up form");
  res.render("login");
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
  showSignUpForm,
  handleSignUp,
  showJoinForm,
  handleJoin,
};
