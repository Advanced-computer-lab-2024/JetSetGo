const Itinerary = require('../models/ItineraryModel');

const getItineraries = async (req, res) => {
    try {
      const itinerary = await Itinerary.find();
      res.status(200).json(itinerary);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const sortItineraryByPrice = async (req, res) => {
    try {
      const sortedItineraryByPrice = await Itinerary.find().sort({price: 1});
      res.status(200).json(sortedItineraryByPrice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

const sortItineraryByRating = async (req, res) => {
    try {
      const sortedItineraryByRating = await Itinerary.find().sort({rating: 1});
      res.status(200).json(sortedItineraryByRating);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

module.exports = {getItineraries, sortItineraryByPrice, sortItineraryByRating };