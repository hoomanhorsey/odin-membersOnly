const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

// Import the query function from userQueries.js

const { createUserQuery } = require("../db/queries/authQueries");

function showSignUpForm(req, res) {
  res.render("signUp");
}

async function handleSignUp(req, res) {
  console.log("handlesignup function called");
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
    const { confirmedPassword, ...userData } = matchedData(req, {
      locations: ["body"],
    });

    // hashes submitted password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // async call to query that updates db with new user data.
    const result = await createUserQuery({
      ...userData,
      password: hashedPassword,
    });

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

function showJoinForm(req, res) {
  // insert logic
  res.redirect("/");
}

async function handleJoin(req, res) {
  // insert logic
  res.redirect("/");
}

function showMembershipForm(req, res) {
  res.render("membership");
}

async function handleMembershipApplication(req, res) {
  console.log("pladeholder til I put in membership logic");
  res.render("membership");
}
module.exports = {
  showLoginForm,
  showSignUpForm,
  handleSignUp,
  showJoinForm,
  handleJoin,
  showMembershipForm,
  handleMembershipApplication,
};
