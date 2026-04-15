// Import the query function from userQueries.js
const {
  getAllMsgsQuery,
  getAllMsgsQueryLoggedOut,
  postNewMessageQuery,
  deleteMessageQuery,
} = require("../db/queries/msgQueries");

async function showMsgs(req, res) {
  let rows = [];
  console.log("from showmsgs ", req.user);

  console.log("req.user ===", req.user);
  console.log(
    "type:",
    typeof req.user,
    "membership:",
    req.user?.membershipstatus,
  );

  if (req.user && req.user.membershipstatus === true) {
    rows = await getAllMsgsQuery();
    console.log(rows);
    res.render("index", { messages: rows });
  } else {
    rows = await getAllMsgsQueryLoggedOut();
    console.log(rows);
    res.render("index", { messages: rows });
  }

  // if (!req.user) {
  //   rows = await getAllMsgsQueryLoggedOut();
  //   console.log(rows);

  //   res.render("index", { messages: rows });
  // } else {
  //   rows = await getAllMsgsQuery();
  //   console.log(rows);
  //   res.render("index", { messages: rows });
  // }
}

function displayNewMessageForm(req, res) {
  // res.send("new message form should be here pls");

  console.log("displaying new msg");
  res.render("newMessage");
}

async function postNewMessage(req, res) {
  console.log("placeholder");
  console.log(res.locals.currentUser);
  try {
    await postNewMessageQuery(
      res.locals.currentUser.id,
      req.body.messagetitle,
      req.body.messagetext,
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal error");
  }
}

async function deleteMessage(req, res) {
  console.log(req.params.id);
  console.log("delete poo ");

  try {
    await deleteMessageQuery(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal error");
  }
}

module.exports = {
  showMsgs,
  displayNewMessageForm,
  postNewMessage,
  deleteMessage,
};
