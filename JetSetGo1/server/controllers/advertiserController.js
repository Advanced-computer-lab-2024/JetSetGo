const Advertiser = require('../models/AdvertiserModel');


// Update Advertiser Profile
const updateAdvertiserProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
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
    const advertiser = await Advertiser.findById(id);
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


module.exports = { updateAdvertiserProfile, getAdvertiserProfile ,deleteActivity};
const Activity = require('../models/AdvertiserActivityModel');

  
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

module.exports = { showMyActivities}
  