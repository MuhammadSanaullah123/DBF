const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SESSION_KEY; // Replace with a secure secret key
const User = require("../models/user");
const adminValidate = require("./checkAdmin");
const app = express();

module.exports = async (req, res, next) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:6002/user/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        console.log("googleId", profile._json.sub);
        console.log("first name", profile._json.given_name);
        console.log("last name", profile._json.family_name);
        console.log("image", profile._json.picture);
        // console.log("done", done)

        User.findOrCreate(
          {
            googleId: profile._json.sub,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            image: profile._json.picture,
            state: "",
            userName: profile._json.name,
            email: profile._json.email,
          },
          async (err, user) => {
            const token = jwt.sign({ user }, jwtSecretKey, { expiresIn: "5d" });

            if (token === undefined) {
              res.status(401).json({
                message:
                  "Auhorization error! please send a valid token via authorization header!",
              });
              return;
            } else {
              // req.header = token
              const tokenGoogle = token;
              // adminValidate(req, res, next, tokenGoogle=token)
              adminValidate(req, res, next, tokenGoogle);
              res.redirect(`http://localhost:3000/?token=${tokenGoogle}`);

              return done(null, user);
            }
          }
        );
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:6002/user/auth/facebook/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        console.log("googleId", profile._json.sub);
        console.log("first name", profile.displayName.split(" ")[0]);
        console.log("last name", profile.displayName.split(" ")[1]);
        console.log("image", profile.profileUrl);
        // console.log("done", done)

        User.findOrCreate(
          {
            googleId: profile.id,
            firstName: profile.displayName.split(" ")[0],
            lastName: profile.displayName.split(" ")[1],
            image: profile.profileUrl || "",
            state: "",
            userName: profile.displayName,
            email: profile.email || "hamzaqament.com",
          },
          async (err, user) => {
            const token = jwt.sign({ user }, jwtSecretKey, { expiresIn: "5d" });

            if (token === undefined) {
              res.status(401).json({
                message:
                  "Auhorization error! please send a valid token via authorization header!",
              });
              return;
            } else {
              // req.header = token
              const tokenFacebook = token;
              // adminValidate(req, res, next, tokenGoogle=token)
              adminValidate(req, res, next, tokenFacebook);
              res.redirect(`http://localhost:3000/?token=${tokenFacebook}`);

              return done(null, user);
            }
          }
        );
      }
    )
  );

  next();
};
