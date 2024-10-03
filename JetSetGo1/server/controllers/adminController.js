const Admin = require('../models/adminModels');
//const Account = require('../models/GuestModel');
const Seller = require('../models/SellerModel');
const TourGuide = require('../models/TourGuideModel');
const Tourist = require('../models/touristModel');
//66f8084788afe7e5aff3aefc

//Dynamic model deletion utility
const models={admin: Admin, seller: Seller, tourguide: TourGuide, tourist: Tourist};


// Add Admin 
const addAdmin = async (req, res) => {
    const { username,password} = req.body;

    try {
      const newAdmin = await Admin.create({username, password});
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

// Delete Account
const deleteAccount= async (req, res) => {
  const { id , modelName} = req.params;

  //Check if model exists
  const Model = models[modelName.toLowerCase()];

  if(!Model){
    return resizeTo.status(400).json({error: `Model '${modelName}' not found`});
  }
  try {
    const deletedAccount = await Model.findByIdAndDelete(id);
    if(!deletedAccount){
        return resizeTo.status(404).json({erro:'This account does not exist'});
    }
    res.status(200).json({message:'Account deleted successfully',deletedAccount});
  } catch (err) {
    res.status(400).json({ error: err.message});
  }
};

module.exports = {addAdmin, deleteAccount };
