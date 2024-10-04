const Activity = require('../models/AdvertiserActivityModel');

  
  //Read my Activities

  const showMyActivities = async(req,res) => {
   

    const AdvUsername = req.query.userId;

    if(AdvUsername){
        const result = await MuseumModel.find({author:mongoose.Types.ObjectId(AdvUsername)})
        res.status(200).json(result)
    } else{
        res.status(400).json({error:"Username is required"})
    }
}

module.exports = { showMyActivities}
  