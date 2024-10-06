const Admin = require('../models/AdminModel.js');
const preferencetags = require('../models/TagModel.js');
const CategoryModel = require('../models/CategoryModel.js');
const TourismGovernerModel = require('../models/TourismGovernerModel.js');
const AdvertiserActivityModel = require('../models/AdvertiserActivityModel.js');
const mongoose= require('mongoose')
const Product= require('../models/ProductModel')

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

// get all products
const getProducts= async (req,res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products)
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

module.exports = { create_pref_tag ,  get_pref_tag , update_pref_tag , delete_pref_tag , create_act_category , get_act_category , update_act_category , delete_act_category , add_tourism_governer , view_tourism_governer
    ,getProducts, createProduct, updateProduct, filterProducts, sortByRate, searchProductName};

