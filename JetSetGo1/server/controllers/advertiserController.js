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
  