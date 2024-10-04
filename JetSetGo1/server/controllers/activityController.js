const Activity = require('../models/AdvertiserActivityModel');

// Create Activity
const createActivity = async (req, res) => {
  const { date, time, location, price, category, tags, special_discounts, booking_open } = req.body;

  try {
    const newActivity = await Activity.create({ date, time, location, price, category, tags, special_discounts, booking_open });
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Activity
const updateActivity = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Activity
const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    await Activity.findByIdAndDelete(id);
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Search Activity by name
const searchActivityByName = async (req,res) => {
  const activityName = req.body
  try{
    const activty = await Activity.find(activityName)
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by category 
const searchActivityByCategory = async (req,res) =>{
  const categoryName = req.body
  try{
    const activty = await Activity.find(categoryName)
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by tag 
const searchActivityByTag = async (req,res) =>{
  const tagName = req.body
  try{
    const activty = await Activity.find(tagName)
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by date 
const searchActivityByDate = async (req,res) =>{
  const dateReq = req.body
  try{
    const activty = await Activity.find(dateReq)
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by rating 
const searchActivityByRating = async (req,res) =>{
  const ratingReq = req.body
  try{
    const activty = await Activity.find(ratingReq)
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by budget
const searchActivityByBudget = async (req,res) =>{
  const budget = req.body
  try{
    const activty = await Activity.find()
    
    const result = activty.filter(el => el.price <= budget.price)

    res.status(200).json(result)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

module.exports = { createActivity, updateActivity, deleteActivity, getActivities,
searchActivityByBudget,searchActivityByDate,searchActivityByRating,searchActivityByTag,searchActivityByCategory,searchActivityByName };
