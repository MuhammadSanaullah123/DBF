const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { startOfWeek, endOfWeek } = require("date-fns");
const checkAdmin = require("../middleware/checkAdmin");

const Post = require("../models/post");
const User = require("../models/user");

// Create a new Post
// Private
// POST request
module.exports.createPost = async (req, res, next) => {
  const {
    title,
    image,
    tag,
    price,
    quantity,
    postType,
    overview,
    specification,
  } = req.body;

  if (
    !title ||
    !image ||
    !tag ||
    !price ||
    !quantity ||
    !postType ||
    !overview ||
    !specification
  ) {
    return res.status(422).json({ error: "Please fill all of the fields" });
  }

  try {
    const user = req.user;

    const nameOfUser = user.userName;
    const imageOfUser = user.image;

    const post = new Post({
      title,
      image,
      tag,
      price,
      quantity,
      postType,
      overview,
      specification,
      postedBy: req.user._id,
      userName: nameOfUser,
      /*  userImage: imageOfUser.image, */
    });

    const result = await post.save();

    // Push the new post ID to the user's posts array
    user.posts.push(result._id);

    // Save the updated user document with the new post ID
    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: result._id },
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

// Delete a POST
// Private
// POST request
module.exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndRemove(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    const user = req.user;

    // Remove the deleted post's ID from the user's post array
    user.posts.pull(deletedPost._id);
    await user.save();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports.getAllPosts = async (req, res, next) => {
  try {
    // Retrieve the user based on the user ID
    const posts = await Post.find({})
      .sort({ $natural: -1 })
      .populate([
        {
          path: "comments",
          populate: {
            path: "user",
            select: "userName image",
          },
        },
        { path: "postedBy" },
      ]);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports.getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate("postedBy").exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post" });
  }
};

module.exports.likeAPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    // Increment user's like counts
    const user = await User.findById(req.user._id);

    user.likesToday += 1;
    user.likesThisMonth += 1;
    user.likesThisYear += 1;

    await user.save();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    const userIdObj = mongoose.Types.ObjectId(req.user._id);

    const hasLiked = post.likes.some((like) => like._id.equals(userIdObj));
    if (hasLiked) {
      return res
        .status(400)
        .json({ error: "You have already liked this post" });
    }

    // Add the like to the post
    post.likes.push(req.user._id);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
    console.log(error);
  }
};

module.exports.commentAPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { content } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      user: userId,
      content,
    };
    // Add the new comment to the post's comments array
    post.comments.push(newComment);

    // Save the updated post
    let updatedPost = await post.save();
    updatedPost = await updatedPost
      .populate([
        {
          path: "comments",
          populate: {
            path: "user",
            select: "userName image",
          },
        },
      ])
      .execPopulate();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.reviewPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rating, review, image, userid } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newReview = {
      user: userid,
      rating,
      review,
      image,
    };

    post.reviews.unshift(newReview);

    // Save the updated post
    let updatedPost = await post.save();
    updatedPost = await updatedPost
      .populate([
        {
          path: "reviews",
          populate: {
            path: "user",
            select: "userName image",
          },
        },
      ])
      .execPopulate();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getReviews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    console.log(post);
    const reviews = post.reviews;

    res.status(201).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getTrendingPosts = async (req, res, next) => {
  try {
    // Retrieve the posts from the database
    const posts = await Post.find();

    const postsWithScores = posts.map((post) => ({
      post,
      score: post.likes.length + post.comments.length + post.timesPurchased,
    }));
    const sortedPosts = postsWithScores.sort((a, b) => b.score - a.score);
    const top10Posts = sortedPosts.slice(0, 10).map((item) => item.post);
    // Sort the posts based on the number of likes in descending order
    /*  const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length); */

    // Slice the array to get the top 10 posts
    /*   const top10Posts = sortedPosts.slice(0, 10); */
    res.json({ top10Posts });

    return top10Posts;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.timesPurchased = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    post.timesPurchased += 1;
    await post.save();
    res.json({ post });

    return post;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.designOfTheDay = async (req, res, next) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Retrieve the posts from the last 24 hours
    const posts = await Post.find({ createdAt: { $gte: twentyFourHoursAgo } });

    // Sort the posts based on the number of likes in descending order
    const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length);

    // Return the post with the highest number of likes
    if (sortedPosts.length > 0) {
      return res.json({ sortedPosts });
    } else {
      return res.json({ message: "No posts found in last 24 hours" }); // No posts found in the last 24 hours
    }
  } catch (error) {
    console.log(error);
    throw new Error(
      "Failed to fetch the most liked post in the last 24 hours."
    );
  }
};

module.exports.designOfTheWeek = async (req, res, next) => {
  try {
    const currentDate = new Date();

    const startOfWeekDate = startOfWeek(currentDate);
    const endOfWeekDate = endOfWeek(currentDate);

    const posts = await Post.find({
      createdAt: { $gte: startOfWeekDate, $lte: endOfWeekDate },
    });

    const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length);

    res.json(sortedPosts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch most liked posts of the week" });
  }
};

module.exports.designOfTheMonth = async (req, res, next) => {
  try {
    // Get the current month
    const currentMonth = new Date().getMonth();

    // Find posts created within the current month
    const posts = await Post.find({
      createdAt: { $gte: new Date(new Date().getFullYear(), currentMonth, 1) },
    });

    // Sort the posts based on the number of likes in descending order
    const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length);

    // Return the sorted posts as the response
    res.json(sortedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch most liked posts" });
  }
};

module.exports.designOfTheYear = async (req, res, next) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Find posts created within the current year
    const posts = await Post.find({
      createdAt: { $gte: new Date(currentYear, 0, 1) },
    });

    // Sort the posts based on the number of likes in descending order
    const sortedPosts = posts.sort((a, b) => b.likes.length - a.likes.length);

    // Return the sorted posts as the response
    res.json(sortedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch most liked posts" });
  }
};

module.exports.designsYouMayLike = async (req, res, next) => {
  try {
    const post = await Post.find();

    // Shuffle the array of posts randomly
    const shuffledPosts = shuffleArrayFisher(post);

    res.json(shuffledPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post" });
    console.log(error);
  }
};

module.exports.designsCustomerLiked = async (req, res, next) => {
  try {
    const post = await Post.find();

    // Shuffle the array of posts randomly
    const shuffledPosts = shuffleArrayDurstenfeld(post);

    res.json(shuffledPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post" });
    console.log(error);
  }
};

module.exports.getTopModels = async (req, res, next) => {
  try {
    // const postType = 'Model';

    const posts = await Post.find({ postType: "Model" })
      .sort({ likes: -1 })
      .limit(5); // Get the top 5 posts

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fisher-Yates shuffle algorithm
function shuffleArrayFisher(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Durstenfeld shuffle algorithm
function shuffleArrayDurstenfeld(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
