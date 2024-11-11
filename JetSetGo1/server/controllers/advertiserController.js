const Advertiser = require('../models/AdvertiserModel');
const Activity = require('../models/AdvertiserActivityModel');
const Itinerary = require ('../models/ItineraryModel');
const multer = require('multer');
const path = require('path');
const Transportation = require('../models/TransportationModel');




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




// Create Transportation
const createTransportation = async (req, res) => {
    const {vehicle, carModel, days, time, cLocation, bLocation, price, advertiser} = req.body;

    const transportData = {
      vehicle,
      days,
      time,
      price,
      advertiser,
    };
  
    // Conditionally add fields based on vehicle type
    if (vehicle === 'car') {
      transportData.carModel = carModel;
      transportData.cLocation = cLocation;
    } else if (vehicle === 'bus') {
      transportData.bLocation = bLocation;
    }
  

    try {
      const newTransportation = await Transportation.create(transportData);
      res.status(201).json(newTransportation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Read Transportation
  const getTransportation = async (req, res) => {
  // const { id } = req.params;
  
    try {
      const TransportationProfile = await Transportation.find();
      res.status(200).json(TransportationProfile);
    } catch (err) {
      res.status(404).json({ error: 'Transportation not found' });
    }
  };
  
  // Update Transportation 
  const updateTransportation = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const updatedTransportation = await Transportation.findByIdAndUpdate(id, updates, { new: true });
      res.status(200).json(updatedTransportation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  //Delete Transportation
  const deleteTransportation = async (req, res) => {
    const { id } = req.params;
  
    try {
        const deletedTransportation = await Transportation.findByIdAndDelete(id);
        
        if (!deletedTransportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }
        
        res.status(200).json({ message: 'Transportation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

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


    const {id} = req.body;

try{
        const result = await Activity.find({advertiser:(id)})
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

const requestAccountDeletion = async (req, res) => {
  const {id } = req.params;
  

  try {
      const advertiser = await Advertiser.findById(id);
      if (!advertiser) return res.status(404).json({ error: "User not found" });

      // Update requestedDeletion field
      advertiser.deletionRequested = true;
      await advertiser.save();

      return res.status(200).json({ message: "Deletion request submitted successfully." });
  } catch (error) {
      return res.status(500).json({ error: "An error occurred while processing the deletion request." });
  }
};

const uploadDoc = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Docs Only!');
    }
  }
});

const uploadDocument = async (req, res) => {
  try {
      const { id } = req.params;

      // Check if files were uploaded
      if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: "No documents uploaded" });
      }

      // Map file paths of uploaded documents
      const documentPaths = req.files.map(file => file.path);

      // Update the documents array in the database
      const advertiser = await Advertiser.findByIdAndUpdate(
          id,
          { $push: { documents: { $each: documentPaths } } },
          { new: true }
      );

      if (!advertiser) {
          return res.status(404).json({ error: "TourGuide not found" });
      }

      res.json({
          message: "Documents uploaded successfully",
          documentPaths: documentPaths
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};





const findtransport = async (req, res) => {
  const { id } = req.params;

  try {
    const transportData = await Transportation.findById(id);
    if (!transportData) {
      return res.status(404).json({ error: 'Transportation post not found' });
    }
    res.status(200).json(transportData);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the transportation post' });
  }
};


const findReferenceDetails = async (req, res) => {
  const { id, type } = req.params;

  try {
    let details;
    if (type === 'Activity') {
      details = await Activity.findById(id);
    } else if (type === 'Itinerary') {
      details = await Itinerary.findById(id);
    }

    if (!details) {
      return res.status(404).json({ error: `${type} not found` });
    }
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ error: `An error occurred while fetching the ${type} details` });
  }
};

module.exports = {requestAccountDeletion,upload,createAdvertiserProfile,updateAdvertiserProfile, getAdvertiserProfile ,deleteActivity,getActivities,updateActivity,createActivity,showMyActivities,changePassword,uploadProfileImage,  createTransportation, getTransportation, updateTransportation, deleteTransportation,uploadDocument,uploadDoc, findtransport};

