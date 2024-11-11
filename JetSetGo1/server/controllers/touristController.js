const mongoose = require("mongoose");
const Product = require("../models/ProductModel");
const Tourist = require("../models/touristModel");
const Itinerary = require("../models/ItineraryModel");
const Activity = require("../models/AdvertiserActivityModel");
const Tag = require("../models/TagModel");
const HistoricalLocationModel = require("../models/HistoricalLocationModel");
const MuseumModel = require("../models/MuseumModel");
const Complaint = require('../models/ComplaintModel');
const Category = require('../models/CategoryModel');
const Booking = require("../models/bookingmodel");
const FlightBooking = require('../models/FlightBooking');

const getTagNameById = async (req, res) => {
  try {
      const tagId = req.params.id;
      const tag = await Tag.findById(tagId, 'tag_name'); // Only select `tag_name`

      if (!tag) {
          return res.status(404).json({ error: 'Tag not found' });
      }

      res.json({ tag_name: tag.tag_name });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tag name' });
  }
};

const getCategoryNameById = async (req, res) => {
  try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId, 'name');

      if (!category) {
          return res.status(404).json({ error: 'Category not found' });
      }

      res.json({ name: category.name });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch category name' });
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
        const { title, body, date, userId: bodyUserId } = req.body;
        const userId = req.user ? req.user._id : bodyUserId; // Fallback to body.userId if req.user is not available
  
        // Validate required fields
        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required' });
        }
  
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
  
        // Create a new complaint
        const complaint = new Complaint({
            userId, // Use either req.user._id or req.body.userId
            title,
            body,
            date: date || Date.now() // If date is not provided, use the current date
        });
  
        // Save the complaint
        const savedComplaint = await complaint.save();
  
        // Return the saved complaint
        res.status(201).json(savedComplaint);
    } catch (error) {
        console.error('Error adding complaint:', error);
        res.status(500).json({ error: 'Server error while adding complaint' });
    }
  };
  

