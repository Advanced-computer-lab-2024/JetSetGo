const express = require("express");
const {
  getProducts,
  filterProducts,
  sortByRate,
  searchProductName,
  createTransportBooking,
  getTransportBooking,
  deleteTransportBooking,
  selectPrefrences,
  getPrefrences,
  updateInfo,
  getInfo,
  searchHistoricalPlaceByTag,
  searchHistoricalPlaceByName,
  searchHistoricalPlaceByCategory,
  searchMuseumByTag,
  searchMuseumByName,
  searchMuseumByCategory,
  searchActivityByBudget,
  searchActivityByDate,
  searchActivityByRating,
  searchActivityByTag,
  searchActivityByCategory,
  searchActivityByName,
  searchItineraryByDate,
  searchItineraryByBudget,
  searchItineraryByLanguage,
  searchItineraryByName,
  searchItineraryByTag,
  getUpcomingActivities,
  sortActivityByPrice,
  sortActivityByRating,
  getUpcomingItineraries,
  sortItineraryByPrice,
  sortItineraryByRating,
  getMuseums,
  filterMuseumsByTag,
  getHistoricalLocations,
  filterHistoricalLocationsByTag,
  getComplaints,
  ADDRateReview,
  addSales,
  addComplaint,
  updatePointsToWallet,
  payForItinerary,
  payForActivity,
  getTagNameById,
  getCategoryNameById,
  rateActivity,
  addCommentToActivity,
  deleteCommentFromActivity,
  book_activity_Itinerary,
  cancel_booking, myTransportBooking, myActivityItineraryBooking,
  getActivitiesByCategory,
  fetchID,
  fetchActivityID,
  fetchItineraryID,
  getCategories,
  requestAccountDeletion,
  addItineraryRating,
  addItineraryComment,
  addRating,
  addComment,
  followItinerary,
  unfollowItinerary,
  compeleteWithTourGuide,
  getFollowedItineraries,
  getCompletedTourGuides,
  getAllTourGuideProfiles,
  getItinerariesByTourGuide,
  getSingleItinerary,
  getTouristUsername,
  getTagIdByName,
  getTouristActivities,getTouristBookedActivities,getUserRating,isCommentByTourist,createFlightBooking, createBooking,getSingleProduct,shareViaEmail } = require("../controllers/touristController");

const router = express.Router();


router.get("/mytransports/:touristId", myTransportBooking);
router.get("/myactivities/:tourist", myActivityItineraryBooking);

router.post('/newTransportBooking', createTransportBooking )
router.get('/showTransportBooking', getTransportBooking )
router.delete('/deleteTransportBooking/:id', deleteTransportBooking )
router.post("/newTransportBooking", createTransportBooking);
router.get("/showTransportBooking", getTransportBooking);
router.delete("/deleteTransportBooking/:id", deleteTransportBooking);

router.patch("/selectPrefrences/:id", selectPrefrences )
router.get("/myPrefrences/:id", getPrefrences )

// Route for sharing via email
router.post('/api/tourist/shareViaEmail', shareViaEmail);


const { changePassword } = require("../controllers/PasswordController");

//choose category of activities
router.get("/activities/category/:categoryId", getActivitiesByCategory);

// Route to get all categories
router.get("/categories", getCategories);

router.patch("/change-password/:id/:modelName", changePassword);

router.get("/Products", getProducts);
router.get("/filterProducts", filterProducts);
router.get("/sortByRate", sortByRate);
router.get("/searchProductName", searchProductName);
router.get("/getSingleProduct/:id", getSingleProduct);

router.get('/activities/booked/:touristId', getTouristBookedActivities);// Create or Update Tour Guide Profile

router.patch("/update/:id", updateInfo);
router.get("/profile/:id", getInfo);

router.patch("/requestDelete/:id", requestAccountDeletion);

// Create or Update Tour Guide Profile

