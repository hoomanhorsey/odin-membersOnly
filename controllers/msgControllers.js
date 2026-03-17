// Import the query function from userQueries.js
const {} = require("../db/queries/msgQueries");

function getMsgs(req, res) {
  res.render("index");
}

// async function createUser(req, res) {
//   const userData = {
//     fname: req.body.fname,
//     lname: req.body.lname,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   const result = await createUserQuery(userData);

//   console.log("Query result:", result);

//   res.redirect("/");
// }

module.exports = { getMsgs };
