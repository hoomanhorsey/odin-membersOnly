// routes/msgRouter.js
const { Router } = require("express");

const msgRouter = Router();

const msgController = require("../controllers/msgController");

msgRouter.get("/", msgController.showMsgs);

module.exports = msgRouter;
