const Activity = require('../models/AdvertiserActivityModel');

  
//Read my Activities
const showMyActivities = async(req,res) => {
   

    const AdvId = req.query.AdvId;

try{
        const result = await Activity.find({advertiser:(AdvId)})
        res.status(200).json(result)
    } catch{
        res.status(400).json({error:"Id is required"})
    }
}

module.exports = { showMyActivities}
  