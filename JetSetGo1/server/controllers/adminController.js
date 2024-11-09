const Admin = require('../models/AdminModel.js');
const preferencetags = require('../models/TagModel.js');
const CategoryModel = require('../models/CategoryModel.js');
const TourismGoverner = require('../models/TourismGovernerModel.js');
const AdvertiserActivityModel = require('../models/AdvertiserActivityModel.js');
const Seller = require('../models/SellerModel');
const TourGuide = require('../models/TourGuideModel');
const Tourist = require('../models/touristModel.js');
const Tourist = require('../models/touristModel.js');
const TourismGovernerModel = require('../models/TourismGovernerModel.js');
const multer = require('multer');
const path = require('path');
const Product= require('../models/ProductModel');
const Advertiser = require('../models/AdvertiserModel.js');
const Itinerary = require("../models/ItineraryModel");
const Complaint = require('../models/ComplaintModel.js')
const Complaint = require('../models/ComplaintModel');
const mongoose= require('mongoose')


const models={admin: Admin, seller: Seller, tourguides: TourGuide, tourist: Tourist, advertisers: Advertiser, tourismgoverner: TourismGoverner};
////////////////////////////////////////////////////////////////////////////////

// Get All Itineraries
const getAllItineraries = async (req, res) => {
    try {
      const itineraries = await Itinerary.find(); // Fetch all itineraries from the database
      res.status(200).json({ itineraries });
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching itineraries.', details: error.message });
    }
  };
  

// Flag an Itinerary
const flagItinerary = async (req, res) => {
    const { itineraryId } = req.params;
    
  
    
  
    try {
      // Validate itinerary ID
      if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
        return res.status(400).json({ error: 'Invalid itinerary ID.' });
      }
  
      const itinerary = await Itinerary.findById(itineraryId);
  
      if (!itinerary) {
        return res.status(404).json({ error: 'Itinerary not found.' });
      }
      
      // Set flagged to true
      itinerary.flagged = true;
  
      await itinerary.save();
  
      res.status(200).json({ message: 'Itinerary flagged successfully.', itinerary });
    } catch (error) {
      res.status(500).json({ error: 'Server error while flagging itinerary.', details: error.message });
    }
  };

  



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

  // get all products
const getProducts= async (req,res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products)
}

const getSingleProduct= async (req,res) => {
    const {id}= req.params

    const product = await Product.find({_id:id})
    res.status(200).json(product)
}


// Add new product
// const createProduct = async (req, res) =>{
//     const {name, description, price, quantityAvailable, picture, seller, ratings} = req.body

//     try{
//         const product= await Product.create({name, description, price, quantityAvailable, seller, picture,ratings})
//         res.status(200).json({mssg: 'added a new product'})
//         console.log(product)
//     } catch(error){
//         res.status(400).json({error: error.message})
//     }

// }
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a unique name
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage }).single('picture');

// Create a new product function
const createProduct = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Image upload failed' });
        }
        
        const { name, description, price, quantityAvailable, seller, ratings } = req.body;

        try {
            // Create a new product with the uploaded image path
            const newProduct = new Product({
                name,
                description,
                price,
                quantityAvailable,
                picture: req.file ? req.file.path : null, // Save the image path
                seller,
                ratings
            });

            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};


//  update a product
const updateProduct = async (req, res) =>{
    const { id } = req.params
  
    const updates= req.body
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }
    
  
    const product = await Product.findOneAndUpdate({_id:id},updates, { new: true })
  
    if(!product){
        return res.status(404).json({error:'No such product'})
    }
  
    res.status(200).json(product)
  }

