const Itinerary = require('../models/ItineraryModel');

const sortItineraryByRating = async (req, res) => {
    try {
      const sortedItineraryByRating = await Itinerary.find().sort({rating: 1});
      res.status(200).json(sortedItineraryByRating);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

module.exports = {sortItineraryByRating };