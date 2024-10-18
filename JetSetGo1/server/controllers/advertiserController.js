const Advertiser = require('../models/AdvertiserModel');
const Activity = require('../models/AdvertiserActivityModel');
const multer = require('multer');
const path = require('path');



// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload with storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});




const createAdvertiserProfile = async (req, res) => {
  const { id } = req.params;
  const { companyProfile, websiteLink, hotline } = req.body;

  try {
      // Find the advertiser by ID
      const advertiser = await Advertiser.findById(id);
  
      // Check if the advertiser is accepted
      if (!advertiser || !advertiser.accepted) {
          return res.status(403).json({ error: 'You must be accepted as an advertiser to create a profile' });
      }

      // Check if the profile fields are already set
      if (advertiser.companyProfile || advertiser.websiteLink || advertiser.hotline) {
          return res.status(403).json({ error: 'You already created a profile' });
      }

      // Update the advertiser profile with new information
      advertiser.companyProfile = companyProfile;
      advertiser.websiteLink = websiteLink;
      advertiser.hotline = hotline;

      // Save the updated profile
      await advertiser.save();
      res.status(200).json(advertiser);

  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};

// Update Advertiser Profile
const updateAdvertiserProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the advertiser by ID
    const advertiser = await Advertiser.findById(id);

    // Check if the advertiser exists and if they are accepted
    if (!advertiser || !advertiser.accepted) {
      return res.status(403).json({ error: 'You must be accepted as an advertiser to update your profile' });
    }

    // If accepted, update the profile
    const updatedAdvertiser = await Advertiser.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedAdvertiser);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Advertiser Profile
const getAdvertiserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the advertiser by ID
    const advertiser = await Advertiser.findById(id);

    // Check if the advertiser exists and if they are accepted
    if (!advertiser || !advertiser.accepted) {
      return res.status(403).json({ error: 'You must be accepted as an advertiser to view the profile' });
    }

    // Return the profile data if accepted
    res.status(200).json(advertiser);

  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};
///delete activity
const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedActivity = await Activity.findByIdAndDelete(id);
      
      if (!deletedActivity) {
          return res.status(404).json({ message: 'Activity not found' });
      }
      
      res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Create Activity
const createActivity = async (req, res) => {
  const {title,date,time,location,price,category,tags,advertiser,bookingOpen,specialDiscounts} = req.body;

  try {
    const newActivity = await Activity.create({ title, date, time, location, price, category, tags, bookingOpen,advertiser,specialDiscounts });
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Activity
const updateActivity = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
 
  try {
    let updatedActivity;

    // Check if there's a new tag to add in the request body
    if (updates.newTag) {
      const { newTag, ...otherUpdates } = updates; // Destructure to separate the newTag from other updates
      // Add the new tag and update other fields
      updatedActivity = await Activity.findByIdAndUpdate(id,{ $push: { tags: newTag },
                                                              $set: otherUpdates, // Update other fields if provided
                                                             },
                                                                 { new: true }
      );
    } 
    else{
      updatedActivity = await Activity.findByIdAndUpdate(id, updates, { new: true });
    } 
    res.status(200).json(updatedActivity); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Read my Activities
const showMyActivities = async(req,res) => {


    const AdvId = req.query.AdvId;

try{
        const result = await Activity.find({advertiser:(AdvId)})
        res.status(200).json(result)
    } catch{
        res.status(400).json({error:"Id is required"})
    }
}

const changePassword = async (req, res) => {
  const { id } = req.params; // Get the user ID from the route parameters
  const { oldPassword, newPassword } = req.body; // Get old and new passwords from the body

  // Validate input
  if (!id || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "User ID, old password, and new password are required." });
  }

  try {
  
      const user = await Advertiser.findById(id);

      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

      // Compare old password
      const isMatch = await bcrypt.compare(oldPassword, user.password); // Assuming you're using bcrypt

      if (!isMatch) {
          return res.status(400).json({ error: "Old password is incorrect." });
      }

      // Update password
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const profileImage = req.file ? req.file.path : null;

    // Update the advertiser's profile image in the database
    const advertiser = await Advertiser.findByIdAndUpdate(
      id,
      { profileImage },
      { new: true }
    );

    if (!advertiser) {
      return res.status(404).json({ error: 'Advertiser not found' });
    }

    res.json({ message: 'Profile image uploaded successfully', imagePath: profileImage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

module.exports = {upload,createAdvertiserProfile,updateAdvertiserProfile, getAdvertiserProfile ,deleteActivity,getActivities,updateActivity,createActivity,showMyActivities,changePassword,uploadProfileImage};