// Function to update wallet by converting points to EGP
async function updatePointsToWallet(req, res) {
    try {
        const { touristId } = req.params; // Assuming touristId is passed in the URL
        const tourist = await Tourist.findById(touristId);

        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        // Check if points are sufficient for conversion
        if (tourist.Points >= 10000) {
            const egpToAdd = Math.floor(tourist.Points / 10000) * 100;
            const remainingPoints = tourist.Points % 10000;

            // Update Points and wallet fields
            tourist.Points = remainingPoints;
            tourist.wallet += egpToAdd;

            await tourist.save();
            return res.status(200).json({ message: 'Wallet updated successfully', tourist });
        } else {
            return res.status(200).json({ message: 'Not enough points for conversion', tourist });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred', error });
    }
}

async function payForItinerary(req, res) {
  try {
    const { touristId, itineraryId } = req.body; // Receive touristId and itineraryId from the body

    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Find the itinerary the tourist is paying for
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    // Use the price from the itinerary as the amount to be paid
    const amountPaid = itinerary.price;

    // Check if the tourist has enough balance in their wallet
    if (tourist.wallet < amountPaid) {
      return res.status(400).json({ message: 'Insufficient funds in wallet' });
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
      message: 'Payment successful, wallet and points updated',
      tourist,
      itinerary,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
}

async function payForActivity(req, res) {
  try {
    const { touristId, activityId } = req.body; // Receive touristId and activityId from the body

    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Find the activity the tourist is paying for
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Use the price from the activity as the amount to be paid
    const amountPaid = activity.price;

    // Check if the tourist has enough balance in their wallet
    if (tourist.wallet < amountPaid) {
      return res.status(400).json({ message: 'Insufficient funds in wallet' });
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
      message: 'Payment successful, wallet and points updated',
      tourist,
      activity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
}



const getTouristActivities = async (req, res) => {
  try {
    const { touristId } = req.params;

    const activities = await Activity.find({ Tourists: touristId }).populate('comments.postedby', 'name');

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const rateActivity = async (req, res) => {
  try {
    const { _id, star, activityId } = req.body;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

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
    if (!getAllRatings) {
      return res.status(404).json({ message: "Activity not found" });
    }

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

const getUserRating = async (req, res) => {
  try {
    const { _id, activityId } = req.params;

    const activity = await Activity.findById(activityId);
    console.log(activity);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const userRating = activity.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    res.json({ rating: userRating ? userRating.star : null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const isCommentByTourist = async (req, res) => {
  try {
    const { touristId, commentId } = req.body;

    // Find the activity containing the comment by the commentId
    const activity = await Activity.findOne({
      "comments._id": commentId
    });

    if (!activity) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Find the specific comment
    const comment = activity.comments.id(commentId);

    // Check if the comment was posted by the given touristId
    if (comment.postedby.toString() === touristId) {
      res.json(true); // The comment was posted by the user
    } else {
      res.json(false); // The comment was not posted by the user
    }
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

    if (referenceType === "Activity") {
      await Activity.findByIdAndUpdate(
        referenceId,
        { $push: { Tourists: tourist } },
        { new: true }
      );
    }

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getTouristBookedActivities = async (req, res) => {
  try {
    const { touristId } = req.params;
    console.log("jjnjnj"+touristId);
    // Find all bookings for the tourist
    const bookings = await Booking.find({ tourist: touristId });

    // Extract reference IDs and types from bookings
    const activityIds = bookings
      .filter(booking => booking.referenceType === 'Activity')
      .map(booking => booking.referenceId);

    const itineraryIds = bookings
      .filter(booking => booking.referenceType === 'Itinerary')
      .map(booking => booking.referenceId);

    // Find activities and itineraries based on IDs
    const activities = await Activity.find({ _id: { $in: activityIds } }).populate('comments.postedby', 'name');
    const itineraries = await Itinerary.find({ _id: { $in: itineraryIds } }).populate('comments.postedby', 'name');

    res.json({ activities, itineraries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create a new flight booking
const createFlightBooking = async (req, res) => {
  const { touristId, flightId, origin, destination, departureDate, returnDate, price, duration } = req.body;

  try {
    // Validate touristId format
    if (!mongoose.Types.ObjectId.isValid(touristId)) {
      return res.status(400).json({ message: 'Invalid tourist ID format' });
    }

    // Convert touristId to an ObjectId
    const touristObjectId = new mongoose.Types.ObjectId(touristId);

    // Check if the tourist exists
    const tourist = await Tourist.findById(touristObjectId);
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Create a new flight booking
    const newBooking = new FlightBooking({
      touristId: touristObjectId,
      flightId,
      origin,
      destination,
      departureDate,
      returnDate,
      price,
      duration,
    });

    // Save the booking to the database
    await newBooking.save();

    // Respond with success
    res.status(201).json({ message: 'Flight booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating flight booking:', error);
    res.status(500).json({ message: 'Failed to create flight booking' });
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

    // Remove the tourist from the Tourists array in the Activity model
    if (booking.referenceType === "Activity") {
      await Activity.findByIdAndUpdate(
        booking.referenceId,
        { $pull: { Tourists: booking.tourist } },
        { new: true }
      );
    }

    res.status(200).json({ message: "Booking canceled and tourist removed from the activity" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// controllers/hotelBookingController.js
// controllers/hotelBookingController.js
const HotelBooking = require("../models/HotelBooking");

const createBooking = async (req, res) => {
    const { touristId, ...bookingData } = req.body; // Extract touristId from request body
    try {
        const booking = new HotelBooking({ touristId, ...bookingData });
        await booking.save();
        res.status(201).json({ message: "Booking saved successfully", booking });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).json({ message: "Error saving booking", error });
    }
};



  module.exports = {
    searchHistoricalPlaceByTag,searchHistoricalPlaceByName,searchHistoricalPlaceByCategory,
    searchMuseumByTag,searchMuseumByName,searchMuseumByCategory,
    searchActivityByBudget,searchActivityByDate,searchActivityByRating, searchActivityByTag,searchActivityByCategory,searchActivityByName, 
    searchItineraryByDate, searchItineraryByBudget, 
    searchItineraryByLanguage, searchItineraryByCategory,searchItineraryByName,searchItineraryByTag,
    getUpcomingActivities, sortActivityByPrice, sortActivityByRating, getUpcomingItineraries, sortItineraryByPrice, sortItineraryByRating,
     getMuseums, filterMuseumsByTag, getHistoricalLocations, filterHistoricalLocationsByTag,
     getProducts, filterProducts, sortByRate, searchProductName,updateInfo, getInfo,
     addComplaint, updatePointsToWallet, payForItinerary, payForActivity, getTagNameById, getCategoryNameById,
     getActivitiesByCategory,
     rateActivity,
     addCommentToActivity,
     deleteCommentFromActivity,
     book_activity_Itinerary,
     cancel_booking,getTouristActivities,getTouristBookedActivities,getUserRating,isCommentByTourist,createFlightBooking,createBooking};