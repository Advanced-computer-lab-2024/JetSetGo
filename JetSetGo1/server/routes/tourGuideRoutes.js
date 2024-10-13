// const express = require('express');
const express = require('express');
// const multer = require('../config/multer');

const {
  createProfile,
  updateProfile,
  getProfile,
  createItinerary,
  getItineraries,
  updateItinerary,
  deleteItinerary,
  showMyItineraries,
  addItineraryRating,
  addItineraryComment,
  addRating,
  addComment,
} = require("../controllers/tourGuideController");
const tourGuideController = require('../controllers/tourGuideController')
const router = express.Router();


const {upload} = require('../controllers/tourGuideController');

router.patch('/:id/upload-profile-image', upload.single('image'), tourGuideController.uploadProfileImage);



router.post("/test", (req, res) => {
  res.send("Tour Guide Test Route is working!");
});


router.get('/showAll', showMyItineraries )

const { changePassword } = require("../controllers/PasswordController");
router.patch("/change-password/:id/:modelName", changePassword);


// router.patch('/:id/upload-profile-image', multer.single('image'), tourGuideController.uploadProfileImage);





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
router.post('/addRating', addRating);
router.post('/addComment', addComment);
router.post('/addItineraryRating', addItineraryRating);
router.post('/addItineraryComment', addItineraryComment);


//66f80af288afe7e5aff3af00
module.exports = router;
