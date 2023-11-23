const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
// Middleware
const checkAdmin = require("../middleware/checkAdmin");
// Models
const User = require("../models/user");
const Order = require("../models/order");
const Post = require("../models/post");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

module.exports.createOrder = async (req, res, next) => {
  try {
    const orderItems = req.body; // Get user ID and order items from the request body

    // Check if the user exists
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("ORDERITEMS");
    console.log(orderItems);
    // Create an array of order items
    console.log("req.body>>>>>", req.body); 
    const orderItemsArray = orderItems.map((item) => {
      const postId = item.post._id;
      const image = item.post.image;
      const reviews = item.post.reviews;

      const validReviews = reviews.filter(
        (review) => review.rating >= 1 && review.rating <= 5
      );
      console.log("validReviews");
      console.log(validReviews);

      const totalRating = validReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      console.log("totalRating");
      console.log(totalRating);
      let averageRating;
      if (validReviews.length >= 1) {
        averageRating = totalRating / validReviews.length;
      } else {
        averageRating = totalRating / 1;
      }
      console.log("averageRating");
      console.log(averageRating);

      averageRating = Math.round(averageRating);
      console.log("averageRating");
      console.log(averageRating);

      const rating = averageRating;
      return { post: postId, image, reviews, rating };
    });

    // Create a new order with the order items
    const order = new Order({
      user: req.user._id,
      orderItems: orderItemsArray,
    });

    // Add the order to the user's order array
    user.orders.push(order);

    user.cart = [];
    // Save both the order and user documents
    await order.save();
    await user.save();
    console.log(order);
    res.status(201).json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports.createStripeSession = async (req, res, next) => {
  const line_items = req.body.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/thank-you`,
    cancel_url: "http://localhost:3000/payment",
  });

  res.send({ url: session.url });
};
