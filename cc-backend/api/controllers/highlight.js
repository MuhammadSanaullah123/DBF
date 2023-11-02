const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const checkAdmin = require("../middleware/checkAdmin");
const Highlight = require("../models/highlight");
const Story = require("../models/story");
const User = require("../models/user");

// Create a new Highlight
// Private
// POST request
module.exports.createhighlight = async (req, res, next) => {
  const { name, coverPhoto } = req.body;

  if (!name || !coverPhoto) {
    return res
      .status(422)
      .json({ error: "Please provide name and cover photo for the highlight" });
  }
  try {
    const user = await User.findById(req.user._id).lean(); // Use `lean()` to obtain a plain JavaScript object

    const newHighlight = new Highlight({
      name,
      coverPhoto,
      stories: [],
      user: req.user._id,
    });

    const savedHighlight = await newHighlight.save();
    console.log("user>>>>>", user);
    user.highlights.push(savedHighlight.toObject());

    // Save the updated user document
    await User.findByIdAndUpdate(req.user._id, { highlights: user.highlights });

    res.json(savedHighlight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create highlight" });
  }
};

// Delete a Highlight
// Private
// DELETE request
module.exports.deleteHighlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHighlight = await Highlight.findByIdAndRemove(id);

    if (!deletedHighlight) {
      return res.status(404).json({ error: "Highlight not found" });
    }

    res.json({ message: "Highlight deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete highlight" });
  }
};

// Get all Highlights
// Public
// GET request
module.exports.getAllHighlights = async (req, res, next) => {
  try {
    const highlights = await Highlight.find().populate([{ path: "stories" }]);
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch highlights" });
  }
};

// Get logged in user Highlights
// private
// GET request
module.exports.getHighlights = async (req, res, next) => {
  try {
    const user = req.user;

    console.log("INSIDE CONTROLLER");
    console.log(user._id); 
 
    const highlights = await Highlight.find({
      user: user._id,
    }).populate([{ path: "stories" }]);
    console.log(highlights);
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch highlights" });
  }
};

// Get Highlight By ID
// Public
// GET request
module.exports.getHighlightById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const highlight = await Highlight.findById(id);

    if (!highlight) {
      return res.status(404).json({ error: "Highlight not found" });
    }

    res.json(highlight);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch highlight" });
  }
};
// Add Story To Highlight
// Private
// POST request
module.exports.addStoryTohighlight = async (req, res, next) => {
  try {
    const { highlightId, storyId } = req.params;

    // Find the highlight by ID
    const highlight = await Highlight.findById(highlightId);

    if (!highlight) {
      return res.status(404).json({ error: "Highlight not found" });
    }

    // Find the story by ID
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Add the story to the highlight's stories array
    highlight.stories.push(story._id);

    // Save the updated highlight to the database
    const updatedHighlight = await highlight.save();

    res.json(updatedHighlight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add story to highlight" });
  }
};

// Remove Story To Highlight
// Private
// POST request
module.exports.deleteStoryFromHighlight = async (req, res, next) => {
  try {
    const { highlightId, storyId } = req.params;

    // Find the highlight by ID
    const highlight = await Highlight.findById(highlightId);

    if (!highlight) {
      return res.status(404).json({ error: "Highlight not found" });
    }

    // Remove the story from the highlight's stories array
    highlight.stories.pull(storyId);

    // Save the updated highlight to the database
    const updatedHighlight = await highlight.save();

    res.json(updatedHighlight);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove story from highlight" });
  }
};
