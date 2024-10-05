//EF93SkpGhRJ9gcfz

require('dotenv').config() // For the env variables ..... then we will use process.env......
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
// Import routes
// const guestRoutes = require('./routes/guestRoutes'); 
const advertiserRoutes = require('./routes/advertiserRoutes'); 
// const sellerRoutes = require('./routes/sellerRoutes'); 
// const tourGuideRoutes = require('./routes/tourGuideRoutes'); 
// const activityRoutes = require('./routes/activityRoutes'); // we  may not use here
const tourismGovernerRoutes = require('./routes/tourismGovernerRoutes'); // we  may not use here
// const advertiserRoutes = require('./routes/advertiserRoutes'); 
const sellerRoutes = require('./routes/sellerRoutes'); 
const tourGuideRoutes = require('./routes/tourGuideRoutes'); 
// const activityRoutes = require('./routes/activityRoutes'); // we  may not use here
const adminRoutes = require('./routes/adminRoutes.js');


//express app
const app = express()


//middleware
app.use(express.json()) // what this does is that it allows us to access the body of the request
app.use(cors()); // Enable CORS for all routes (saw it in a vid)
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})



// Use routes
// app.use('/api/users', guestRoutes);
app.use('/api/advertisers', advertiserRoutes);
// app.use('/api/sellers', sellerRoutes);
app.use('/api/tour-guides', tourGuideRoutes);
app.use('/api/tourism-governer', tourismGovernerRoutes);
app.use('/api/advertisers', advertiserRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/tour-guides', tourGuideRoutes);
app.use('/api/admin', adminRoutes);







//EF93SkpGhRJ9gcfz

// Import routes
// const guestRoutes = require('./routes/guestRoutes'); 

// const activityRoutes = require('./routes/activityRoutes.js'); 
//express app
// const app = express()


//middleware
app.use(express.json()) // what this does is that it allows us to access the body of the request
app.use(cors()); // Enable CORS for all routes (saw it in a vid)

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
// Use routes
// app.use('/api/users', guestRoutes);

// app.use('/api/activity', activityRoutes);
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for reqs when connected to db
app.listen(process.env.PORT,() =>{
    console.log("listeing on port",process.env.PORT)
 })
})
.catch((error)=>{
    console.log(error)
})