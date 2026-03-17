// routes/msgRouter.js
const { Router } = require("express");

const msgRouter = Router();

const msgController = require("../controllers/msgControllers");

msgRouter.get("/", msgController.getMsgs);
// msgRouter.get("/:userId", (req, res) => {
//   const { authorId } = req.params;
//   res.send(`Author ID: ${authorId}`);
// });

module.exports = msgRouter;
