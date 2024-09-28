const Advertiser = require('../models/AdvertiserModel');

// Create Advertiser Profile
const createAdvertiserProfile = async (req, res) => {
  const { company_name, company_profile, hotline, website_link, username, email } = req.body;

  try {
    const newAdvertiser = await Advertiser.create({ company_name, company_profile, hotline, website_link, username, email });
    res.status(201).json(newAdvertiser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Advertiser Profile
const updateAdvertiserProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedAdvertiser = await Advertiser.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedAdvertiser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Advertiser Profile
const getAdvertiserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const advertiser = await Advertiser.findById(id);
    res.status(200).json(advertiser);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};
const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedActivity = await Activity.findByIdAndDelete(id);
      
      if (!deletedActivity) {
          return res.status(404).json({ message: 'Activity not found' });
      }
      
      res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
module.exports = { createAdvertiserProfile, updateAdvertiserProfile, getAdvertiserProfile ,deleteActivity};