router.post("/searchHistoricalPlaceByName", searchHistoricalPlaceByName);
router.post("/searchHistoricalPlaceByTag", searchHistoricalPlaceByTag);
router.post(
  "/searchHistoricalPlaceByCategory",
  searchHistoricalPlaceByCategory
);


router.post("/getTagIdByName",getTagIdByName)

router.post("/searchMuseumByTag", searchMuseumByTag);
router.post("/searchMuseumByName", searchMuseumByName);
router.post("/searchMuseumByCategory", searchMuseumByCategory);

router.post("/searchActivityByName", searchActivityByName);
router.post("/searchActivityByCategory", searchActivityByCategory);
router.post("/searchActivityByTag", searchActivityByTag);
router.post("/searchActivityByRating", searchActivityByRating);
router.post("/searchActivityByDate", searchActivityByDate);
router.post("/searchActivityByBudget", searchActivityByBudget);

router.post("/searchItineraryByDate", searchItineraryByDate);
router.post("/searchItineraryByBudget", searchItineraryByBudget);
router.post("/searchItineraryByLanguage", searchItineraryByLanguage);
router.post("/searchItineraryByName", searchItineraryByName);
router.post("/searchItineraryByTag", searchItineraryByTag);

router.post("/feedback", ADDRateReview);
router.post("/addSales", addSales);
router.get("/getComplaints/:id", getComplaints);

router.get("/getUpcomingActivities", getUpcomingActivities);
router.get("/sortActivityByPrice", sortActivityByPrice);
router.get("/sortActivityByRating", sortActivityByRating);
router.get("/getUpcomingItineraries", getUpcomingItineraries);
router.get("/sortItineraryByPrice", sortItineraryByPrice);
router.get("/sortItineraryByRating", sortItineraryByRating);
router.get("/getMuseums", getMuseums);
router.get("/filterMuseumsByTag/:id", filterMuseumsByTag);
router.get("/getHistoricalLocations", getHistoricalLocations);
router.get(
  "/filterHistoricalLocationsByTag/:id",
  filterHistoricalLocationsByTag
);

router.get(
  "/filterHistoricalLocationsByTag/:id",
  filterHistoricalLocationsByTag
);

router.put("/rating", rateActivity);

router.get("/get_rating/:_id/:activityId", getUserRating);


router.post("/bookflight", createFlightBooking);

router.post("/comment", addCommentToActivity);
router.post("/commentcheck/:touristId/:commentId", isCommentByTourist);
router.delete("/del_comment", deleteCommentFromActivity);

router.post("/book_activity_Itinerary", book_activity_Itinerary);
router.delete("/cancel_booking", cancel_booking);
router.post("/bookhotel", createBooking);

router.post("/addComplaint/:userId", addComplaint);
router.patch("/updatePointsToWallet/:touristId", updatePointsToWallet);
router.patch("/payForItinerary/:touristId", payForItinerary);
router.patch("/payForActivity/:touristId", payForActivity);
router.get("/tagName/:id", getTagNameById);
router.get("/categoryName/:id", getCategoryNameById);
router.post("/addRating", addRating);
router.post("/addComment", addComment);
router.post("/addItineraryRating", addItineraryRating);
router.post("/addItineraryComment", addItineraryComment);
router.post("/follow", followItinerary);
router.post("/unfollow", unfollowItinerary);
router.post("/compeleteWithTourGuide", compeleteWithTourGuide);
// Route to get completed tour guides
router.get("/completed/:touristId", getCompletedTourGuides);
// Route to get followed itineraries
router.get("/followed/:touristId", getFollowedItineraries);
router.get("/getAllTourGuideProfiles", getAllTourGuideProfiles);
router.post("/getItinerariesByTourGuide", getItinerariesByTourGuide);
router.post("/getSingleItinerary", getSingleItinerary);
router.post("/getTouristUsername", getTouristUsername);

router.get("/:touristId", fetchID);
router.get("/activity/:activityId", fetchActivityID);
router.get("/itinerary/:itineraryId", fetchItineraryID);
router.get("/activities/booked/:touristId",getTouristActivities);

module.exports = router;
