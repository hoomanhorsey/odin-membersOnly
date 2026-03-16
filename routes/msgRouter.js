// routes/msgRouter.js
const { Router } = require("express");

const msgRouter = Router();

msgRouter.get("/", (req, res) => res.send("All msgs"));
// msgRouter.get("/:userId", (req, res) => {
//   const { authorId } = req.params;
//   res.send(`Author ID: ${authorId}`);
// });

module.exports = msgRouter;
