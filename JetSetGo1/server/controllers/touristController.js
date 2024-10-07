const mongoose= require('mongoose')
const Product= require('../models/ProductModel')




// get all products
const getProducts= async (req,res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products)
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
        res.status(400).json({error:error.message})
    }

}

module.exports = {getProducts, filterProducts, sortByRate, searchProductName};