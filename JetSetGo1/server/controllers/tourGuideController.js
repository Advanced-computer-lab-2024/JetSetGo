const TourGuideModel = require('../models/TourGuideModel');
const tourGuide = require('../models/TourGuideModel');

// Create Tour Guide Profile
const createTourGuideProfile = async (req, res) => {
  const { company_name, company_profile, hotline, website_link, username, email } = req.body;

  try {
    const newTourGuide = await tourGuide.create({ company_name, company_profile, hotline, website_link, username, email });
    res.status(201).json(newTourGuide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read Tour Guide Profile
const getTourGuideProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const TourGuide = await tourGuide.findById(id);
    res.status(200).json(TourGuide);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

// Update Tour Guide Profile
const updateTourGuideProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTourGuide = await tourGuide.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedTourGuide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



//Delete Tour Guide Profile
const deleteTourGuide = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedTourGuide = await tourGuide.findByIdAndDelete(id);
      
      if (!deletedTourGuide) {
          return res.status(404).json({ message: 'Tour Guide not found' });
      }
      
      res.status(200).json({ message: 'Tour Guide deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
module.exports = { createTourGuideProfile, getTourGuideProfile, updateTourGuideProfile ,deleteTourGuide};
