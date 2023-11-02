const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Story = require("../models/story");
const Post = require("../models/post");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const qs = require("qs");

const { sendActivationEmail, forgotEmail } = require("../utils/sendEmail");
const saltRounds = 10;

// remove c
module.exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .exec()
    .then(async (foundObject) => {
      if (foundObject.isActive == false) {
        return res.status(404).json({
          message:
            "Your account is not verified, please check your email for verification",
        });
      } else {
        if (foundObject) {
          await bcrypt.compare(
            password,
            foundObject.password,
            async (err, newResult) => {
              if (err) {
                return res
                  .status(501)
                  .json({ error, err, message: "something went wrong" });
              } else {
                if (newResult) {
                  const token = jwt.sign(
                    { ...foundObject.toObject(), password: "" },
                    "secret",
                    {
                      expiresIn: "5d",
                    }
                  );

                  return res.status(200).json({
                    token: token,
                    message: "login successfully",
                  });
                } else {
                  return res.status(201).json({
                    message: "invalid password",
                  });
                }
              }
            }
          );
        } else {
          return res.status(404).json({
            message: "Invalid user",
          });
        }
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        message: "something went wrong",
      });
    });
};

module.exports.userSignup = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .exec()
    .then(async (foundObject) => {
      if (foundObject) {
        return res.status(201).json({
          message: "user with this email already exists",
          status: false,
        });
      } else {
        await bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(" error: ", err);
            return res
              .status(500)
              .json({ message: "something went wrong", status: false });
          } else {
            let newUser = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName,
              dateOfBirth: req.body.dateOfBirth,
              state: req.body.state,
              phoneNumber: req.body.phoneNumber,
              email: req.body.email,
              password: hash,
            });

            newUser
              .save()
              .then(async (savedObject) => {
                const token = jwt.sign(
                  { ...savedObject.toObject(), password: "" },
                  "secret",
                  {
                    expiresIn: "5d",
                  }
                );
                sendActivationEmail(savedObject, savedObject.email, token);
                return res.status(201).json({
                  message:
                    "Account created, An email is sent for activation please click the link",
                  status: true,
                });
              })
              .catch((err) => {
                console.log("Not saved", err);
                res.status(500).json({
                  error: err,
                  message: "something went wrong",
                  status: false,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        status: false,
        message: "something went wrong",
      });
    });
};
module.exports.userVerification = (req, res, next) => {
  const { email, password } = req.body;
  const { token } = req.params;

  try {
    const decodedData = jwt.verify(token, "secret");
    User.findOneAndUpdate({ email: decodedData?.email }, { isActive: true })
      .exec()
      .then(async (foundObject) => {
        return res.status(202).json({
          message: "your account is activated successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
          status: false,
          message: "something went wrong",
        });
      });
  } catch (err) {
    console.log(err, "err");
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(400).json({
        message: "Invalid or expired verification token",
        status: false,
      });
    } else {
      res.status(500).json({ message: "Internal server error", status: false });
    }
  }
};
module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    let foundUser = await User.findOne({ email });
    if (!foundUser)
      return res
        .status(404)
        .json({ message: `User with email ${email} was not found!` });
    const token = jwt.sign(
      { access: "forgot-password", userId: foundUser._id },
      "secret"
    );
    foundUser.forgotToken = token;
    foundUser.isForgotTokenUsed = false;
    foundUser = await foundUser.save();
    forgotEmail(foundUser, foundUser.email, token);
    res.json({
      message: "Please check your email to change the password",
    });
  } catch (err) {
    console.log("POST ERRROR: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports.resetPassword = async (req, res, next) => {
  try {
    const { forgotToken, password, confirmPassword } = req.body;
    if (!forgotToken || !password || !confirmPassword)
      res
        .status(404)
        .json({ message: "Some fields are missing", status: false });
    if (confirmPassword !== password)
      return res
        .status(400)
        .json({ message: "Passwords do not match.", status: false });
    if (password.length < 8)
      return res.status(400).json({
        message: "Passwrd should be a minimum length of 8",
        status: false,
      });

    const foundUser = await User.findOne({ forgotToken });
    if (!foundUser)
      return res.status(400).json({
        message: "The Password Token is Invalid or expired",
        status: false,
      });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    foundUser.password = hashedPassword;
    foundUser.isForgotTokenUsed = true;
    foundUser.forgotToken = "";
    const updatedUser = await foundUser.save();

    res.json({
      status: true,
      message: "Password updated successfully!✅",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!", status: false });
  }
};

module.exports.followUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if the user to be followed exists
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the currentUser as a mongoose document
    const currentUser = await User.findById(req.user._id);

    // Check if the user is already being followed
    if (currentUser.following.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You are already following this user" });
    }

    // Update the following array for the current user
    currentUser.following.push(userId);
    await currentUser.save();

    // Update the followers array for the user being followed
    await User.findByIdAndUpdate(userId, {
      $push: { followers: req.user._id },
    });

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to follow user" });
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    // Retrieve the user based on the user ID
    const user = await User.findById(req.user._id).populate([
      {
        path: "stories",
        populate: {
          path: "user",
          select: "firstName lastName",
        },
      },
      { path: "posts" },
      { path: "followers" },
      { path: "following" },
      {
        path: "highlights",
        populate: {
          path: "stories",
        },
      },
      { path: "orders" },
      {
        path: "cart",

        populate: {
          path: "post",
          populate: {
            path: "postedBy",
          },
        },
      },
    ]);

    req.user = user;

    // Check designerOfDay, month, year
    // async function calculateLikesWithinTimeframe(posts, startTime, endTime) {
    //   let totalLikes = 0;
    //   for (const post of posts) {
    //     const postDate = new Date(post.createdAt);
    //     // Check if the post was created within the specified timeframe
    //     if (postDate >= startTime && postDate <= endTime) {
    //       totalLikes += post.likes.length;
    //     }
    //   }
    //   return totalLikes;
    // }

    // async function calculateLikesWithinTimeframeForUser(userId, startTime, endTime) {
    //   const userPosts = await Post.find({ postedBy: userId })
    //   return calculateLikesWithinTimeframe(userPosts, startTime, endTime);
    // }

    // const allUsers = await User.find(); // Replace with your actual query
    // const currentDate = new Date();

    // const startOfDay = new Date(currentDate - 24 * 60 * 60 * 1000);
    // const endOfDay = currentDate;
    // // Calculate start and end times for designerOfMonth
    // const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    // const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

    // // Calculate start and end times for designerOfYear
    // const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    // const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);

    // let maxLikesOfDay = 0;
    // let maxLikesOfMonth = 0;
    // let maxLikesOfYear = 0;
    // let designerOfDayUserId = null;
    // let designerOfMonthUserId = null;
    // let designerOfYearUserId = null;

    // for (const user of allUsers) {
    //   // Calculate likes for designerOfDay
    //   const likesToday = await calculateLikesWithinTimeframeForUser(user._id, startOfDay, endOfDay);
    //   if (likesToday > maxLikesOfDay) {
    //     maxLikesOfDay = likesToday;
    //     designerOfDayUserId = user._id;
    //   }

    //   // Calculate likes for designerOfMonth
    //   const likesThisMonth = await calculateLikesWithinTimeframeForUser(user._id, startOfMonth, endOfMonth);
    //   if (likesThisMonth > maxLikesOfMonth) {
    //     maxLikesOfMonth = likesThisMonth;
    //     designerOfMonthUserId = user._id;
    //   }

    //   // Calculate likes for designerOfYear
    //   const likesThisYear = await calculateLikesWithinTimeframeForUser(user._id, startOfYear, endOfYear);
    //   if (likesThisYear > maxLikesOfYear) {
    //     maxLikesOfYear = likesThisYear;
    //     designerOfYearUserId = user._id;
    //   }
    // }

    // // Update designerOfDay, designerOfMonth, and designerOfYear
    // if (designerOfDayUserId) {
    //   await User.updateOne({ _id: designerOfDayUserId }, { designerOfDay: true });
    // }
    // if (designerOfMonthUserId) {
    //   await User.updateOne({ _id: designerOfMonthUserId }, { designerOfMonth: true });
    // }
    // if (designerOfYearUserId) {
    //   await User.updateOne({ _id: designerOfYearUserId }, { designerOfYear: true });
    // }
    // Return the user object
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    // Retrieve all users
    const users = await User.find().populate([
      { path: "highlights" },
      { path: "posts" },
      { path: "followers" },
      { path: "following" },
      { path: "stories" },
    ]);

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

module.exports.getUserByID = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Retrieve the user by their ID
    const user = await User.findById(userId).populate([
      { path: "followers" },
      { path: "following" },
      {
        path: "highlights",
        populate: {
          path: "stories",
        },
      },
    ]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check designerOfDay, month, year
    async function calculateLikesWithinTimeframe(posts, startTime, endTime) {
      let totalLikes = 0;
      for (const post of posts) {
        const postDate = new Date(post.createdAt);
        // Check if the post was created within the specified timeframe
        if (postDate >= startTime && postDate <= endTime) {
          totalLikes += post.likes.length;
        }
      }
      return totalLikes;
    }

    async function calculateLikesWithinTimeframeForUser(
      userId,
      startTime,
      endTime
    ) {
      const userPosts = await Post.find({ postedBy: userId });
      return calculateLikesWithinTimeframe(userPosts, startTime, endTime);
    }

    const allUsers = await User.find(); // Replace with your actual query
    const currentDate = new Date();

    const startOfDay = new Date(currentDate - 24 * 60 * 60 * 1000);
    const endOfDay = currentDate;
    // Calculate start and end times for designerOfMonth
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    // Calculate start and end times for designerOfYear
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(
      currentDate.getFullYear(),
      11,
      31,
      23,
      59,
      59,
      999
    );

    let maxLikesOfDay = 0;
    let maxLikesOfMonth = 0;
    let maxLikesOfYear = 0;
    let designerOfDayUserId = null;
    let designerOfMonthUserId = null;
    let designerOfYearUserId = null;

    for (const user of allUsers) {
      // Calculate likes for designerOfDay
      const likesToday = await calculateLikesWithinTimeframeForUser(
        user._id,
        startOfDay,
        endOfDay
      );
      if (likesToday > maxLikesOfDay) {
        maxLikesOfDay = likesToday;
        designerOfDayUserId = user._id;
      }

      // Calculate likes for designerOfMonth
      const likesThisMonth = await calculateLikesWithinTimeframeForUser(
        user._id,
        startOfMonth,
        endOfMonth
      );
      if (likesThisMonth > maxLikesOfMonth) {
        maxLikesOfMonth = likesThisMonth;
        designerOfMonthUserId = user._id;
      }

      // Calculate likes for designerOfYear
      const likesThisYear = await calculateLikesWithinTimeframeForUser(
        user._id,
        startOfYear,
        endOfYear
      );
      if (likesThisYear > maxLikesOfYear) {
        maxLikesOfYear = likesThisYear;
        designerOfYearUserId = user._id;
      }
    }

    // Update designerOfDay, designerOfMonth, and designerOfYear
    if (designerOfDayUserId) {
      await User.updateOne(
        { _id: designerOfDayUserId },
        { designerOfDay: true }
      );
    }
    if (designerOfMonthUserId) {
      await User.updateOne(
        { _id: designerOfMonthUserId },
        { designerOfMonth: true }
      );
    }
    if (designerOfYearUserId) {
      await User.updateOne(
        { _id: designerOfYearUserId },
        { designerOfYear: true }
      );
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports.mostLiked = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find();

    // Calculate total likes for each user
    const usersWithLikes = await Promise.all(
      users.map(async (user) => {
        // Find all posts by the user
        const posts = await Post.find({ postedBy: user._id });

        // Calculate total likes for the user's posts
        const totalLikes = posts.reduce(
          (sum, post) => sum + post.likes.length,
          0
        );

        // Return user object with total likes
        return {
          user,
          totalLikes,
        };
      })
    );

    // Sort users by total likes in descending order
    const sortedUsers = usersWithLikes.sort(
      (a, b) => b.totalLikes - a.totalLikes
    );

    res.json(sortedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports.uploadImage = async (req, res, next) => {
  try {
    const { image } = req.body;
    // Find the user by ID and update the profile image property
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { image },
      { new: true }
    );

    // for(let i = 0; i < user.posts.length; i++) {
    //   const post = await Post.findByIdAndUpdate(user.posts[i]._id, { userImage: image }, { new: true })
    // }

    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // Return the updated user object with the new profile image property
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update profile image" });
  }
};

module.exports.addCard = async (req, res, next) => {
  try {
    const { cardNo, cardName, expiryMonth, expiryYear } = req.body;
    const userId = req.user._id; // Assuming you have authenticated the user and stored their ID in req.user

    // Validate the provided card information
    if (!cardNo || !cardName || !expiryMonth || !expiryYear) {
      return res
        .status(400)
        .json({ error: "Please provide all card information" });
    }

    // Check if the card number is already used by another card
    const existingCard = await User.findOne({
      _id: userId,
      "cards.cardNo": formatCardNumber(cardNo), // Format the card number with spaces for comparison
    });

    if (existingCard) {
      return res
        .status(400)
        .json({ error: "This card number is already in use" });
    }

    // Check if the expiry date is behind the current date
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so add 1
    if (
      expiryYear < currentYear ||
      (expiryYear == currentYear && expiryMonth < currentMonth)
    ) {
      return res
        .status(400)
        .json({ error: "Card expiry date cannot be in the past" });
    }

    // Create a new card object with the provided data
    const card = {
      cardNo: formatCardNumber(cardNo), // Format the card number with spaces before saving
      cardName,
      expiryMonth,
      expiryYear,
    };

    // Find the user by ID and update their cards array to include the new card
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { cards: card } }, // Use $addToSet to prevent duplicates in the array
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add card" });
  }
};

module.exports.addToCart = async (req, res, next) => {
  // Get the image string from the request body
  const { postId } = req.params;

  // Find the post by its ID
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  // Check if the post is already in the user's cart
  const user = await User.findById(req.user._id)
    .populate("cart.post", "image price")
    .exec();
  const cartItem = user.cart.find(
    (item) => item.post && item.post._id.equals(postId)
  );

  if (cartItem) {
    return res.status(400).json({ error: "Post already in cart" });
  }

  // Add the post to the user's cart
  user.cart.push({ post: postId });
  await user.save();

  // Populate additional information for the response
  await user
    .populate({
      path: "cart.post",
      select: "image price postedBy",
      populate: {
        path: "postedBy",
        select: "userName",
      },
    })
    .execPopulate();

  // Return the updated cart
  res.json({ cart: user.cart });
};

module.exports.removeFromCart = async (req, res, next) => {
  // Get the token from the request headers

  const { cartItemId } = req.params;
  // Find the user by ID
  const user = await User.findById(req.user._id);

  // Check if the cart item exists in the user's cart
  const cartItemIndex = user.cart.findIndex((item) =>
    item._id.equals(cartItemId)
  );
  if (cartItemIndex === -1) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  // Remove the cart item from the user's cart
  user.cart.splice(cartItemIndex, 1);
  await user.save();

  res.json({ message: "Cart item removed successfully" });
};

module.exports.createConversation = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if a conversation already exists with the given members
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      // If conversation exists, return it
      res.status(200).send(existingConversation);
    } else {
      // If conversation does not exist, create a new one
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });

      await newConversation.save();
      res.status(200).send(newConversation);
    }
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send({ error: "Failed to create conversation" });
  }
};

