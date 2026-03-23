const { body, validationResult, matchedData } = require("express-validator");

// Import the query function from userQueries.js

const {
  createUserQuery,
  loginUserQuery,
} = require("../db/queries/authQueries");

function showSignUpForm(req, res) {
  res.render("signUp");
}

async function handleSignUp(req, res) {
  // const userData = matchedData(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors caught");

    // return res.status(400).render("createUser", {
    //   title: "Create user",
    //   errors: errors.array(),
    // });
    /* handle errors */
  }
  // const userData = matchedData(req, { locations: ["body"] });

  // const userData = {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   email: req.body.email,
  //   password: req.body.password,
  // };

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).render("createUser", {
  //     title: "Create user",
  //     errors: errors.array(),
  //   });
  // }

  const userData = matchedData(req, { locations: ["body"] });

  const result = await createUserQuery(userData);

  console.log("Query result:", result);

  res.redirect("/");
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
  console.log(req.body.email);
  const result = await loginUserQuery(userData);
  // Need to include login verification and then cookie shit.
  res.redirect("/");
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
