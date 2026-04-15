// routes/msgRouter.js
const { Router } = require("express");

const msgRouter = Router();

const msgController = require("../controllers/msgController");
const authorisation = require("../middleware/auth");

msgRouter.get("/", msgController.showMsgs);

msgRouter.get(
  "/new",
  authorisation.ensureAuthenticated,
  msgController.displayNewMessageForm,
);
msgRouter.post(
  "/new",
  authorisation.ensureAuthenticated,
  msgController.postNewMessage,
);

msgRouter.post("/delete/:id", msgController.deleteMessage);

module.exports = msgRouter;
