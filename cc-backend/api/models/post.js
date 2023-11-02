const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    tag: [
      {
        type: String,
        required: true,
      },
    ],
    userName: {
      type: String,
    },
    userImage: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
        },
        review: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
    timesPurchased: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    overview: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    postType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.virtual("postedByUser", {
  ref: "User",
  localField: "postedBy",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Post", postSchema);
