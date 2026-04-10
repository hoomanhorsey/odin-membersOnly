// routes/msgRouter.js
const { Router } = require("express");

const msgRouter = Router();

const msgController = require("../controllers/msgController");

msgRouter.get("/", msgController.showMsgs);

msgRouter.get("/new", msgController.displayNewMessageForm);
msgRouter.post("/new", msgController.postNewMessage);

module.exports = msgRouter;
