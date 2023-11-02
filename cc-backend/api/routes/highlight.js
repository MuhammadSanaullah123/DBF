const express = require("express");
const router = express.Router();
const highlightController = require("../controllers/highlight");
const adminValidate = require("../middleware/checkAdmin");

function highlightRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });

  router.post(
    "/create",
    ioMiddleware,
    adminValidate,
    highlightController.createhighlight
  );
  router.delete(
    "/delete/:id",
    ioMiddleware,
    adminValidate,
    highlightController.deleteHighlight
  );
  router.post(
    "/:highlightId/stories/:storyId",
    ioMiddleware,
    adminValidate,
    highlightController.addStoryTohighlight
  );
  router.delete(
    "/:highlightId/stories/:storyId",
    ioMiddleware,
    adminValidate,
    highlightController.deleteStoryFromHighlight
  );
  router.get(
    "/retrieve/:id",
    ioMiddleware,
    highlightController.getHighlightById
  );
  router.get(
    "/retrieve-all",
    ioMiddleware,
    highlightController.getAllHighlights
  );
  router.get(
    "/retrieve-me",
    ioMiddleware,
    adminValidate,
    highlightController.getHighlights
  );

  return router;
}

let highlightRouterFile = {
  router: router,
  highlightRouter: highlightRouter,
};

module.exports = highlightRouterFile;
