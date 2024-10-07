const Admin = require('../models/AdminModel');
//const Account = require('../models/GuestModel');
const Seller = require('../models/SellerModel');
const TourGuide = require('../models/TourGuideModel');
const Tourist = require('../models/TouristModel');
const Advertiser = require('../models/AdvertiserModel');

const TourismGoverner = require('../models/TourismGoverner');
const express = require('express');

//66f8084788afe7e5aff3aefc

//Dynamic model deletion utility
const models={admin: Admin, seller: Seller, tourguides: TourGuide, tourist: Tourist, advertisers: Advertiser, tourismgoverner: TourismGoverner};


// Add Admin 
const addAdmin = async (req, res) => {
  const { username, password } = req.body;

  // Validate that the required fields are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const newAdmin = await Admin.create({ username, password });

    // Send both a success message and the new admin object in the response
    return res.status(201).json({
      message: 'Admin added successfully',
      admin: newAdmin
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Delete Account
const deleteAccount= async (req, res) => {
  const { id , modelName} = req.params;

  //Check if model exists
  const Model = models[modelName.toLowerCase()];

  if(!Model){
    return resizeTo.status(400).json({error: `Model '${modelName}' not found`});
  }
  try {
    const deletedAccount = await Model.findByIdAndDelete(id);
    if(!deletedAccount){
        return resizeTo.status(404).json({erro:'This account does not exist'});
    }
    res.status(200).json({message:'Account deleted successfully',deletedAccount});
  } catch (err) {
    res.status(400).json({ error: err.message});
  }
};
// Get all users for a specific role
const getAllUsers = async (req, res) => {
  const { role } = req.params;

  // Check if model exists
  const Model = models[role.toLowerCase()];

  if (!Model) {
    return res.status(400).json({ error: `Model '${role}' not found` });
  }

  try {
    const users = await Model.find(); // Fetch all users for the specified model
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {addAdmin, deleteAccount, getAllUsers};