module.exports.getConversationById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );

        const user = await User.findById(receiverId);

        if (!user) return null;
        return {
          user: {
            image: user.image,
            receiverId: user._id,
            email: user.email,
            fullName: user.userName,
          },
          conversationId: conversation._id,
        };
      })
    );
    //remove null
    const filteredArray = conversationUserData.filter((item) => item !== null);

    res.status(200).json(filteredArray);
  } catch (error) {
    console.log(error, "Error");
    res.status(500).json({ error: "Failed to fetch conversation data" });
  }
};

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, senderId, receiverId, message } = req.body;

    if (!senderId || !message)
      return res.status(400).send("Please fill all required fields");

    // if conversation ID does exists
    let conversation;

    // Check if conversationId is provided
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);

      if (!conversation) {
        // If conversation doesn't exist, create a new one
        conversation = new Conversation({ members: [senderId, receiverId] });
        await conversation.save();
      }
    } else {
      // If conversationId is not provided, create a new conversation
      conversation = new Conversation({ members: [senderId, receiverId] });
      await conversation.save();
    }

    // Create a new message and associate it with the conversation
    const newMessage = new Message({
      conversationId: conversation._id,
      senderId,
      message,
      receiverId,
    });

    await newMessage.save();

    res.status(200).send(newMessage);
  } catch (error) {
    console.log(error, "Error");
  }
};

