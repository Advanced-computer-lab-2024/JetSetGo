const express = require("express");
const {
  createProfile,
  updateProfile,
  getProfile,
  createItinerary,
  getItineraries,
  updateItinerary,
  deleteItinerary,
} = require("../controllers/tourGuideController");

const router = express.Router();

// Create or Update Tour Guide Profile
router.post("/create", createProfile);
router.patch("/update/:id", updateProfile);
router.get("/profile/:id", getProfile);
router.post("/createItinerary", createItinerary);
router.get("/getItineraries", getItineraries);
router.patch("/updateItinerary/:id", updateItinerary);
router.delete("/deleteItinerary/:id", deleteItinerary);
//66f80af288afe7e5aff3af00
module.exports = router;
