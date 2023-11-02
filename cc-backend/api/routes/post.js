const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const adminValidate = require("../middleware/checkAdmin");

function postRouter(io) {
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
    postController.createPost
  );
  router.delete(
    "/delete/:id",
    ioMiddleware,
    adminValidate,
    postController.deletePost
  );
  router.get("/retrieve-all", ioMiddleware, postController.getAllPosts);
  router.get("/retrieve/:id", ioMiddleware, postController.getPost);
  router.get("/trending-posts", ioMiddleware, postController.getTrendingPosts);
  router.put(
    "/timespurchased-post/:id",
    ioMiddleware,
    postController.timesPurchased
  );
  router.put("/review-post/:id", ioMiddleware, postController.reviewPost);
  router.get("/review-post/:id", ioMiddleware, postController.getReviews);

  router.get("/design-of-day", ioMiddleware, postController.designOfTheDay);
  router.get("/design-of-month", ioMiddleware, postController.designOfTheMonth);
  router.get("/design-of-year", ioMiddleware, postController.designOfTheYear);
  router.put(
    "/:id/like",
    ioMiddleware,
    adminValidate,
    postController.likeAPost
  );
  router.put(
    "/:id/comment",
    ioMiddleware,
    adminValidate,
    postController.commentAPost
  );
  router.get(
    "/designs-you-may-like",
    ioMiddleware,
    adminValidate,
    postController.designsYouMayLike
  );
  router.get("/top-models", ioMiddleware, postController.getTopModels);
  //   router.post("/login", ioMiddleware, userController.userLogin);
  //   router.put(
  //     "/verification/:token",
  //     ioMiddleware,
  //     userController.userVerification
  //   );
  //   router.put("/forgot-password", ioMiddleware, userController.forgotPassword);
  //   router.patch("/reset-password", [ioMiddleware], userController.resetPassword);

  return router;
}

let postRouterFile = {
  router: router,
  postRouter: postRouter,
};

module.exports = postRouterFile;
