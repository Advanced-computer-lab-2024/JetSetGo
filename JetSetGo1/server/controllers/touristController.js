const TransportBooking = require("../models/TransportationBookingModel");
const mongoose = require("mongoose");
const Product = require("../models/ProductModel");
const Tourist = require("../models/touristModel");
const Itinerary = require("../models/ItineraryModel");
const Activity = require("../models/AdvertiserActivityModel");
const Tag = require("../models/TagModel");
const HistoricalLocationModel = require("../models/HistoricalLocationModel");
const MuseumModel = require("../models/MuseumModel");
const Complaint = require("../models/ComplaintModel");
const Category = require("../models/CategoryModel");

const Booking = require("../models/bookingmodel");
const TourGuide = require("../models/TourGuideModel.js");

const getTagNameById = async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findById(tagId, "tag_name"); // Only select `tag_name`

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ tag_name: tag.tag_name });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tag name" });
  }
};

const getCategoryNameById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId, "name");

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ name: category.name });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category name" });
  }
};

// Create TransportBooking
const createTransportBooking = async (req, res) => {
  const { transportationId, touristId, date } = req.body;

  try {
    const newTransportBooking = await TransportBooking.create({
      transportationId,
      touristId,
      date,
    });
    res.status(201).json(newTransportBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read Transportation
const getTransportBooking = async (req, res) => {
  // const { id } = req.params;

  try {
    const TransportBookingProfile = await TransportBooking.find();
    res.status(200).json(TransportBookingProfile);
  } catch (err) {
    res.status(404).json({ error: "Transportation Booking not found" });
  }
};

//Delete Transportation
const deleteTransportBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTransportBooking = await TransportBooking.findById(id);

    if (!deleteTransportBooking) {
      return res
        .status(404)
        .json({ message: "Transportation Booking not found" });
    } else {
      const bookingDate = deleteTransportBooking.date;
      const hoursDiff = (new Date(bookingDate) - new Date()) / (1000 * 60 * 60);

      if (hoursDiff < 48) {
        return res
          .status(400)
          .json({ message: "Cannot cancel within 48 hours" });
      } else {
        await TransportBooking.deleteOne({ _id: deleteTransportBooking._id });
        res
          .status(200)
          .json({ message: "Transportation Booking deleted successfully" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const selectPrefrences = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const myPrefrences = await Tourist.findByIdAndUpdate(
      id,
      { $push: { prefrences: updates } },
      { new: true }
    );
    res.status(200).json(myPrefrences);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPrefrences = async (req, res) => {
  const { id } = req.params;

  try {
    const TouristProfile = await Tourist.findById(id);
    const PrefrencesProfile = TouristProfile.prefrences;
    res.status(200).json(PrefrencesProfile);
  } catch (err) {
    res.status(404).json({ error: "Tourist not found" });
  }
};

// get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

const filterProducts = async (req, res) => {
  const { min, max } = req.query;

  try {
    const query = {
      price: {
        $gte: min, // Greater than or equal to minPrice
        $lte: max, // Less than or equal to maxPrice
      },
    };
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sortByRate = async (req, res) => {
  const { flag } = req.query; // Use req.query here
  var x = 0;
  try {
    if (flag == "1") {
      x = 1;
    } else {
      x = -1;
    }
    // Get sorted products by ratings in descending order
    const products = await Product.find().sort({ ratings: x }); // Change to 1 for ascending order and -1 for descending
    res.status(200).json(products); // Send the sorted products as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

const searchProductName = async (req, res) => {
  const { name } = req.body;

  try {
    // Use RegEx to match the substring in the product's name (case-insensitive)
    const productname = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(productname);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update tourist information
const updateInfo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (updates.username || updates.wallet) {
      return res
        .status(403)
        .json({ error: "You cannot edit username or wallet" });
    }
    const updatedInfo = await Tourist.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json(updatedInfo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get tourist information
const getInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Tourist.findById(id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(404).json({ error: "Profile not found" });
  }
};

//Search Historical Location by Name
const searchHistoricalPlaceByName = async (req, res) => {
  const nameReq = req.body;
  try {
    const Historical = await HistoricalLocationModel.find(nameReq);
    if (Historical.length == 0) {
      return res.status(404).json({ error: "Historical Place not found" });
    }
    res.status(200).json(Historical);
  } catch (error) {
    res.status(404).json({ error: "Historical Place not found here" });
  }
};

//Search Historical Location by Category
const searchHistoricalPlaceByCategory = async (req, res) => {
  const nameReq = req.body;
  try {
    const Historical = await HistoricalLocationModel.find(nameReq);
    if (Historical.length == 0) {
      res.status(404).json({ error: "Historical Place not found" });
    }
    res.status(200).json(Historical);
  } catch (error) {
    res.status(404).json({ error: "Historical Place not found" });
  }
};

//Search Historical Location by Tag
const searchHistoricalPlaceByTag = async (req, res) => {
  const { tagId } = req.body; // Extract tagId from the request body (already an ObjectId)

  try {
    const Historical = await HistoricalLocationModel.find(req.body);
    if (Historical.length == 0) {
      return res.status(404).json({ error: "Historical Place not found" });
    }
    res.status(200).json(Historical);
  } catch (error) {
    res.status(404).json({ error: "Historical Place not found" });
  }
};

//Search Museum by Tag
const searchMuseumByTag = async (req, res) => {
  const { tagId } = req.body; // Extract tagId from the request body (already an ObjectId)

  try {
    // Step 1: Find Activities that have the tagId in their tags array
    const activities = await MuseumModel.find({ tags: tagId }).populate("tags"); // Optional: populate 'tags' to return tag details

    if (activities.length === 0) {
      return res
        .status(404)
        .json({ error: "No activities found for this tag" });
    }

    // Step 2: Return the list of activities
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for activities" });
  }
};

//Search Museum by Name
const searchMuseumByName = async (req, res) => {
  const nameReq = req.body;
  try {
    const Museum = await MuseumModel.find(nameReq);

    res.status(200).json(Museum);
  } catch (error) {
    res.status(404).json({ error: "Museum not found" });
  }
};

//Search Museum by Category
const searchMuseumByCategory = async (req, res) => {
  const nameReq = req.body;
  try {
    const Museum = await MuseumModel.find(nameReq);
    if (Museum.length == 0) {
      return res.status(404).json({ error: "Museum not found" });
    }
    res.status(200).json(Museum);
  } catch (error) {
    res.status(404).json({ error: "Museum not found" });
  }
};

//Seach Itinerary by budget
const searchItineraryByBudget = async (req, res) => {
  const budget = req.body;
  try {
    const itinerary = await Itinerary.find();
    if (itinerary.length === 0) {
      return res.status(404).json({ error: "No itinerary found for this tag" });
    }
    const result = itinerary.filter((el) => el.price <= budget.price);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: "Itinerary not found" });
  }
};

//Search Itinerary By date

const searchItineraryByDate = async (req, res) => {
  const { availableDates } = req.body; // Extracting availableDates from request body

  try {
    // Extract the date from the availableDates array (it should match any of the dates in the DB)
    const searchDate = new Date(availableDates[0].date); // Assuming the request contains one date

    // Find all itineraries where any availableDates in the array matches the search date
    const itineraries = await Itinerary.find({
      "availableDates.date": searchDate, // Check all availableDates in each itinerary
    });

    if (itineraries.length === 0) {
      return res
        .status(404)
        .json({ error: "No itineraries found for the given date" });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for itineraries" });
  }
};

//Search Itinerary By Language
const searchItineraryByLanguage = async (req, res) => {
  const languageReq = req.body;
  try {
    const itinerary = await Itinerary.find(languageReq);
    if (itinerary.length === 0) {
      return res.status(404).json({ error: "No itinerary found for this tag" });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(404).json({ error: "Itinerary not found" });
  }
};

//Search Itinerary By Name
const searchItineraryByName = async (req, res) => {
  const name = req.body;
  try {
    const itinerary = await Itinerary.find(name);
    if (itinerary.length === 0) {
      return res
        .status(404)
        .json({ error: "No itinerary found with this name" });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(404).json({ error: "Itinerary not found" });
  }
};

//Search Itinerary By category
const searchItineraryByCategory = async (req, res) => {
  const category = req.body;
  try {
    const itinerary = await Itinerary.find(category);
    if (itinerary.length === 0) {
      return res
        .status(404)
        .json({ error: "No itinerary found for this category" });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(404).json({ error: "Itinerary not found" });
  }
};

//Search Itinerary By tag
const searchItineraryByTag = async (req, res) => {
  const { tagId } = req.body; // Extract tagId from the request body (already an ObjectId)

  try {
    // Step 1: Find itineraries that have the tagId in their tags array
    const itineraries = await Itinerary.find({ tags: tagId }).populate("tags"); // Optional: populate 'tags' to return tag details

    if (itineraries.length === 0) {
      return res.status(404).json({ error: "No itinerary found for this tag" });
    }

    // Step 2: Return the list of itineraries
    res.status(200).json(itineraries);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for itineraries" });
  }
};

//Seach Activity by date
const searchActivityByDate = async (req, res) => {
  const dateReq = req.body;
  try {
    const activty = await Activity.find(dateReq);
    if (activty.length === 0) {
      return res
        .status(404)
        .json({ error: "No activities found on this date" });
    }
    res.status(200).json(activty);
  } catch (error) {
    res.status(404).json({ error: "Activity not found" });
  }
};

//Seach Activity by rating
const searchActivityByRating = async (req, res) => {
  const ratingReq = req.body;
  try {
    const activty = await Activity.find(ratingReq);
    if (activty.length === 0) {
      return res
        .status(404)
        .json({ error: "No activities found with this rating" });
    }
    res.status(200).json(activty);
  } catch (error) {
    res.status(404).json({ error: "Activity not found" });
  }
};

//Seach Activity by budget
const searchActivityByBudget = async (req, res) => {
  const budget = req.body;

  try {
    const activty = await Activity.find();
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activities found" });
    }
    const result = activty.filter((el) => el.price <= budget.price);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: "Activity not found" });
  }
};

//Search Activity by name
const searchActivityByName = async (req, res) => {
  const activityName = req.body;
  try {
    const activty = await Activity.find(activityName);
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activities found" });
    }
    res.status(200).json(activty);
  } catch (error) {
    res.status(404).json({ error: "Activity not found" });
  }
};

//Seach Activity by category
const searchActivityByCategory = async (req, res) => {
  const categoryName = req.body;
  try {
    const activty = await Activity.find(categoryName);
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activities found" });
    }
    res.status(200).json(activty);
  } catch (error) {
    res.status(404).json({ error: "Activity not found" });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Retrieve all categories
    res.status(200).json(categories); // Send categories as JSON
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories" });
  }
};

// Fetch activities by category
const getActivitiesByCategory = async (req, res) => {
  const { categoryId } = req.params; // Extract category ID from the request params

  try {
    // Query activities where the category matches the provided categoryId
    const activities = await Activity.find({ category: categoryId }).populate(
      "category"
    ); // Optionally populate category details

    if (activities.length === 0) {
      return res
        .status(404)
        .json({ error: "No activities found for this category" });
    }

    res.status(200).json(activities);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching activities" });
  }
};

//Seach Activity by tag
const searchActivityByTag = async (req, res) => {
  const { tagId } = req.body; // Extract tagId from the request body (already an ObjectId)

  try {
    // Step 1: Find Activities that have the tagId in their tags array
    const activities = await Activity.find({ tags: tagId }).populate("tags"); // Optional: populate 'tags' to return tag details

    if (activities.length === 0) {
      return res
        .status(404)
        .json({ error: "No activities found for this tag" });
    }

    // Step 2: Return the list of activities
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for activities" });
  }
};

const getUpcomingActivities = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const upcomingActivities = await Activity.find({
      date: { $gte: currentDate }, // Find activities with a date greater than or equal to the current date
    });

    res.status(200).json(upcomingActivities);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const sortActivityByPrice = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const sortedActivityByPrice = await Activity.find({
      date: { $gte: currentDate }, // Find activities with a date greater than or equal to the current date
    }).sort({ price: 1 });
    res.status(200).json(sortedActivityByPrice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const sortActivityByRating = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const sortedActivityByRating = await Activity.find({
      date: { $gte: currentDate }, // Find activities with a date greater than or equal to the current date
    }).sort({ rating: 1 });
    res.status(200).json(sortedActivityByRating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUpcomingItineraries = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date

    const upcomingItineraries = await Itinerary.find({
      availableDates: {
        $elemMatch: {
          date: { $gte: currentDate }, // Check if at least one date is greater than or equal to the current date
        },
      },
    });

    res.status(200).json(upcomingItineraries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const sortItineraryByPrice = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const sortedItineraryByPrice = await Itinerary.find({
      availableDates: {
        $elemMatch: {
          date: { $gte: currentDate }, // Check if at least one date is greater than or equal to the current date
        },
      },
    }).sort({ price: 1 });
    res.status(200).json(sortedItineraryByPrice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const sortItineraryByRating = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const sortedItineraryByRating = await Itinerary.find({
      availableDates: {
        $elemMatch: {
          date: { $gte: currentDate }, // Check if at least one date is greater than or equal to the current date
        },
      },
    }).sort({ rating: 1 });
    res.status(200).json(sortedItineraryByRating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMuseums = async (req, res) => {
  try {
    const museum = await MuseumModel.find();
    res.status(200).json(museum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const filterMuseumsByTag = async (req, res) => {
  try {
    const { id } = req.params;

    // Query museums where the tags array contains the given tagId
    const museums = await MuseumModel.find({ tags: id });

    if (museums.length === 0) {
      return res
        .status(404)
        .json({ message: "No museums found with the given tag" });
    }

    res.status(200).json(museums);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getHistoricalLocations = async (req, res) => {
  try {
    const historicalLocation = await HistoricalLocationModel.find();
    res.status(200).json(historicalLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const filterHistoricalLocationsByTag = async (req, res) => {
  try {
    const { id } = req.params;
    // Query historical locations where the tags array contains the given tagId
    const historicalLocations = await HistoricalLocationModel.find({
      tags: id,
    });

    if (historicalLocations.length === 0) {
      return res
        .status(404)
        .json({ message: "No historical locations found with the given tag" });
    }

    res.status(200).json(historicalLocations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addComplaint = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming touristId is passed in the URL
    const tourist = await Tourist.findById(userId);

    const { title, body, date } = req.body;

    // Validate required fields
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Create a new complaint
    const complaint = new Complaint({
      userId,
      title,
      body,
      date: date || Date.now(), // If date is not provided, use the current date
    });

    // Save the complaint
    const savedComplaint = await complaint.save();

    // Return the saved complaint
    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error("Error adding complaint:", error);
    res.status(500).json({ error: "Server error while adding complaint" });
  }
};

// Function to update wallet by converting points to EGP
async function updatePointsToWallet(req, res) {
  try {
    const { touristId } = req.params; // Assuming touristId is passed in the URL
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Check if points are sufficient for conversion
    if (tourist.Points >= 10000) {
      const egpToAdd = Math.floor(tourist.Points / 10000) * 100;
      const remainingPoints = tourist.Points % 10000;

      // Update Points and wallet fields
      tourist.Points = remainingPoints;
      tourist.wallet += egpToAdd;

      await tourist.save();
      return res
        .status(200)
        .json({ message: "Wallet updated successfully", tourist });
    } else {
      return res
        .status(200)
        .json({ message: "Not enough points for conversion", tourist });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
}

async function payForItinerary(req, res) {
  try {
    const { touristId } = req.params; // Assuming touristId is passed in the URL
    const { itineraryId } = req.body; // Receive itineraryId from the body

    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Find the itinerary the tourist is paying for
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Use the price from the itinerary as the amount to be paid
    const amountPaid = itinerary.price;

    // Check if the tourist has enough balance in their wallet
    if (tourist.wallet < amountPaid) {
      return res.status(400).json({ message: "Insufficient funds in wallet" });
    }

    // Deduct the amount from the wallet
    tourist.wallet -= amountPaid;

    // Calculate loyalty points based on the level
    let pointsEarned = 0;
    if (tourist.Level === 1) {
      pointsEarned = amountPaid * 0.5;
    } else if (tourist.Level === 2) {
      pointsEarned = amountPaid * 1;
    } else if (tourist.Level === 3) {
      pointsEarned = amountPaid * 1.5;
    }

    // Update Points, TotalPoints, and Level
    tourist.Points += pointsEarned;
    tourist.TotalPoints += pointsEarned;

    // Update Level based on new TotalPoints
    if (tourist.TotalPoints > 500000) {
      tourist.Level = 3;
    } else if (tourist.TotalPoints > 100000) {
      tourist.Level = 2;
    } else {
      tourist.Level = 1;
    }

    await tourist.save();

    // Update the itinerary's booked status and add the tourist to participants
    itinerary.isBooked = true;
    itinerary.Tourists.push(tourist._id);
    await itinerary.save();

    return res.status(200).json({
      message: "Payment successful, wallet and points updated",
      tourist,
      itinerary,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
}

async function payForActivity(req, res) {
  try {
    const { touristId } = req.params; // Assuming touristId is passed in the URL
    const { activityId } = req.body; // Receive touristId and activityId from the body

    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Find the activity the tourist is paying for
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Use the price from the activity as the amount to be paid
    const amountPaid = activity.price;

    // Check if the tourist has enough balance in their wallet
    if (tourist.wallet < amountPaid) {
      return res.status(400).json({ message: "Insufficient funds in wallet" });
    }

    // Deduct the amount from the wallet
    tourist.wallet -= amountPaid;

    // Calculate loyalty points based on the level
    let pointsEarned = 0;
    if (tourist.Level === 1) {
      pointsEarned = amountPaid * 0.5;
    } else if (tourist.Level === 2) {
      pointsEarned = amountPaid * 1;
    } else if (tourist.Level === 3) {
      pointsEarned = amountPaid * 1.5;
    }

    // Update Points, TotalPoints, and Level
    tourist.Points += pointsEarned;
    tourist.TotalPoints += pointsEarned;

    // Update Level based on new TotalPoints
    if (tourist.TotalPoints > 500000) {
      tourist.Level = 3;
    } else if (tourist.TotalPoints > 100000) {
      tourist.Level = 2;
    } else {
      tourist.Level = 1;
    }

    await tourist.save();

    // Update the activity's booked status and add the tourist to participants
    activity.isBooked = true;
    activity.Tourists.push(tourist._id);
    await activity.save();

    return res.status(200).json({
      message: "Payment successful, wallet and points updated",
      tourist,
      activity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
}

const rateActivity = async (req, res) => {
  try {
    const { _id, star, activityId } = req.body;

    const activity = await Activity.findById(activityId);

    let alreadyRated = activity.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      await Activity.updateOne(
        { _id: activityId, "ratings._id": alreadyRated._id },
        {
          $set: { "ratings.$.star": star },
        },
        { new: true }
      );
    } else {
      await Activity.findByIdAndUpdate(
        activityId,
        {
          $push: { ratings: { star, postedby: _id } },
        },
        { new: true }
      );
    }
    const getAllRatings = await Activity.findById(activityId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);

    let finalActivity = await Activity.findByIdAndUpdate(
      activityId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );

    res.json(finalActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCommentToActivity = async (req, res) => {
  try {
    // const _id = req.user._id;
    const { _id, activityId, text } = req.body;

    // Find the activity by its ID and add the comment
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      {
        $push: { comments: { text, postedby: _id } },
      },
      { new: true } // Return the updated document
    ).populate("comments.postedby", "name"); // Optionally, populate the user info

    res.json(updatedActivity); // Return the updated activity with the new comment
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCommentFromActivity = async (req, res) => {
  try {
    const { _id, activityId, commentId } = req.body;
    // const _id = req.user._id;

    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      {
        $pull: { comments: { _id: commentId, postedby: _id } }, // Remove the comment if it matches the user's ID
      },
      { new: true } // Return the updated document
    );

    if (!updatedActivity) {
      return res
        .status(404)
        .json({ message: "Comment not found or not authorized to delete" });
    }

    res.json(updatedActivity); // Return the updated activity after deleting the comment
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const findReference = async (referenceId) => {
//   const event = await Activity.findById(referenceId);
//   if (event) return { reference: event, referenceType: 'Activity' };

//   const itinerary = await Itinerary.findById(referenceId);
//   if (itinerary) return { reference: itinerary, referenceType: 'Itinerary' };

//   return null;
// };

const book_activity_Itinerary = async (req, res) => {
  try {
    const { tourist, referenceId } = req.body;
    const reference =
      (await Activity.findById(referenceId)) ||
      (await Itinerary.findById(referenceId));

    if (!reference) {
      return res
        .status(404)
        .json({ message: "No Activity or itinerary found with the given ID" });
    }
    const referenceType =
      reference instanceof Activity ? "Activity" : "Itinerary";

    const booking = new Booking({ tourist, referenceId, referenceType });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancel_booking = async (req, res) => {
  try {
    const { booking_id } = req.body;
    const booking = await Booking.findById(booking_id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const reference =
      (await Activity.findById(booking.referenceId)) ||
      (await Itinerary.findById(booking.referenceId));

    if (!reference) {
      return res
        .status(404)
        .json({ message: `${booking.referenceType} not found` });
    }

    let eventDate;

    if (reference instanceof Activity) {
      eventDate = reference.date;
    } else if (
      reference instanceof Itinerary &&
      reference.availableDates.length > 0
    ) {
      eventDate = reference.availableDates[0].date;
    }

    if (!eventDate) {
      return res
        .status(404)
        .json({ message: "No valid date found for cancellation" });
    }
    const hoursDiff = (new Date(eventDate) - new Date()) / (1000 * 60 * 60);

    if (hoursDiff < 48) {
      return res.status(400).json({ message: "Cannot cancel within 48 hours" });
    }
    await Booking.deleteOne({ _id: booking_id });
    res.status(200).json({ message: "Booking canceled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchID = async (req, res) => {
  try {
    const { touristId } = req.params; // Assuming touristId is passed in the URL
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }
    res.json(tourist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

const fetchActivityID = async (req, res) => {
  const { activityId } = req.params;
  const activity = await Activity.findById(activityId); // Replace Activity with your model

  try {
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};

const fetchItineraryID = async (req, res) => {
  const { itineraryId } = req.params;
  const itinerary = await Itinerary.findById(itineraryId); // Replace Itinerary with your model

  try {
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch itinerary" });
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

// Method to add a comment from a tourist to a tour guide
const addComment = async (req, res) => {
  const { tourGuideId, touristId, comment } = req.body;

  try {
    // Find the tour guide by ID and populate tourists for validation
    const tourGuide = await TourGuide.findById(tourGuideId).populate(
      "Tourists"
    );

    if (!tourGuide) {
      return res.status(404).json({ message: "Tour Guide not found." });
    }

    // Check if the tourist is associated with the tour guide
    if (
      tourGuide.Tourists.some((tourist) => tourist._id.toString() === touristId)
    ) {
      // Add the structured comment
      const newComment = {
        tourist: touristId,
        text: comment,
        createdAt: new Date(),
      };
      tourGuide.comments.push(newComment);
      await tourGuide.save();

      return res.status(200).json({
        message: "Comment added successfully.",
        comment: newComment,
      });
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
    // Find the itinerary by ID and populate tourists for validation
    const itinerary = await Itinerary.findById(itineraryId).populate(
      "Tourists"
    );

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    // Check if the tourist is associated with the itinerary
    if (
      itinerary.Tourists.some((tourist) => tourist._id.toString() === touristId)
    ) {
      // Add the structured comment
      const newComment = {
        tourist: touristId,
        text: comment,
        createdAt: new Date(),
      };
      itinerary.comments.push(newComment);
      await itinerary.save();

      return res.status(200).json({
        message: "Comment added successfully.",
        comment: newComment,
      });
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

// Get all tour guides with whom the user (tourist) completed a tour
const getCompletedTourGuides = async (req, res) => {
  try {
    const touristId = req.params.touristId;

    // Find all tour guides who have the given tourist ID in their 'Tourists' field
    const completedTourGuides = await TourGuide.find({ Tourists: touristId });

    res.status(200).json(completedTourGuides);
  } catch (error) {
    console.error("Error fetching completed tour guides:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all itineraries that the tourist is following
const getFollowedItineraries = async (req, res) => {
  try {
    const touristId = req.params.touristId;

    // Find all itineraries where the given tourist ID is in the 'Tourists' field
    const followedItineraries = await Itinerary.find({ Tourists: touristId });

    res.status(200).json(followedItineraries);
  } catch (error) {
    console.error("Error fetching followed itineraries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTourGuideProfiles = async (req, res) => {
  try {
    // Fetch all tour guides from the database
    const tourGuides = await TourGuide.find();

    // If no tour guides are found, send a 404 error
    if (!tourGuides || tourGuides.length === 0) {
      return res.status(404).json({ message: "No tour guides found." });
    }

    // Return the list of tour guide profiles
    res.status(200).json({ tourGuides });
  } catch (error) {
    // Handle any errors that occur during fetching
    console.error("Error fetching tour guides:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching tour guides." });
  }
};

const getItinerariesByTourGuide = async (req, res) => {
  try {
    // Extract the tour guide's ID from the request parameters
    const { tourGuideId } = req.body;

    // Find itineraries that belong to the specified tour guide
    const itineraries = await Itinerary.find({
      tourGuide: tourGuideId,
    }).populate("tourGuide");

    // Return the filtered itineraries as a response
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching itineraries for the tour guide",
      error,
    });
  }
};

// Controller function to get a single itinerary by ID
const getSingleItinerary = async (req, res) => {
  const { itineraryId } = req.body;

  try {
    // Find the itinerary by its ID in the database
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    // If found, send the itinerary data as the response
    res.status(200).json(itinerary);
  } catch (error) {
    // Handle any errors (e.g., invalid ID format, database issues)
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to get tourist username by touristId
const getTouristUsername = async (req, res) => {
  try {
    // Get the touristId from the request parameters
    const { touristId } = req.body;

    // Find the tourist by the provided touristId
    const tourist = await Tourist.findById(touristId);

    // If tourist not found, return a 404 error
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Return the tourist's username
    return res.status(200).json({ username: tourist.username });
  } catch (error) {
    console.error("Error fetching tourist username:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTransportBooking,
  getTransportBooking,
  deleteTransportBooking,
  selectPrefrences,
  getPrefrences,
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
  searchItineraryByCategory,
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
  getProducts,
  filterProducts,
  sortByRate,
  searchProductName,
  updateInfo,
  getInfo,
  addComplaint,
  updatePointsToWallet,
  payForItinerary,
  payForActivity,
  getTagNameById,
  getCategoryNameById,
  getActivitiesByCategory,
  getCategories,
  rateActivity,
  addCommentToActivity,
  deleteCommentFromActivity,
  book_activity_Itinerary,
  cancel_booking,
  fetchID,
  fetchActivityID,
  fetchItineraryID,
  addRating,
  addComment,
  addItineraryRating,
  addItineraryComment,
  followItinerary,
  unfollowItinerary,
  compeleteWithTourGuide,
  getFollowedItineraries,
  getCompletedTourGuides,
  getAllTourGuideProfiles,
  getItinerariesByTourGuide,
  getSingleItinerary,
  getTouristUsername,
};
