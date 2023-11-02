const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);
