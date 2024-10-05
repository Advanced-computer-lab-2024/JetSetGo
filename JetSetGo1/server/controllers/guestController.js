//const Guest = require('../models/GuestModel'); // Assuming the Guest model covers all user types

// Register Guest (Tourist, Tour Guide, Advertiser, Seller)
const registerGuest = async (req, res) => {
  const { username, email, password, mobile_number, nationality, DOB, job, role } = req.body; 
  
  // Check if user is under 18 (for Tourist)
  const age = new Date().getFullYear() - new Date(DOB).getFullYear();
  if (age < 18) {
    return res.status(400).json({ error: 'You must be at least 18 to register.' });
  }

  try {
    //const newGuest = await Guest.create({ username, email, password, mobile_number, nationality, DOB, job,role });
    res.status(201).json(newGuest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registerGuest };
