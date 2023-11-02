const express = require("express");
const passport = require("passport");
const Passport = require("../middleware/Passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

const userController = require("../controllers/user");
const adminValidate = require("../middleware/checkAdmin");

function userRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });

  router.post("/signup", ioMiddleware, userController.userSignup);
  router.post("/login", ioMiddleware, userController.userLogin);
  router.put(
    "/verification/:token",
    ioMiddleware,
    userController.userVerification
  );
  router.put("/forgot-password", ioMiddleware, userController.forgotPassword);
  router.patch("/reset-password", [ioMiddleware], userController.resetPassword);
  router.get("/me", ioMiddleware, adminValidate, userController.getUser);
  router.get("/all", ioMiddleware, userController.getAllUser);
  router.get("/most-liked", ioMiddleware, userController.mostLiked);
  router.get(
    "/:userId",
    ioMiddleware,
    adminValidate,
    userController.getUserByID
  );
  router.post(
    "/follow/:userId",
    ioMiddleware,
    adminValidate,
    userController.followUser
  );
  router.put(
    "/update-profile-image",
    ioMiddleware,
    adminValidate,
    userController.uploadImage
  );
  router.put("/add-card", ioMiddleware, adminValidate, userController.addCard);
  router.put(
    "/add-to-cart/:postId",
    ioMiddleware,
    adminValidate,
    userController.addToCart
  );
  router.delete(
    "/remove-from-cart/:cartItemId",
    ioMiddleware,
    adminValidate,
    userController.removeFromCart
  );
  router.post(
    "/create-conversation",
    ioMiddleware,
    adminValidate,
    userController.createConversation
  );
  router.get(
    "/conversation/:userId",
    ioMiddleware,
    adminValidate,
    userController.getConversationById
  );
  router.post(
    "/message",
    ioMiddleware,
    adminValidate,
    userController.sendMessage
  );
  router.get(
    "/message/:conversationId",
    ioMiddleware,
    adminValidate,
    userController.getMessageByConversationId
  );
  router.get(
    "/auth/google",
    Passport,
    ioMiddleware,
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/auth/google/callback",
    Passport,
    ioMiddleware,
    passport.authenticate("google")
  );
  router.get(
    "/auth/facebook",
    Passport,
    ioMiddleware,
    passport.authenticate("facebook", { scope: ["public_profile", "email"] })
  );
  router.get(
    "/auth/facebook/callback",
    Passport,
    ioMiddleware,
    passport.authenticate("facebook")
  );

  router.post("/auth/app/google", ioMiddleware, userController.googleAppSignin);
  router.get(
    "/auth/stories",
    ioMiddleware,
    adminValidate,
    userController.getAllUsersAgain
  );

  return router;
}

let userRouterFile = {
  router: router,
  userRouter: userRouter,
};

module.exports = userRouterFile;
