const TourGuide = require("../models/TourGuideModel");
const Itinerary = require("../models/ItineraryModel");
const multer = require("multer");
const path = require("path");
//66f8084788afe7e5aff3aefc

//Deactivate an itinerary with bookings
const itineraryDeactivation = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Check if the itinerary has existing bookings
    if (itinerary.isBooked) {
      if (itinerary.active) {
        // Deactivate the itinerary
        itinerary.active = false;
        await itinerary.save();
        return res
          .status(200)
          .json({ message: "Itinerary deactivated successfully", itinerary });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating itinerary status", error });
  }
};

//Activate an itinerary with bookings
const itineraryActivation = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Check if the itinerary has existing bookings
    if (itinerary.isBooked) {
      if (!itinerary.active) {
        // Activate the itinerary
        itinerary.active = true;
        await itinerary.save();
        return res
          .status(200)
          .json({ message: "Itinerary activated successfully", itinerary });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating itinerary status", error });
  }
};

// Create Tour Guide Profile

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize upload with storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

const createProfile = async (req, res) => {
  const { id } = req.params;
  const { mobile, experience, previousWork } = req.body;

  try {
    // Find the tour guide by ID
    const tourGuide = await TourGuide.findById(id);

    // Check if the tour guide is accepted
    if (!tourGuide || !tourGuide.accepted) {
      return res.status(403).json({
        error: "You must be accepted as a tour guide to create a profile",
      });
    }
    if (tourGuide.mobile || tourGuide.experience || tourGuide.previousWork) {
      return res.status(403).json({ error: "You already created a profile" });
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

//Read My Itineraries
const showMyItineraries = async (req, res) => {
  const guideId = req.query.guideId;
  try {
    const result = await Itinerary.find({ tourGuide: guideId });
    res.status(200).json(result);
  } catch {
    res.status(400).json({ error: "Id is required" });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const profileImage = req.file ? req.file.path : null;
    console.log(id);
    // Update the advertiser's profile image in the database
    const tourGuide = await TourGuide.findByIdAndUpdate(
      id,
      { profileImage },
      { new: true }
    );

    if (!tourGuide) {
      return res.status(404).json({ error: "Tourguide not found" });
    }

    res.json({
      message: "Profile image uploaded successfully",
      imagePath: profileImage,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// Method to add a rating from a tourist to a tour guide
const addRating = async (req, res) => {
  const { tourGuideId, touristId, rating } = req.body;

  try {
    // Find the tour guide by ID
    const tourGuide = await TourGuide.findById(tourGuideId);

    if (!tourGuide) {
      return res.status(404).json({ message: "Tour Guide not found." });
    }

    // Check if the tourist is associated with the tour guide
    if (!tourGuide.Tourists.includes(touristId)) {
      return res
        .status(400)
        .json({ message: "Tourist not associated with this tour guide." });
    }

    // Check if the tourist has already rated the tour guide
    const existingRating = tourGuide.ratings.find(
      (r) => r.tourist.toString() === touristId
    );
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "Tourist has already rated this tour guide." });
    }

    // Add the new rating
    tourGuide.ratings.push({ tourist: touristId, rating });

    // Calculate the average rating
    const totalRatings = tourGuide.ratings.length;
    const sumOfRatings = tourGuide.ratings.reduce(
      (sum, r) => sum + r.rating,
      0
    );
    tourGuide.rate = sumOfRatings / totalRatings; // Average rating

    await tourGuide.save(); // Save the updated tour guide

    return res
      .status(200)
      .json({ message: "Rating added successfully.", tourGuide });
  } catch (error) {
    return res.status(500).json({ message: "Error adding rating.", error });
  }
};

// Method to add a comment from a tourist
const addComment = async (req, res) => {
  const { tourGuideId, touristId, comment } = req.body;

  try {
    // Find the tour guide by ID
    const tourGuide = await TourGuide.findById(tourGuideId);

    if (!tourGuide) {
      return res.status(404).json({ message: "Tour Guide not found." });
    }

    // Check if the tourist is associated with the tour guide
    if (tourGuide.Tourists.includes(touristId)) {
      tourGuide.comments.push(comment); // Add the comment to the comments array
      await tourGuide.save(); // Save the updated tour guide
      return res
        .status(200)
        .json({ message: "Comment added successfully.", tourGuide });
    } else {
      return res
        .status(400)
        .json({ message: "Tourist not associated with this tour guide." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment.", error });
  }
};

const addItineraryRating = async (req, res) => {
  const { itineraryId, touristId, rating } = req.body;

  try {
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    // Check if the tourist is associated with the itinerary
    if (!itinerary.Tourists.includes(touristId)) {
      return res
        .status(400)
        .json({ message: "Tourist not associated with this itinerary." });
    }

    // Check if the tourist has already rated the itinerary
    const existingRating = itinerary.ratings.find(
      (r) => r.tourist.toString() === touristId
    );
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "Tourist has already rated this itinerary." });
    }

    // Add the new rating
    itinerary.ratings.push({ tourist: touristId, rating });

    // Update the average rating
    const totalRatings = itinerary.ratings.length;
    const sumOfRatings = itinerary.ratings.reduce(
      (sum, r) => sum + r.rating,
      0
    );
    itinerary.rating = sumOfRatings / totalRatings; // Average rating

    await itinerary.save(); // Save the updated itinerary

    return res
      .status(200)
      .json({ message: "Rating added successfully.", itinerary });
  } catch (error) {
    return res.status(500).json({ message: "Error adding rating.", error });
  }
};

// Method to add a comment from a tourist to an itinerary
const addItineraryComment = async (req, res) => {
  const { itineraryId, touristId, comment } = req.body;

  try {
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    // Check if the tourist is associated with the itinerary
    if (itinerary.Tourists.includes(touristId)) {
      itinerary.comments.push(comment); // Add the comment to the comments array
      await itinerary.save(); // Save the updated itinerary
      return res
        .status(200)
        .json({ message: "Comment added successfully.", itinerary });
    } else {
      return res
        .status(400)
        .json({ message: "Tourist not associated with this itinerary." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment.", error });
  }
};

// Method for a tourist to follow an itinerary (add tourist to Itinerary.Tourists)
const followItinerary = async (req, res) => {
  const { itineraryId, touristId } = req.body;

  try {
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    // Check if the tourist is already following the itinerary
    if (itinerary.Tourists.includes(touristId)) {
      return res
        .status(400)
        .json({ message: "Tourist already following this itinerary." });
    }

    // Add the tourist to the Tourists array
    itinerary.Tourists.push(touristId);
    await itinerary.save(); // Save the updated itinerary

    return res
      .status(200)
      .json({ message: "Itinerary followed successfully.", itinerary });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error following itinerary.", error });
  }
};

// Method for a tourist to unfollow an itinerary (remove tourist from Itinerary.Tourists)
const unfollowItinerary = async (req, res) => {
  const { itineraryId, touristId } = req.body;

  try {
    // Find the itinerary by ID
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    // Check if the tourist is actually following the itinerary
    const index = itinerary.Tourists.indexOf(touristId);
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "Tourist is not following this itinerary." });
    }

    // Remove the tourist from the Tourists array
    itinerary.Tourists.splice(index, 1); // Remove tourist by index
    await itinerary.save(); // Save the updated itinerary

    return res
      .status(200)
      .json({ message: "Itinerary unfollowed successfully.", itinerary });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error unfollowing itinerary.", error });
  }
};
// Method for a tourist to follow a tour guide (add tourist to TourGuide.Tourists)
const compeleteWithTourGuide = async (req, res) => {
  const { tourGuideId, touristId } = req.body;

  try {
    // Find the tour guide by ID
    const tourGuide = await TourGuide.findById(tourGuideId);

    if (!tourGuide) {
      return res.status(404).json({ message: "Tour guide not found." });
    }

    // Check if the tourist is already following the tour guide
    if (tourGuide.Tourists.includes(touristId)) {
      return res
        .status(400)
        .json({ message: "Tourist already following this tour guide." });
    }

    // Add the tourist to the Tourists array
    tourGuide.Tourists.push(touristId);
    await tourGuide.save(); // Save the updated tour guide

    return res
      .status(200)
      .json({ message: "Tour guide followed successfully.", tourGuide });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error following tour guide.", error });
  }
};
const uploadDoc = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Docs Only!");
    }
  },
});

const uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No documents uploaded" });
    }

    // Map file paths of uploaded documents
    const documentPaths = req.files.map((file) => file.path);

    // Update the documents array in the database
    const tourGuide = await TourGuide.findByIdAndUpdate(
      id,
      { $push: { documents: { $each: documentPaths } } },
      { new: true }
    );

    if (!tourGuide) {
      return res.status(404).json({ error: "TourGuide not found" });
    }

    res.json({
      message: "Documents uploaded successfully",
      documentPaths: documentPaths,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requestAccountDeletion = async (req, res) => {
  const { id } = req.params;

  try {
    const tourGuide = await TourGuide.findById(id);
    if (!tourGuide) return res.status(404).json({ error: "User not found" });

    // Update requestedDeletion field
    tourGuide.deletionRequested = true;
    await tourGuide.save();

    return res
      .status(200)
      .json({ message: "Deletion request submitted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "An error occurred while processing the deletion request.",
      });
  }
};

module.exports = {
  upload,
  createProfile,
  updateProfile,
  getProfile,
  createItinerary,
  getItineraries,
  updateItinerary,
  deleteItinerary,
  showMyItineraries,
  uploadProfileImage,
  requestAccountDeletion,
  uploadDocument,
  uploadDoc,
  upload,
  itineraryActivation,
  itineraryDeactivation,
  uploadProfileImage,
};
