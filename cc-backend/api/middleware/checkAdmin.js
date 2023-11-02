const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next, tokenGoogle = "") => {
  const token = req.headers["x-auth-token"] || tokenGoogle;

  try {
    // Check if req.authToken exists
    if (token === undefined) {
      return res.status(401).json({
        message:
          "Authorization error! Please send a valid token via authorization header!",
      });
    }

    // Verify the token and extract the user data
    const decodedToken = jwt.verify(token, "secret");

    if (decodedToken.user) {
      req.user = decodedToken.user;
    } else {
      req.user = decodedToken;
    }
    // const authId = decodedToken.user._id; // Adjust this based on your token structure
    // const authObj = await User.findById(authId).exec();
    // console.log("authObj", authObj)
    /*   console.log("decodedToken", decodedToken) */
    if (!decodedToken) {
      return res.status(401).json({
        message: "User not found!",
      });
    }
    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({
      message:
        "Authorization error! Please send a valid token via authorization headeraaaaaaaaaaaaaaaaaa!",
    });
  }
};
