// const express = require('express');
const express = require('express');

const {
  createProfile,
  updateProfile,
  getProfile,
  createItinerary,
  getItineraries,
  updateItinerary,
  deleteItinerary,
  showMyItineraries,
} = require("../controllers/tourGuideController");

const router = express.Router();

router.post("/test", (req, res) => {
  res.send("Tour Guide Test Route is working!");
});


router.get('/showAll', showMyItineraries )

const { changePassword } = require("../controllers/PasswordController");
router.put("/change-password/:id/:modelName", changePassword);


// const router = express.Router();

// Add this above other routes


// const router = express.Router();

// Create or Update Tour Guide Profile
// router.post('/create', createProfile);
router.patch('/update/:id', updateProfile);
router.get('/profile/:id', getProfile);
// Create or Update Tour Guide Profile
router.post("/create/:id", createProfile);
// router.patch("/update/:id", updateProfile);
// router.get("/profile/:id", getProfile);
router.post("/createItinerary", createItinerary);
router.get("/getItineraries", getItineraries);
router.patch("/updateItinerary/:id", updateItinerary);
router.delete("/deleteItinerary/:id", deleteItinerary);

//66f80af288afe7e5aff3af00
module.exports = router;
