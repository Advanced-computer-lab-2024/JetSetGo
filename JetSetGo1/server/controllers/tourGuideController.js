const TourGuide = require('../models/TourGuideModel'); 
//66f8084788afe7e5aff3aefc
// Create Tour Guide Profile
const createProfile = async (req, res) => {           
  const { id } = req.params;
  const { mobile, experience, previousWork} = req.body;

  try {
      // Find the tour guide by ID
      const tourGuide = await TourGuide.findById(id);
  
      // Check if the tour guide is accepted
      if (!tourGuide || !tourGuide.accepted) {
          return res.status(403).json({ error: 'You must be accepted as a tour guide to create a profile' });
      }
      if(tourGuide.mobile ||tourGuide.experience || tourGuide.previousWork){
        return res.status(403).json({ error: 'You already created a profile' });

      }
      // Update the tour guide profile with new information
      tourGuide.mobile = mobile;
      tourGuide.experience = experience;
      tourGuide.previousWork = previousWork;


      // Save the updated profile
      await tourGuide.save();
      res.status(200).json(tourGuide);

  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};


const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the tour guide by ID
    const profile = await TourGuide.findById(id);

    // Check if the profile exists and if the tour guide is accepted
    if (!profile || !profile.accepted) {
      return res.status(403).json({ error: 'You must be accepted as a tour guide to update your profile' });
    }

    // If accepted, update the profile
    const updatedProfile = await TourGuide.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedProfile);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get Tour Guide Profile
const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the tour guide by ID
    const profile = await TourGuide.findById(id);

    // Check if the profile exists and if the tour guide is accepted
    if (!profile || !profile.accepted) {
      return res.status(403).json({ error: 'You must be accepted as a tour guide to view the profile' });
    }

    // Return the profile data if accepted
    res.status(200).json(profile);

  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};
module.exports = { createProfile, updateProfile, getProfile };