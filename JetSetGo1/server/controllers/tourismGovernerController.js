// const tourismGovernerModel = require('../models/TourismGovernerModel');
const tourismGoverner = require('../models/TourismGovernerModel');

// Create Tourism Governer Profile
const createTourismGovernerProfile = async (req, res) => {
  const {username, password, email } = req.body;

  try {
    const newTourismGoverner = await tourismGoverner.create({ username, password, email });
    res.status(201).json(newTourismGoverner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read Tourism Governer Profile
const getTourismGovernerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const TourismGoverner = await tourismGoverner.findById(id);
    res.status(200).json(TourismGoverner);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

// Update Tourism Governer Profile
const updateTourismGovernerProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTourismGoverner = await tourismGoverner.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedTourismGoverner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



//Delete Tourism Governer Profile
const deleteTourismGoverner = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedTourismGoverner = await tourismGoverner.findByIdAndDelete(id);
      
      if (!deletedTourismGoverner) {
          return res.status(404).json({ message: 'Tourism Governer not found' });
      }
      
      res.status(200).json({ message: 'Tourism Governer deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
module.exports = { createTourismGovernerProfile, getTourismGovernerProfile, updateTourismGovernerProfile ,deleteTourismGoverner};
