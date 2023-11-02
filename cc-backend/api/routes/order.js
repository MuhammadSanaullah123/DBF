const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const adminValidate = require("../middleware/checkAdmin");

function orderRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });

  router.post("/create", ioMiddleware, adminValidate, orderController.createOrder);
  router.post("/create-checkout-session", ioMiddleware, adminValidate, orderController.createStripeSession);
  // router.delete("/delete/:id", ioMiddleware, adminValidate, highlightController.deleteHighlight);
  // router.post('/:highlightId/stories/:storyId', ioMiddleware, adminValidate, highlightController.addStoryTohighlight);
  // router.delete("/:highlightId/stories/:storyId", ioMiddleware, adminValidate, highlightController.deleteStoryFromHighlight);
  // router.get("/retrieve/:id", ioMiddleware, highlightController.getHighlightById);
  // router.get("/retrieve-all", ioMiddleware, highlightController.getAllHighlights);
  
  return router;
}

let orderRouterFile = {
  router: router,
  orderRouter: orderRouter,
};

module.exports = orderRouterFile;
