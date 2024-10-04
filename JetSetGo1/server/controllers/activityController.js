const Activity = require('../models/AdvertiserActivityModel');

// Create Activity
const createActivity = async (req, res) => {
  const { date, time, location, price, category, tags, special_discounts, booking_open } = req.body;
  try {
    const newActivity = await Activity.create({ date, time, location, price, category, tags, special_discounts, booking_open });
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Activity
const updateActivity = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Activity
const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    await Activity.findByIdAndDelete(id);
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createActivity, updateActivity, deleteActivity, getActivities };
