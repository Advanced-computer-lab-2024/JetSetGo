const Tourist = require('../models/touristModel'); 
//66f8084788afe7e5aff3aefc

// Update tourist information
const updateInfo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedInfo = await Tourist.findByIdAndUpdate(id, updates, { new: true });
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
    res.status(404).json({ error: 'Profile not found' });
  }
};

//Search Historical Location by Name
const searchHistoricalPlaceByName = async (req,res) =>{
    const nameReq = req.body
    try{
      const Historical = await HistoricalLocations.find(nameReq)
      if(Historical.length == 0)
        {
          res.status(404).json({error:"Historical Place not found"})
        }
      res.status(200).json(Historical)
    }
    catch(error){
      res.status(404).json({error:"Historical Place not found"})
    }
};

//Search Historical Location by Category
const searchHistoricalPlaceByCategory = async (req,res) =>{
    const nameReq = req.body
    try{
      const Historical = await HistoricalLocations.find(nameReq)
      if(Historical.length == 0)
        {
          res.status(404).json({error:"Historical Place not found"})
        }
      res.status(200).json(Historical)
    }
    catch(error){
      res.status(404).json({error:"Historical Place not found"})
    }
};

//Search Historical Location by Tag
const searchHistoricalPlaceByTag = async (req,res) =>{
    const nameReq = req.body
    try{
      const Historical = await HistoricalLocations.find(nameReq)
      if(Historical.length == 0)
        {
          res.status(404).json({error:"Historical Place not found"})
        }
      res.status(200).json(Historical)
    }
    catch(error){
      res.status(404).json({error:"Historical Place not found"})
    }
};

//Search Museum by Tag
const searchMuseumeByTag = async (req,res) =>{
    const nameReq = req.body
    try{
      const Museum = await Museum.find(nameReq)
      if(Museum.length == 0)
      {
        res.status(404).json({error:"Museum not found"})
      }
      res.status(200).json(Museum)
    }
    catch(error){
      res.status(404).json({error:"Museum not found"})
    }
};

//Search Museum by Name
const searchMuseumeByName = async (req,res) =>{
    const nameReq = req.body
    try{
      const Museum = await Museum.find(nameReq)
      if(Museum.length == 0)
      {
        res.status(404).json({error:"Museum not found"})
      }
      res.status(200).json(Museum)
    }
    catch(error){
      res.status(404).json({error:"Museum not found"})
    }
};

//Search Museum by Category
const searchMuseumeByCategory = async (req,res) =>{
    const nameReq = req.body
    try{
      const Museum = await Museum.find(nameReq)
      if(Museum.length == 0)
      {
        res.status(404).json({error:"Museum not found"})
      }
      res.status(200).json(Museum)
    }
    catch(error){
      res.status(404).json({error:"Museum not found"})
    }
};
module.exports = {updateInfo, getInfo,searchHistoricalPlaceByTag,searchHistoricalPlaceByName,searchHistoricalPlaceByCategory,
    searchMuseumeByTag,searchMuseumeByName,searchMuseumeByCategory
 };