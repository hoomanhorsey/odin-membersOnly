// Import the query function from userQueries.js
const {
  getAllMsgsQuery,
  getAllMsgsQueryLoggedOut,
} = require("../db/queries/msgQueries");

async function showMsgs(req, res) {
  let rows = [];

  if (!req.user) {
    rows = await getAllMsgsQueryLoggedOut();
    console.log(rows);

    res.render("index", { messages: rows });
  } else {
    rows = await getAllMsgsQuery();
    console.log(rows);
    res.render("index", { messages: rows });
  }
}

function displayNewMessageForm(req, res) {
  // res.send("new message form should be here pls");
  res.render("newMessage");
}

async function postNewMessage(req, res) {
  console.log("placeholder");
}
//   const rows = await getAllMsgsQuery();
//   res.render("index", { messages: rows });
// }

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

module.exports = { showMsgs, displayNewMessageForm, postNewMessage };
