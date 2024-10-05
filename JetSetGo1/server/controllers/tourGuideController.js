const TourGuide = require("../models/TourGuideModel");
const Itinerary = require("../models/ItineraryModel");
//66f8084788afe7e5aff3aefc
// Create Tour Guide Profile
const createProfile = async (req, res) => {
  const {
    mobile_number,
    years_of_experience,
    previous_work,
    password,
    username,
    email,
  } = req.body;

  try {
    const newProfile = await TourGuide.create({
      mobile_number,
      years_of_experience,
      previous_work,
      password,
      username,
      email,
    });
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Tour Guide Profile
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProfile = await TourGuide.findByIdAndUpdate(id, updates, {
      new: true,
    });
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
    res.status(404).json({ error: "Profile not found" });
  }
};

// Create a new itinerary with timeline, duration, and locations calculated from activities
const createItinerary = async (req, res) => {
  try {
    const {
      title,
      description,
      tourGuide,
      activities,
      locations,
      timeline,
      language,
      price,
      availableDates,
      accessibility,
      pickupLocation,
      dropoffLocation,
      isBooked,
      tags,
      rating,
    } = req.body;

    // Expect activities to be provided as an array of strings
    const itinerary = new Itinerary({
      title,
      description,
      tourGuide,
      activities, // This is now an object with 'name' and 'duration' arrays
      locations,
      timeline,
      language,
      price,
      availableDates,
      accessibility,
      pickupLocation,
      dropoffLocation,
      isBooked,
      tags,
      rating,
    });

    await itinerary.save();
    res
      .status(201)
      .json({ message: "Itinerary created successfully", itinerary });
  } catch (error) {
    res.status(400).json({ message: "Error creating itinerary", error });
  }
};

const getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate("tourGuide"); // No change needed for 'activities'
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(400).json({ message: "Error fetching itineraries", error });
  }
};

updateItinerary = async (req, res) => {
  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }
    res
      .status(200)
      .json({ message: "Itinerary updated successfully", updatedItinerary });
  } catch (error) {
    res.status(400).json({ message: "Error updating itinerary", error });
  }
};

const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // If bookings exist, we won't delete the itinerary
    if (itinerary.isBooked) {
      return res
        .status(400)
        .json({ message: "Cannot delete itinerary with existing bookings" });
    }

    await Itinerary.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting itinerary", error });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
  createItinerary,
  getItineraries,
  updateItinerary,
  deleteItinerary,
};
