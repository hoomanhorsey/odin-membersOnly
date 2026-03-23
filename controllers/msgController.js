// Import the query function from userQueries.js
const { getAllMsgsQuery } = require("../db/queries/msgQueries");

async function showMsgs(req, res) {
  const rows = await getAllMsgsQuery();
  res.render("index", { messages: rows });
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

module.exports = { showMsgs };
