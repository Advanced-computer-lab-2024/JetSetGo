const tourismGoverner = require('../models/TourismGovernerModel');
const MuseumOrHistoricalPlace = require('../models/MuseumModel');

const tag = require('../models/TagModel');


// Create Museum or historical place
const createMuseumOrHistoricalPlace = async (req, res) => {
  const {name, description, location, openingHours, ticketPrices, pictures, tags, category, governor } = req.body;

  try {
    const newMuseumOrHistoricalPlace = await MuseumOrHistoricalPlace.create({ name, description, location, openingHours, ticketPrices, pictures, tags, category, governor });
    res.status(201).json(newMuseumOrHistoricalPlace);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read Museum or historical place
const getMuseumOrHistoricalPlace = async (req, res) => {
const { id } = req.params;

  try {
    const MuseumOrHistoricalPlaceProfile = await MuseumOrHistoricalPlace.findById(id);
    res.status(200).json(MuseumOrHistoricalPlaceProfile);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

// Update Museum or historical place
const updateMuseumOrHistoricalPlace = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedMuseumOrHistoricalPlace = await MuseumOrHistoricalPlace.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedMuseumOrHistoricalPlace);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



//Delete Museum or historical place 
const deleteMuseumOrHistoricalPlace = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedMuseumOrHistoricalPlace = await MuseumOrHistoricalPlace.findByIdAndDelete(id);
      
      if (!deletedMuseumOrHistoricalPlace) {
          return res.status(404).json({ message: 'Museum or historical place not found' });
      }
      
      res.status(200).json({ message: 'Museum or historical place deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Create a tag
const createTag = async (req, res) => {
    const {type, historicalPeriod} = req.body;
  
    try {
      const newTag = await tag.create({ type, historicalPeriod});
      res.status(201).json(newTag);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  //Read my Museums/historical places
  


module.exports = { createMuseumOrHistoricalPlace, getMuseumOrHistoricalPlace, updateMuseumOrHistoricalPlace ,deleteMuseumOrHistoricalPlace, createTag};
