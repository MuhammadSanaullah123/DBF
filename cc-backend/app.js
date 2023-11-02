const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Model
const User = require("./api/models/user");
dotenv.config();

mongoose
  .connect(
    "mongodb+srv://zee:zee@cluster0.ne9b392.mongodb.net/CC?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("Connected to MongoDb"))
  .catch((err) => console.log("MongoDb connection Error", err));

app.use(morgan("dev"));
app.use(bodyParser({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use("/public", express.static("public"));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Cors
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("access-control-allow-credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API
const queryRouterFile = require("./api/routes/query");
const userRouterFile = require("./api/routes/user");
const postRouterFile = require("./api/routes/post");
const storyRouterFile = require("./api/routes/story");
const highlightRouterFile = require("./api/routes/highlight");
const orderRouterFile = require("./api/routes/order");

app.use("/query", queryRouterFile.router);
app.use("/user", userRouterFile.router);
app.use("/post", postRouterFile.router);
app.use("/story", storyRouterFile.router);
app.use("/highlight", highlightRouterFile.router);
app.use("/order", orderRouterFile.router);

module.exports = app;
