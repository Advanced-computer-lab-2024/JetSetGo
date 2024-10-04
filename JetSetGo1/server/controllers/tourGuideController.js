const ItineraryModel = require('../models/ItineraryModel');

//Read My Itineraries
const showMyItineraries = async(req,res) => {
   

    const guideId = req.query.guideId;

    try{
        const result = await ItineraryModel.find({tourGuide:(guideId)})
        res.status(200).json(result)
      }catch{
        res.status(400).json({error:"Id is required"})
      }
  

}
  

module.exports = { showMyItineraries}const TourGuide = require('../models/TourGuideModel'); 
//66f8084788afe7e5aff3aefc

// Update Tour Guide Profile
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
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
    const profile = await TourGuide.findById(id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

module.exports = { updateProfile, getProfile };
