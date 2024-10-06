const Seller = require('../models/SellerModel');

const mongoose= require('mongoose')
const Product= require('../models/ProductModel')

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
const createProduct = async (req, res) => {
  const { name, description, price, quantityAvailable, picture, seller, ratings } = req.body;

  // Input validation
  if (!name || !description || !price || !quantityAvailable || !seller || !picture) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  if (isNaN(price) || isNaN(quantityAvailable) || (ratings && isNaN(ratings))) {
      return res.status(400).json({ error: 'Price, quantity, and ratings must be valid numbers' });
  }

  try {
      const product = await Product.create({
          name,
          description,
          price,
          quantityAvailable,
          seller,
          picture,
          ratings: ratings || 0, // Default ratings to 0 if not provided
      });

      res.status(200).json({ mssg: 'Added a new product', product });
      console.log(product);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
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

module.exports = { createSellerProfile, updateSellerProfile, getSellerProfile,getProducts, createProduct, updateProduct, filterProducts, sortByRate, searchProductName };