const filterProducts = async(req,res) => {
    
    const{min, max}= req.query;

    try{
        const query = {
            price: {
              $gte: min, // Greater than or equal to minPrice
              $lte: max, // Less than or equal to maxPrice
            },
          };
        const products = await Product.find(query)
        res.status(200).json(products)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const sortByRate = async (req, res) => {
    const  {flag}  = req.query; // Use req.query here
    var x=0
    try {
      if (flag=="1") {
        x=1
      }
      else{
        x=-1
      }
        // Get sorted products by ratings in descending order
        const products = await Product.find().sort(  {ratings:x} ); // Change to 1 for ascending order and -1 for descending
        res.status(200).json(products); // Send the sorted products as JSON
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching products');
    }
  };

const searchProductName = async(req,res) => {

    const { name } = req.body;
    
    
    try{
        // Use RegEx to match the substring in the product's name (case-insensitive)
        const productname = await Product.find({name: { $regex: name, $options: 'i' }})
        res.status(200).json(productname)
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

//Mahmoud REQUIREMENTS ( 74,75,76,77)
////////////////////////////////////////////////////////////////////////////////
const getComplaints = async (req,res) =>{
    try{
        const complaint = await Complaint.find();

        if(complaint.length === 0)
        {
         return res.status(404).json({error:"No Complaints Found"})
        }
        res.status(200).json(complaint)
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
}

const viewComplaint = async (req,res) =>{
    try{
       const complaintId = req.query.complaintId

        if(complaintId)
        {
            const complaint = await Complaint.findById({_id : complaintId})
            res.status(200).json(complaint)
        }
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
}

//Most likely a POST request
const resolveComplaint = async (req,res) =>{
    try{
        const {complaintId,reply} = req.body

        if(complaintId)
        {
            const complaint = await Complaint.findById(complaintId)
            console.log(reply)
            complaint.status = 'resolved'
            complaint.adminResponse = reply
            await complaint.save();
            
            console.log(complaint.status)
            console.log(complaint.adminResponse)
            res.status(200).json(complaint) //IN Frontend (if ok then continue to another page which says go back)
        }
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
}




const getUploadedDocuments = async (req, res) => {
  try {
      const tourGuides = await TourGuide.find({ accepted: false ,rejected:false }).select('_id username documents');
      const advertisers = await Advertiser.find({ accepted: false ,rejected:false }).select('_id username documents');
      const sellers = await Seller.find({ accepted: false ,rejected:false }).select('_id username documents');
  
      // Combine the results
      const documents = {
        tourGuides: tourGuides.map(tourGuide => ({
          id: tourGuide._id,
          username: tourGuide.username,
          documents: tourGuide.documents
        })),
        advertisers: advertisers.map(advertiser => ({
          id: advertiser._id,
          username: advertiser.username,
          documents: advertiser.documents
        })),
        sellers: sellers.map(seller => ({
          id: seller._id,
          username: seller.username,
          documents: seller.documents
        }))
      };
    // Send the documents as a response
    res.status(200).json(documents);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to retrieve documents.' });
  }
};


const AcceptUserStatus = async (req, res) => {
    const { id, modelName } = req.params;
     
    const Model = models[modelName.toLowerCase()];
  
    if (!Model) {
      return res.status(200).json({ message: "Account is accepted", user });
    }
    try {
      const user = await Model.findById(id);
      if (!user) {
        return res.status(200).json({ message: "acc does not exist" });
      }
      user.accepted = true; // Update the accepted field

      await user.save();
      res.status(200).json({ message: "Account is accepted", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

const RejectUserStatus = async (req, res) => {
    const { id, modelName } = req.params;
     
    const Model = models[modelName.toLowerCase()];
  
    if (!Model) {
      return res
        .status(400)
        .json({ error: `Model '${modelName}' not found` });
    }
    try {
      const user = await Model.findById(id);
      if (!user) {
        return res.status(404).json({ erro: "This account does not exist" });
      }
      user.rejected = true; // Update the accepted field

      await user.save();
      res.status(200).json({ message: "Account is rejected", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};



module.exports = { getComplaints,RejectUserStatus,AcceptUserStatus,getUploadedDocuments,create_pref_tag ,  get_pref_tag , update_pref_tag , delete_pref_tag , create_act_category , get_act_category , update_act_category , delete_act_category , add_tourism_governer , view_tourism_governer,addAdmin, deleteAccount, getAllUsers
    ,getProducts, createProduct, updateProduct, filterProducts, sortByRate, searchProductName,getSingleProduct,getComplaints,
    viewComplaint,resolveComplaint,flagItinerary,getAllItineraries};

