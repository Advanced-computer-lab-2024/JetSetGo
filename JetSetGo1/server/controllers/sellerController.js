const Seller = require('../models/SellerModel');

// Create Seller Profile
const createSellerProfile = async (req, res) => {
  const { name, description, username, email } = req.body;

  try {
    const newSeller = await Seller.create({ name, description, username, email });
    res.status(201).json(newSeller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Seller Profile
const updateSellerProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
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
    const seller = await Seller.findById(id);
    res.status(200).json(seller);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

module.exports = { createSellerProfile, updateSellerProfile, getSellerProfile };
