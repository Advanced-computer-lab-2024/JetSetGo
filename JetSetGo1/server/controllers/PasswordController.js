const bcrypt = require('bcrypt');
const Admin = require('../models/AdminModel');
const Advertiser = require('../models/AdvertiserModel');
const TourGuide = require('../models/TourGuideModel');
const Tourist = require('../models/touristModel');
const TourismGoverner = require('../models/TourismGovernerModel')
const Seller = require('../models/SellerModel')

const models={admin: Admin, seller: Seller, tourguides: TourGuide, tourist: Tourist, advertisers: Advertiser, tourismgoverner: TourismGoverner};

const changePassword = async (req, res) => {
    const { id, modelName } = req.params;
    const { oldPassword, newPassword } = req.body;

    const Model = models[modelName.toLowerCase()];
    
    if (!Model) {
        return resizeTo
          .status(400)
          .json({ error: `Model '${modelName}' not found` });
      }

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Both old and new passwords are required.' });
    }
    console.log("before the try")
    try {
        // Get the model based on user type
        console.log("before const user = ")
        // Find the user in the appropriate collection
        const user = await Model.findById(id);
        console.log("after const user = ")
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        console.log("after !user")

        // Verify old password
       
        if (oldPassword != user.password) {
            return res.status(400).json({ error: 'Incorrect old password.' });
        }

        // Hash the new password and save it
        user.password = newPassword
        await user.save();

        res.status(200).json({ message: 'Password changed successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { changePassword };