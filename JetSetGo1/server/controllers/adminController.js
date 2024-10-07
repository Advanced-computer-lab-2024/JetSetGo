const Admin = require('../models/AdminModel.js');
const preferencetags = require('../models/TagModel.js');
const CategoryModel = require('../models/CategoryModel.js');
const TourismGoverner = require('../models/TourismGovernerModel.js');
const AdvertiserActivityModel = require('../models/AdvertiserActivityModel.js');
const Seller = require('../models/SellerModel');
const TourGuide = require('../models/TourGuideModel');
const Tourist = require('../models/TouristModel');
const Advertiser = require('../models/AdvertiserModel');

const models={admin: Admin, seller: Seller, tourguides: TourGuide, tourist: Tourist, advertisers: Advertiser, tourismgoverner: TourismGoverner};
////////////////////////////////////////////////////////////////////////////////
//create preference tags
const create_pref_tag = async (req, res) => {
    const { tag_name, description } = req.body;
    try {
        const tag = await preferencetags.create({ tag_name, description });
        res.status(200).json(tag);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//read preference tags
const get_pref_tag = async (req, res) => {
    // const { tag_name } = req.body;
    try {
        const tag = await preferencetags.find();
        res.status(200).json(tag);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// Add Admin
const addAdmin = async (req, res) => {
  const { username, password } = req.body;

  // Validate that the required fields are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const newAdmin = await Admin.create({ username, password });

    // Send both a success message and the new admin object in the response
    return res.status(201).json({
      message: 'Admin added successfully',
      admin: newAdmin
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
//update preference tags
const update_pref_tag = async (req, res) => {
    const { tag_name, description } = req.body;
    try {
        const tag = await preferencetags.findOneAndUpdate({ tag_name }, { description }, { new: true });
        res.status(200).json(tag);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//Delete preference tags
const delete_pref_tag = async (req, res) => {
    const { id } = req.params;
    try {
        const tag2 = await preferencetags.findByIdAndDelete(id);
        console.log(tag2);
        if (!tag2) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        await AdvertiserActivityModel.updateMany(
            { tags: id },
            { $pull: { tags: id } }
        );
        
        res.status(200).json({ message: 'Tag and references deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


////////////////////////////////////////////////////////////////////////////////
//create activity category
const create_act_category = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await CategoryModel.create({ name , description });
        res.status(200).json(category);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//read activity category
const get_act_category = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await CategoryModel.find();
        res.status(200).json(category);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//update activity category
const update_act_category = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await CategoryModel.findOneAndUpdate({ name }, { description }, { new: true });
        res.status(200).json(category);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//Delete activity category
const delete_act_category = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the tag to delete
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json({ message: 'category deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

////////////////////////////////////////////////////////////////////////////////
//add tourism gouverner 
const add_tourism_governer = async (req,res) => {
    const { username , password , email } = req.body;
    try{
        const tourism_governer = await TourismGovernerModel.create({username , password , email});
        res.status(200).json(tourism_governer);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//for testing
const view_tourism_governer = async (req,res) => {
    try{
        const tourism_governer = await TourismGovernerModel.find();
        res.status(200).json(tourism_governer);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};
// Get all users for a specific role
const getAllUsers = async (req, res) => {
  const { role } = req.params;

  // Check if model exists
  const Model = models[role.toLowerCase()];

  if (!Model) {
    return res.status(400).json({ error: `Model '${role}' not found` });
  }

  try {
    const users = await Model.find(); // Fetch all users for the specified model
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Account
const deleteAccount = async (req, res) => {
    const { id, modelName } = req.params;
  
    //Check if model exists
    const Model = models[modelName.toLowerCase()];
  
    if (!Model) {
      return resizeTo
        .status(400)
        .json({ error: `Model '${modelName}' not found` });
    }
    try {
      const deletedAccount = await Model.findByIdAndDelete(id);
      if (!deletedAccount) {
        return resizeTo.status(404).json({ erro: "This account does not exist" });
      }
      res
        .status(200)
        .json({ message: "Account deleted successfully", deletedAccount });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

module.exports = { create_pref_tag ,  get_pref_tag , update_pref_tag , delete_pref_tag , create_act_category , get_act_category , update_act_category , delete_act_category , add_tourism_governer , view_tourism_governer,addAdmin, deleteAccount, getAllUsers};

