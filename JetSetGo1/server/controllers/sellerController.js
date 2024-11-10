const Seller = require('../models/SellerModel');

const mongoose= require('mongoose')
const Product= require('../models/ProductModel')
const multer = require('multer');
const path = require('path');

// Create Seller Profile
const createSellerProfile = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
      // Find the seller by ID
      const seller = await Seller.findById(id);

      // Check if the seller is accepted
      if (!seller || !seller.accepted) {
          return res.status(404).json({ error: 'You must be accepted as a seller to create a profile' });
      }

      // Check if the profile fields are already set
      if (seller.name || seller.description) {
          return res.status(404).json({ error: 'You already created a profile' });
      }

      // Update the seller profile with new information
      seller.name = name;
      seller.description = description;

      // Save the updated profile
      await seller.save();
      res.status(200).json(seller);

  } catch (err) {
    console.log("i am here")
      res.status(404).json({ error: err.message });
  }
};


// Update Seller Profile
const updateSellerProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the seller by ID
    const seller = await Seller.findById(id);

    // Check if the seller exists and if they are accepted
    if (!seller || !seller.accepted) {
      return res.status(404).json({ error: 'You must be accepted as a seller to update your profile' });
    }

    // If accepted, update the profile with the provided updates
    const updatedSeller = await Seller.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedSeller);

  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


// Get Seller Profile
const getSellerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the seller by ID
    const seller = await Seller.findById(id);

    // Check if the seller exists and if they are accepted
    if (!seller || !seller.accepted) {
      return res.status(403).json({ error: 'You must be accepted as a seller to view the profile' });
    }

    // Return the profile data if accepted
    res.status(200).json(seller);

  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

const getProducts= async (req,res) => {
  const products = await Product.find({}).sort({createdAt: -1})
  res.status(200).json(products)
}

// Add new product
// const createProduct = async (req, res) =>{
//   const {name, description, price, quantityAvailable, picture, seller, ratings} = req.body

//   try{
//       const product= await Product.create({name, description, price, quantityAvailable, seller, picture,ratings})
//       res.status(200).json(product)
//   } catch(error){
//       res.status(400).json({error: error.message})
//   }

//   res.json({mssg: 'added a new product'})
// }

const getSingleProduct= async (req,res) => {
  const {id}= req.params

  const product = await Product.find({_id:id})
  
  if(!product){
    return res.status(404).json({error:'No such product'})
  }
  res.status(200).json(product)
}

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

const uploadLogo = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

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
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndUpdate({_id:id},{
        ...req.body
    },{ new: true })

    if(!product){
        return res.status(404).json({error:'No such product'})
    }

    res.status(200).json(product)
}

const filterProducts = async(req,res) => {
    
  const { min, max } = req.query;

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
        res.status(404).json({error: error.message})
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
      res.status(500).send('Error fetching products');
  }
};

const searchProductName = async(req,res) => {

    const { name } = req.body;
    
    
    try{
        // Use RegEx to match the substring in the product's name (case-insensitive)
        const productname = await Product.find({name: { $regex: name, $options: 'i' }})
        res.status(200).json(productname)
    }catch(error){
        res.status(404).json({error:error.message})
    }

}

const uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const profileImage = req.file ? req.file.path : null;
  
    // Update the advertiser's profile image in the database
    const seller = await Seller.findByIdAndUpdate(
      id,
      { profileImage },
      { new: true }
    );

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.json({ message: 'Profile image uploaded successfully', imagePath: profileImage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

const requestAccountDeletion = async (req, res) => {
  const {id } = req.params;
  
  
  try {
      const seller = await Seller.findById(id);
      if (!seller) return res.status(404).json({ error: "User not found" });
       console.log("found the user")
      // Update requestedDeletion field
      seller.deletionRequested = true;
      console.log("under")
      await seller.save();
      console.log("under save")

      return res.status(200).json({ message: "Deletion request submitted successfully." });
  } catch (error) {
      return res.status(401).json({ error: error.message});
  }
};

const uploadDoc = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Docs Only!');
    }
  }
});
const uploadDocument = async (req, res) => {
  try {
      const { id } = req.params;

      // Check if files were uploaded
      if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: "No documents uploaded" });
      }

      // Map file paths of uploaded documents
      const documentPaths = req.files.map(file => file.path);

      // Update the documents array in the database
      const seller = await Seller.findByIdAndUpdate(
          id,
          { $push: { documents: { $each: documentPaths } } },
          { new: true }
      );

      if (!seller) {
          return res.status(404).json({ error: "TourGuide not found" });
      }

      res.json({
          message: "Documents uploaded successfully",
          documentPaths: documentPaths
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};







module.exports = { requestAccountDeletion,uploadLogo,createSellerProfile, updateSellerProfile, getSellerProfile,getProducts, createProduct, updateProduct, filterProducts, sortByRate, searchProductName,getSingleProduct,uploadProfileImage, uploadDoc,uploadDocument };
