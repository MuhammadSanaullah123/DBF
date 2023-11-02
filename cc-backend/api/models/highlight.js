const mongoose = require("mongoose");

const highlightSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coverPhoto: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    stories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Highlight", highlightSchema);
