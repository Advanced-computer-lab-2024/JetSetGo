const bcrypt = require('bcrypt');
const Admin = require('../models/AdminModel');
const Advertiser = require('../models/AdvertiserModel');
const TourGuide = require('../models/TourGuideModel');
const Tourist = require('../models/TouristModel');
const TourismGoverner = require('../models/TourismGovernerModel')
const Seller = require('../models/SellerModel')



const getModelByUserType = (userType) => {
    switch (userType) {
        case 'Admin':
            return Admin;
        case 'Advertiser':
            return Advertiser;
        case 'TourGuide':
            return TourGuide;
        case 'Tourist':
            return Tourist;
        case 'TourismGovernor':
             return TourismGoverner;
        case 'Seller':
            return Seller
        // Add cases for other user types as needed
        default:
            throw new Error('Invalid user type');
    }
};


const changePassword = async (req, res) => {
    const { userId, type } = req.user; // assuming auth middleware adds user data to req.user
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Both old and new passwords are required.' });
    }

    try {
        // Get the model based on user type
        const UserModel = getModelByUserType(type);
        
        // Find the user in the appropriate collection
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect old password.' });
        }

        // Hash the new password and save it
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'Password changed successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while changing the password.' });
    }
};

module.exports = { changePassword };
