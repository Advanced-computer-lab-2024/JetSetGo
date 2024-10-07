const TourGuide = require("../models/TourGuideModel");
const Itinerary = require("../models/ItineraryModel");
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
      return res.status(403).json({
        error: "You must be accepted as a tour guide to update your profile",
      });
    }

    // If accepted, update the profile
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
    // Find the tour guide by ID
    const profile = await TourGuide.findById(id);

    // Check if the profile exists and if the tour guide is accepted
    if (!profile || !profile.accepted) {
      return res.status(403).json({
        error: "You must be accepted as a tour guide to view the profile",
      });
    }

    // Return the profile data if accepted
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

const updateItinerary = async (req, res) => {
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
