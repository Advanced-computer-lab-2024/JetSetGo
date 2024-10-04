const ItineraryModel = require('../models/ItineraryModel');

  //Read Itineraries

  const showMyItineraries = async(req,res) => {
   

    const guideUsername = req.query.userId;

    if(guideUsername){
        const result = await ItineraryModel.find({author:mongoose.Types.ObjectId(guideUsername)})
        res.status(200).json(result)
    } else{
        res.status(400).json({error:"Username is required"})
    }
}
  

module.exports = { showMyItineraries}