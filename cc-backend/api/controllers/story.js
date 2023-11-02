const express = require('express')
const mongoose = require('mongoose')
const checkAdmin = require('../middleware/checkAdmin')
const Story = require("../models/story")
const User = require("../models/user")
const jwt = require("jsonwebtoken");

// Create a new Post
// Private
// POST request
module.exports.createStory = async (req, res, next) => {
  const { text, image } = req.body;

  if (!text || !image) {
    return res.status(422).json({ error: "Please fill all of the fields" });
  }

  try {
    const user = req.user;

    // Get the name of the user for the story
    const userOfStory = await User.findById(req.user._id);
    const nameOfUser = userOfStory.userName;

    // Create a new story
    const story = new Story({
      text,
      image,
      user: req.user._id,
      userName: nameOfUser,
    });

    // Save the story
    const result = await story.save();

    // Push the new story into the user's stories array
    user.stories.push(result);

    // Save the updated user document with the new story
    await User.findByIdAndUpdate(req.user._id, { $push: { stories: result._id }});

    // Respond with the created story
    res.json({ story: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create story' });
  }
};

// Delete a STORY
// Private
// DELETE request
module.exports.deleteStory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedStory = await Story.findByIdAndRemove(id);
    
        if (!deletedStory) {
          return res.status(404).json({ error: 'Story not found' });
        }
    
        res.json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete story' });
    }
    
}

module.exports.getAllStories = async (req, res, next) => {
  try {
    const currentUser = req.user;
    console.log("current user: ", currentUser);

    const followingIds = currentUser.following;
    console.log("followingIds: ", followingIds);

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const stories = await Story.find({
      postedBy: { $in: followingIds },
      createdAt: { $gte: twentyFourHoursAgo }
    }).populate('user');

    console.log("stories: ", stories); // Check the stories array in the console

    res.json(stories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }

    
}

module.exports.getStoryById = async (req, res, next) => {
    try {
        const { storyId } = req.params;

        // Fetch the stories of the users followed by the current user from the last 24 hours
        const story = await Story.findById(storyId);

        res.json(story);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch story' });
    }
}
