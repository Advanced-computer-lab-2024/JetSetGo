const Advertiser = require('../models/AdvertiserModel');
const Activity = require('../models/AdvertiserActivityModel');
const Transportation = require('../models/TransportationModel');

// Create Transportation
const createTransportation = async (req, res) => {
    const {carModel, days, time, location, price, advertiser} = req.body;
  
    try {
      const newTransportation = await Transportation.create({ carModel, days, time, location, price, advertiser});
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


    const AdvId = req.query.AdvId;

try{
        const result = await Activity.find({advertiser:(AdvId)})
        res.status(200).json(result)
    } catch{
        res.status(400).json({error:"Id is required"})
    }
}

module.exports = { showMyActivities, createTransportation, getTransportation, updateTransportation, deleteTransportation}



/*[
    {
        "_id": "67129e1f0f09f130c62ebefc",
        "carModel": "Tesla",
        "days": [
            "Monday",
            "Tuesday"
        ],
        "time": "12PM-6PM",
        "location": "Cairo",
        "price": 3000,
        "totalrating": "0",
        "advertiser": "66ff041bf99d83cc77b8cb2b",
        "ratings": [],
        "bookings": [],
        "createdAt": "2024-10-18T17:42:55.310Z",
        "__v": 0
    },
    {
        "_id": "67129e570f09f130c62ebefe",
        "carModel": "Mustang",
        "days": [
            "Friday",
            "Saturday",
            "Sunday"
        ],
        "time": "8PM-6AM",
        "location": "Cairo",
        "price": 3000,
        "totalrating": "0",
        "advertiser": "66ff041bf99d83cc77b8cb2b",
        "ratings": [],
        "bookings": [],
        "createdAt": "2024-10-18T17:43:51.260Z",
        "__v": 0
    }
]*/ 
  