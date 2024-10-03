const Tourist = require('../models/touristModel'); 
//66f8084788afe7e5aff3aefc

// Update tourist information
const updateInfo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedInfo = await Tourist.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedInfo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get tourist information
const getInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Tourist.findById(id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

module.exports = {updateInfo, getInfo };
