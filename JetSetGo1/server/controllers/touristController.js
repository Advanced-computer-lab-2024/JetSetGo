const TransportBooking = require('../models/TransportationBookingModel');
const Tourist = require('../models/TouristModel');

// Create TransportBooking
const createTransportBooking = async (req, res) => {
    const {transportationId, touristId, date} = req.body;
  
    try {
      const newTransportBooking = await TransportBooking.create({ transportationId, touristId, date});
      res.status(201).json(newTransportBooking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Read Transportation
  const getTransportBooking = async (req, res) => {
  // const { id } = req.params;
  
    try {
      const TransportBookingProfile = await TransportBooking.find();
      res.status(200).json(TransportBookingProfile);
    } catch (err) {
      res.status(404).json({ error: 'Transportation Booking not found' });
    }
  };
  
  
  //Delete Transportation
  const deleteTransportBooking = async (req, res) => {
    const { id } = req.params;
  
    try {
        const deleteTransportBooking = await TransportBooking.findById(id);
        
        if (!deleteTransportBooking) {
            return res.status(404).json({ message: 'Transportation Booking not found' });
        } else{

        const bookingDate = deleteTransportBooking.date;
        const hoursDiff = (new Date(bookingDate) - new Date()) / (1000 * 60 * 60);

    if (hoursDiff < 48) {
      return res.status(400).json({ message: 'Cannot cancel within 48 hours' });
    }
    else{

        await TransportBooking.deleteOne({ _id:deleteTransportBooking._id});
        res.status(200).json({ message: 'Transportation Booking deleted successfully' });

    }

    } }catch (err) {
        res.status(500).json({ error: err.message });
    }
  };


  
  const selectPrefrences = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const myPrefrences = await Tourist.findByIdAndUpdate(id, {$push:{ prefrences :updates}}, { new: true });
      res.status(200).json(myPrefrences);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const getPrefrences = async (req, res) => {
     const { id } = req.params;
    
      try {
        const TouristProfile = await Tourist.findById(id);
        const PrefrencesProfile = TouristProfile.prefrences;
        res.status(200).json(PrefrencesProfile);
      } catch (err) {
        res.status(404).json({ error: 'Tourist not found' });
      }
    };
  


module.exports = { createTransportBooking, getTransportBooking, deleteTransportBooking, selectPrefrences, getPrefrences}



/*{
    "transportationId": "67129e1f0f09f130c62ebefc",
    "touristId": "6702c601367bb353e255fd87",
    "date": "2024-10-26T00:00:00.000Z",
    "_id": "6712abcd9e2f5009bf10d6ef",
    "createdAt": "2024-10-18T18:41:17.974Z",
    "__v": 0
}
    
{
    "transportationId": "67129e570f09f130c62ebefe",
    "touristId": "6702c601367bb353e255fd87",
    "date": "2024-10-19T00:00:00.000Z",
    "_id": "6712ac139e2f5009bf10d6f1",
    "createdAt": "2024-10-18T18:42:27.530Z",
    "__v": 0
}*/ 