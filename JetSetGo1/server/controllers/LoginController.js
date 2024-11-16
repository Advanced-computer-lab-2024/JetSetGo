const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const Tourist = require("../models/TouristModels");
const Advertiser = require('../models/AdvertiserModel');
const TourGuide = require("../models/TourGuideModel");
const Seller = require('../models/SellerModel');
const Admin = require('../models/AdminModel');
const TourismGoverner = require('../models/TourismGovernerModel');

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET; // Use environment variables in production

// Login function
const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate token with 24-hour expiry
      const token = jwt.sign(
        { id: user._id, userType: user.userType },
        JWT_SECRET,
        { expiresIn: '24h' } // Set expiration to 24 hours
      );
  
      res.json({ token, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

// Logout function
const  logout = (req, res) => {
  // If using token-based authentication, this can simply inform the client to delete the token
  res.json({ message: 'Logout successful' });
};

// Create User function
const createUser = async (req, res) => {
  const { username, password, userType, userDetails } = req.body;

  try {
    // Ensure userType is valid
    if (!['Tourist', 'Advertiser', 'TourGuide', 'Seller', 'Admin', 'TourismGoverner'].includes(userType)) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: password,
      userType,
      userDetails
    });

    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Populate User Data
const populateUserData = async (req, res) => {
  try {
    // List of models
    const models = {
      Tourist,
      Advertiser,
      TourGuide,
      Seller,
      Admin,
      TourismGoverner,
    };

    // Iterate over each model to populate user data
    for (const [key, Model] of Object.entries(models)) {
      // Fetch all data from each model
      const data = await Model.find();
      const all = [];
      // For each data item from the model, create a user and populate userDetails
      for (const item of data) {
        try {
          // Check if a user already exists with the same username
          const existingUser = await User.findOne({ username: item.username });

          // If user exists, skip to the next one
          if (existingUser) {
            console.log(`User with username ${item.name || item.email} already exists, skipping...`);
            continue; // Skip the current iteration
          }

          // Set a plain-text password (customize this as needed)
          // const password = 'defaultPassword123'; // You can set your custom password here

          // Create a new user document with plain-text password
          const newUser = new User({
            username: item.name || item.email, // Or any unique identifier, change based on your model
            password: item.password,                // Use plain text password
            userType: key,                     // Assign the model name as the user type
            userDetails: item._id,             // Link the user to the details from the current model
          });

          // Save the user to the database
          all.push(newUser);
          await newUser.save();
        } catch (err) {
          // Handle duplicate key error (E11000)
          if (err.code === 11000) {
            console.log(`Duplicate key error: ${err.keyValue.username}, skipping this item...`);
            continue; // Skip this item and continue with the next
          } else {
            console.error(`Error while processing item: ${item}`, err);
          }
        }
      }
    }

    // After processing all models, send a success message
    res.status(200).json({ message: 'User data populated successfully' , all ,  count:`count:${all.length}`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while populating user data' });
  }
};


const getUsersWithDefaultPassword = async (req,res) => {
  try {
    // Define the default password to search for
    const defaultPassword = 'defaultPassword123';

    console.log('Starting query to fetch users with the default password...');

    // Find all users with the default password
    const users = await User.find({ password: defaultPassword });

    // Log the number of users fetched
    console.log(`Query completed. Found ${users.length} users with the default password.`);

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error while fetching users with default password:', error);
    throw new Error('Failed to fetch users with default password');
  }
};


const deleteAllUsers = async (req,res) => {
  try {
    console.log('Starting to delete all users...');

    // Delete all users
    const result = await User.deleteMany({});

    console.log(`Deletion completed. Deleted ${result.deletedCount} users.`);
    // return result.deletedCount;
    res.status(200).json({ message: `All users deleted successfully${result.deletedCount}` });  
  } catch (error) {
    console.error('Error while deleting all users:', error);
    throw new Error('Failed to delete all users');
  }
};

const fetchAllUsers = async (req,res) => {
  try {
    console.log('Fetching all users from the database...');

    // Fetch all users
    const users = await User.find();

    console.log(`Fetch completed. Found ${users.length} users.`);
    // return users;
    res.status(200).json(users);
  } catch (error) {
    console.error('Error while fetching all users:', error);
    throw new Error('Failed to fetch all users');
  }
};


module.exports = { logout, populateUserData, login, createUser, getUsersWithDefaultPassword ,deleteAllUsers,fetchAllUsers};