module.exports.getMessageByConversationId = async (req, res, next) => {
  try {
    const conversationId = req.params.conversationId;

    if (conversationId === "new") return res.status(200).json([]);

    const messages = await Message.find({ conversationId });

    const messageUserData = await Promise.all(
      messages.map(async (message) => {
        const user = await User.findById(message.receiverId);
        if (!user) return null;

        return {
          user: {
            image: user.image,
            id: user._id,
            email: user.email,
            fullName: user.firstName + " " + user.lastName,
          },
          message: message.message,
        };
      })
    );

    //remove null
    const filteredArray = messageUserData.filter((item) => item !== null);

    res.status(200).json(await filteredArray);
  } catch (error) {
    console.log(error, "Error");
  }
};

module.exports.googleAppSignin = async (req, res, next) => {
  const { googleId, firstName, lastName, image, email } = req.body;

  if (!googlId || !firstName || !lastName || !image || !email) {
    res.status(400).json({ error: "Fill all of your fields" });
  }

  const user = User.findOrCreate({
    googleId,
    firstName,
    lastName,
    image,
    email,
  });

  const token = jwt.sign({ user }, "secret", { expiresIn: "5d" });

  try {
    if (token === undefined) {
      res.status(401).json({
        message:
          "Auhorization error! please send a valid Google token via authorization header!",
      });
      return;
    } else {
      const tokenGoogle = token;
      adminValidate(req, res, next, tokenGoogle);
    }
  } catch (err) {
    res.status(500).json({ error });
  }
};
module.exports.getAllUsersAgain = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const currentUser = await User.findById(userId).populate("following");

    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("CURERMET");
    console.log(currentUser);

    const storiesByUser = {};

    for (const user of currentUser.following) {
      const userStories = await Story.find({
        user: user._id,
        createdAt: { $gte: startTime },
      }).populate({
        path: "user",
        select: "image userName", // Only select image and userName
      });

      console.log(userStories, "userStories");
      if (userStories.length > 0) {
        storiesByUser[user._id] = userStories;
      }
    }

    res.json(storiesByUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

function formatCardNumber(cardNo) {
  const formattedCardNo = cardNo.replace(
    /(\d{4})(\d{4})(\d{4})(\d{4})/,
    "$1 $2 $3 $4"
  );
  return formattedCardNo;
}

// Define a function to calculate the likes received within a specific timeframe
function calculateLikesWithinTimeframe(posts, startTime, endTime) {
  return posts.reduce((totalLikes, post) => {
    const postDate = new Date(post.createdAt);

    // Check if the post was created within the specified timeframe
    if (postDate >= startTime && postDate <= endTime) {
      console.log("totalLikes", totalLikes);
      // Add the number of likes for this post to the totalLikes
      return totalLikes + post.likes.length;
    }

    // If the post is outside the timeframe, return the current totalLikes
    return totalLikes;
  }, 0);
}
