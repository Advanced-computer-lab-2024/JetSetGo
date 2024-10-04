const ItineraryModel = require('../models/ItineraryModel');

  //Read Itineraries

  const showMyItineraries = async(req,res) => {
   

    const guideId = req.query.guideId;

    try{
        const result = await ItineraryModel.find({tourGuide:(guideId)})
        res.status(200).json(result)
      }catch{
        res.status(400).json({error:"Id is required"})
      }
  

}
  

module.exports = { showMyItineraries}