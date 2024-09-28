const TourGuide = require('../models/TourGuideModel'); 
//66f8084788afe7e5aff3aefc
// Create Tour Guide Profile
const createProfile = async (req, res) => {
  const { mobile_number, years_of_experience, previous_work,password, username, email } = req.body;

  try {
    const newProfile = await TourGuide.create({ mobile_number, years_of_experience, previous_work, password,username, email });
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Tour Guide Profile
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProfile = await TourGuide.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Tour Guide Profile
const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await TourGuide.findById(id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

module.exports = { createProfile, updateProfile, getProfile };
