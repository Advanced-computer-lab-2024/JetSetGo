const mongoose= require('mongoose')
const Product= require('../models/ProductModel')
const Tourist = require("../models/TouristModel");



// get all products
const getProducts= async (req,res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products)
}

const filterProducts = async(req,res) => {
    
    const{min, max}= req.body

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

const sortByRate = async(req,res) => {
    const{flag}=req.body
    try {
        // Get sorted products by ratings in descending order
        const products = await Product.find().sort({ ratings: flag }); // Change to 1 for ascending order and -1 for desc
    
        res.status(200).json(products); // Send the sorted products as JSON
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
      }
}

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

//66f8084788afe7e5aff3aefc
module.exports = {getProducts, filterProducts, sortByRate, searchProductName,updateInfo, getInfo};

