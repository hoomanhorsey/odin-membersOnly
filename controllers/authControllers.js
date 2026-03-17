// Import the query function from userQueries.js
const {
  createUserQuery,
  loginUserQuery,
} = require("../db/queries/userQueries");

function loginDisplay(req, res) {
  //   res.send("sign up form");
  res.render("login");
}

async function loginUser(req, res) {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  const result = await loginUserQuery(userData);

  res.redirect("/");
}
function signUpDisplay(req, res) {
  //   res.send("sign up form");
  res.render("signUp");
}

async function createUser(req, res) {
  const userData = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  };
  const result = await createUserQuery(userData);

  console.log("Query result:", result);

  res.redirect("/");
}

module.exports = { loginDisplay, loginUser, signUpDisplay, createUser };
