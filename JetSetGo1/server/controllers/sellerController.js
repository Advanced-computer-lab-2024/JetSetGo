const Seller = require('../models/SellerModel');


// Create Seller Profile
const createSellerProfile = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
      // Find the seller by ID
      const seller = await Seller.findById(id);

      // Check if the seller is accepted
      if (!seller || !seller.accepted) {
          return res.status(403).json({ error: 'You must be accepted as a seller to create a profile' });
      }

      // Check if the profile fields are already set
      if (seller.name || seller.description) {
          return res.status(403).json({ error: 'You already created a profile' });
      }

      // Update the seller profile with new information
      seller.name = name;
      seller.description = description;

      // Save the updated profile
      await seller.save();
      res.status(200).json(seller);

  } catch (err) {
    console.log("i am here")
      res.status(400).json({ error: err.message });
  }
};


// Update Seller Profile
const updateSellerProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the seller by ID
    const seller = await Seller.findById(id);

    // Check if the seller exists and if they are accepted
    if (!seller || !seller.accepted) {
      return res.status(403).json({ error: 'You must be accepted as a seller to update your profile' });
    }

    // If accepted, update the profile with the provided updates
    const updatedSeller = await Seller.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedSeller);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get Seller Profile
const getSellerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the seller by ID
    const seller = await Seller.findById(id);

    // Check if the seller exists and if they are accepted
    if (!seller || !seller.accepted) {
      return res.status(403).json({ error: 'You must be accepted as a seller to view the profile' });
    }

    // Return the profile data if accepted
    res.status(200).json(seller);

  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

module.exports = { createSellerProfile, updateSellerProfile, getSellerProfile};
