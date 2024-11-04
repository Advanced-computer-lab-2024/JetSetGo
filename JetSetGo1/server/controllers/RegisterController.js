const TourGuide = require("../models/TourGuideModel"); //
const Tourist = require("../models/touristModel"); //
const Advertiser = require("../models/AdvertiserModel"); //
const Seller = require("../models/SellerModel"); //

const registerTourGuide = async (req, res) => {
  const { email, username, password, accepted } = req.body;

  try {
    const newTourGuide = await TourGuide.create({
      email,
      username,
      password,
      accepted,
    });
    res.status(201).json(newTourGuide);
    await newTourGuide.save();
  } catch (error) {
    res.status(500).json({ error: "Error registering tour guide" });
  }
};

const registerTourist = async (req, res) => {
  const { email, username, password, nationality, dob, job, mobile } = req.body;

  const age = calculateAge(dob); //helper function to calculate age
  if (age < 18) {
    return res
      .status(400)
      .json({ error: "Must be 18 or older to register as a tourist" });
  }

  try {
    const newTourist = await Tourist.create({
      email,
      username,
      password,
      nationality,
      dob,
      job,
      mobile,
    });
    res.status(201).json(newTourist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const registerAdvertiser = async (req, res) => {
  const { email, username, password, accepted } = req.body;

  try {
    const newAdvertiser = await Advertiser.create({
      email,
      username,
      password,
      accepted,
    });
    res.status(201).json(newAdvertiser);
  } catch (error) {
    res.status(500).json({ error: "Error registering advertiser" });
  }
};

const registerSeller = async (req, res) => {
  const { email, username, password, accepted } = req.body;

  try {
    const newSeller = await Seller.create({
      email,
      username,
      password,
      accepted,
    });
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(500).json({ error: "Error registering seller" });
  }
};

/////////////HELLLPPPERRRRRR TO CALCCC THE AGE OF THE TOURIST//////////////
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthdate has not yet occurred this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

module.exports = {
  registerTourist,
  registerTourGuide,
  registerAdvertiser,
  registerSeller,
};
