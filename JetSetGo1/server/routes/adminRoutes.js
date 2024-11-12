const express = require("express");
const adminController = require("../controllers/adminController.js");

const {
  create_pref_tag,
  get_pref_tag,
  update_pref_tag,
  delete_pref_tag,
  create_act_category,
  get_act_category,
  update_act_category,
  delete_act_category,
  add_tourism_governer,
  view_tourism_governer,
  getProducts,
  createProduct,
  updateProduct,
  filterProducts,
  sortByRate,
  searchProductName,
  deleteAccount,
  addAdmin,
  getAllUsers,
  getSingleProduct,
  getUploadedDocuments,
  getComplaints,
  getSales,
  viewComplaint,
  resolveComplaint,
  archieved_on,
  AcceptUserStatus,
  RejectUserStatus,
  flagItinerary,
  getAllItineraries,
} = require("../controllers/adminController.js");
const router = express.Router();
const multer = require("multer");
const { changePassword } = require("../controllers/PasswordController");
router.patch("/change-password/:id/:modelName", changePassword);

router.get("/view-documents", adminController.getUploadedDocuments);

//Flag Itinerary

router.patch("/itineraries/:itineraryId/flag", flagItinerary);
router.get("/itineraries", getAllItineraries);
router.get("/viewComplaints", getComplaints);

// Advertiser activities
router.post("/createtag", create_pref_tag);
router.patch("/updatetag", update_pref_tag);
router.delete("/deletetag/:id", delete_pref_tag);
router.get("/tag", get_pref_tag);

router.post("/create_category", create_act_category);
router.patch("/update_category", update_act_category);
router.delete("/delete_category/:id", delete_act_category);
router.get("/category", get_act_category);

router.post("/create_tourism_governer", add_tourism_governer);
router.get("/viewTourismGoverner", view_tourism_governer);
router.get("/", view_tourism_governer);
router.post("/add", addAdmin);
router.delete("/delete/:modelName/:id", deleteAccount);
router.get("/:role/list", getAllUsers);

router.get("/Products/:id", getProducts);
router.get("/filterProducts/:id", filterProducts);
router.get("/sortByRate/:id", sortByRate);
router.get("/searchProductName", searchProductName);
router.post("/createProduct", createProduct);
// Update workout

router.get("/view-documents", getUploadedDocuments);
router.patch("/accept/:id/:modelName", AcceptUserStatus);
router.patch("/reject/:id/:modelName", RejectUserStatus);

router.patch("/product/:id", updateProduct);
router.get("/getSingleProduct/:id", getSingleProduct);

router.get("/getComplaints", getComplaints);
router.get("/viewComplaint/:id", viewComplaint);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Then, use it in your route
router.post("/createProduct", upload.single("picture"), createProduct);

router.get("/getComplaints", getComplaints);

router.post("/resolveComplaint", resolveComplaint);
router.patch("/archieved/:id", archieved_on);
router.get("/sales/:id", getSales);

router.get("/getComplaints", getComplaints);
router.get("/viewComplaint", viewComplaint);
router.post("/resolveComplaint", resolveComplaint);

module.exports = router;
