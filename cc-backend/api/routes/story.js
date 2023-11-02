const express = require("express");
const router = express.Router();
const storyController = require("../controllers/story");
const adminValidate = require("../middleware/checkAdmin");

function storyRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });

  router.post("/create", ioMiddleware, adminValidate, storyController.createStory);
  router.delete("/delete/:id", ioMiddleware, adminValidate, storyController.deleteStory);
  router.get("/retrieve-all", ioMiddleware, adminValidate, storyController.getAllStories);
  router.get("/retrieve/:storyId", ioMiddleware, storyController.getStoryById);

  return router;
}

let storyRouterFile = {
  router: router,
  storyRouter: storyRouter,
};

module.exports = storyRouterFile;
