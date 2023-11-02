const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    state: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email must be unique"],
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    forgotToken: {
      type: String,
    },
    isForgotTokenUsed: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    stories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    highlights: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Highlight",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    cards: [
      {
        cardNo: {
          type: String,
        },
        cardName: {
          type: String,
        },
        expiryMonth: {
          type: String,
        },
        expiryYear: {
          type: String,
        },
      },
    ],
    cart: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      },
    ],
    likesToday: {
      type: Number,
      default: 0,
    },
    likesThisMonth: {
      type: Number,
      default: 0,
    },
    likesThisYear: {
      type: Number,
      default: 0,
    },
    designerOfDay: {
      type: Boolean,
      default: false,
    },
    designerOfMonth: {
      type: Boolean,
      default: false,
    },
    designerOfYear: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// Set default value as an empty array for posts field
userSchema.path("posts").default([]);
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
