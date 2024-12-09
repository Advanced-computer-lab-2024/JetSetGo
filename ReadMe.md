
# JetSetGo

JetSetGo is your all-in-one travel platform designed to make vacation planning effortless and exciting! Whether you're dreaming of historic landmarks, relaxing beaches, or family-friendly adventures, our app combines everything you need for the perfect trip.

## Motivation

Traveling should be enjoyable, not complicated. JetSetGo was created to simplify the travel process, offering an efficient and accessible platform for users to explore cities, museums, and landmarks online. Our goal is to bring a new level of ease and convenience to travel planning, making it effortless for everyone to plan their dream trips and create unforgettable experiences.

## Build Status

The project is currently in development.

### Current Challenges
- The testing technique needs improvement. Plans are underway to create Jest test files and enable them as workflows for more robust and efficient testing.

### Future Improvements
1. Implement a caching layer to enhance application performance.
2. Integrate a message broker to handle asynchronous tasks such as sending emails and notifications.

## Code Style 📜

This project adheres to the following code style guidelines:

1. **Naming Conventions**:
   - Use `camelCase` for variable and function names.

2. **Comments**:
   - Add comments before functions and complex logic to explain their purpose.
   - Keep comments concise and informative.

3. **File Organization**:
   - The project is organized into the following main directories:
     - `server`: Contains the backend server code, organized as follows:
       - `routes`: Defines the API endpoints.
       - `controllers`: Contains logic for handling API requests.
       - `models`: Manages the database schema and interactions.
       - `uploads`: Stores uploaded files.
     - `client`: Contains the frontend React application, organized as follows:
       - `components`: Reusable UI elements.
       - `assets`: Images, icons, and other static resources.
       - `pages`: Complete pages used in the application.


4. **Version Control**:
   - Use Git for version control.
   - Write clear and concise commit messages following [Conventional Commits](https://www.conventionalcommits.org/) guidelines.

5. **Whitespace**:
   - Use whitespace to enhance code readability. Ensure whitespace around operators and after commas.

6. **Coding Standards**:
   - Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for JavaScript/React code.

Please ensure your code adheres to these guidelines before submitting a pull request.



## Tech/Framework Used 🧰

JetSetGo is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

### Tool
- **VS Code**

### Frontend
- **React**
- **Bootstrap**
- **Material-UI**

### Backend
- **Node.js** (v18.18.0)
- **Express.js**
- **MongoDB**


## Features ✨ 

JetSetGo is packed with features to make your travel experience seamless and enjoyable:

- **Personalized Travel Planning**: Tailor your vacation with preferences like historic sites, beaches, shopping, and budget-friendly options.
- **Seamless Booking**: Book flights, hotels, and transportation directly within the app through trusted third-party services—no redirects, just easy and fast bookings.
- **Smart Budgeting**: Get activity suggestions that fit your remaining budget after booking flights and hotels, with transportation costs included for stress-free planning.
- **Discover Local Gems**: Explore curated activities, museums, and historical landmarks, complete with ticket prices and directions.
- **Real-Time Notifications**: Stay updated on upcoming events and activities you’ve booked with instant app and email alerts.
- **Tour Guides & Itineraries**: Find expert-guided tours or create your own adventure with customizable itineraries and detailed activity breakdowns.
- **Exclusive Gift Shop**: Stop by our in-app gift shop for souvenirs and unique local items to remember your trip by!

These features make JetSetGo a comprehensive and user-friendly travel companion. Let me know if you’d like to emphasize or rephrase anything!

## Code Examples 🐱‍💻
here are some code examples for developers to have an overview about our implementation

#### register for a new user:
```javascript
// Create a new Tour Guide instance and save it in the database

const user = await User.create({
            username,
            password: password,
            userType: 'TourGuide',
            userDetails: newTourGuide._id,
        });

```

#### login:
```javascript
// Extract user information from the request body
const { username, password } = req.body;

// Find the user in the database
const user = await User.findOne({ username });

// Compare the provided password with the user's stored password
if (user.password!=password) {
        return res.status(401).json({ error: 'Invalid password' });
}

// Create a token for the user and send it to the browser
const token = jwt.sign(
        { id: user.userDetails, userType: user.userType },
        JWT_SECRET,
        { expiresIn: '24h' } // Set expiration to 24 hours
      );
  
      res.json({ token, message: 'Login successful' });


```
#### create activity:
```javascript
 // Create a new activity for an advertiser
const {title,date,time,location,price,category,tags,advertiser,bookingOpen,specialDiscounts} = req.body;
const newActivity = await Activity.create({ title, date, time, location, price, category, tags, bookingOpen,advertiser,specialDiscounts });

 // Update and save an activity for an advertiser
const { id } = req.params;
const updates = req.body;

updatedActivity = await Activity.findByIdAndUpdate(id,{ $push: { tags: newTag },
                                                              $set: otherUpdates, // Update other fields if provided
                                                             },
                                                                 { new: true }
      );

```
#### view complaints:
```javascript
//view uploaded documents as an admin from sellers/advertisers/tourguides
// find sellers/advertisers/tourguides by id
const tourGuides = await TourGuide.find({ accepted: false ,rejected:false }).select('_id username documents');
const advertisers = await Advertiser.find({ accepted: false ,rejected:false }).select('_id username documents');
const sellers = await Seller.find({ accepted: false ,rejected:false }).select('_id username documents');

// Combine the results
const documents = {
  tourGuides: tourGuides.map(tourGuide => ({
    id: tourGuide._id,
    username: tourGuide.username,
    documents: tourGuide.documents
  })),
  advertisers: advertisers.map(advertiser => ({
    id: advertiser._id,
    username: advertiser.username,
    documents: advertiser.documents
  })),
  sellers: sellers.map(seller => ({
    id: seller._id,
    username: seller.username,
    documents: seller.documents
  }))
};

// Send the documents as a response
      res.status(200).json(documents);

```


## Installation 📥

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Advanced-computer-lab-2024/JetSetGo
   ```

2. **Open the Project in Visual Studio Code**

3. **choose view terminal and Setup the Server:**
```
cd sever
npm install
```
4. **Start the Server:**
```
nodemon server.js
```
5. **Open Another Terminal for the Client:**
```
cd client
cd src
npm install
npm install react react-dom
npm install react-bootstrap
npm install @mui/material @emotion/react @emotion/styled
```
6. **Start the Client Application:**
```
npm start
```
7. **Open any web browser and navigate to**
```
http://localhost:3000/
```

## API Reference 📚

<details> <summary>Admin APIs</summary>

#### PATCH /change-password/:id/:modelName
* **Purpose:** Change the password for a user.
* **Authentication:** Required (Admin)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): User ID.
  - `modelName` (path): Model name (e.g., Admin, User).
* **Response:** Success message or error.

#### GET /view-documents
* **Purpose:** View uploaded documents.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of uploaded documents or error message.

#### PATCH /itineraries/:itineraryId/flag
* **Purpose:** Flag an itinerary for review.
* **Authentication:** Required (Admin)
* **HTTP Method:** PATCH
* **Parameters:**
  - `itineraryId` (path): The itinerary ID to be flagged.
* **Response:** Success message or error.

#### GET /itineraries
* **Purpose:** Retrieve all itineraries.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of itineraries or error message.

#### GET /viewComplaints
* **Purpose:** Retrieve all complaints.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of complaints or error message.

#### POST /createtag
* **Purpose:** Create a new preference tag.
* **Authentication:** Required (Admin)
* **HTTP Method:** POST
* **Parameters:** Tag information (body).
* **Response:** Success message or error.

#### PATCH /updatetag
* **Purpose:** Update an existing preference tag.
* **Authentication:** Required (Admin)
* **HTTP Method:** PATCH
* **Parameters:** Tag information (body).
* **Response:** Success message or error.

#### DELETE /deletetag/:id
* **Purpose:** Delete a preference tag.
* **Authentication:** Required (Admin)
* **HTTP Method:** DELETE
* **Parameters:**
  - `id` (path): The tag ID to be deleted.
* **Response:** Success message or error.

#### GET /tag
* **Purpose:** Retrieve all preference tags.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of preference tags or error message.

#### POST /create_category
* **Purpose:** Create a new activity category.
* **Authentication:** Required (Admin)
* **HTTP Method:** POST
* **Parameters:** Category information (body).
* **Response:** Success message or error.

#### PATCH /update_category
* **Purpose:** Update an existing activity category.
* **Authentication:** Required (Admin)
* **HTTP Method:** PATCH
* **Parameters:** Category information (body).
* **Response:** Success message or error.

#### DELETE /delete_category/:id
* **Purpose:** Delete an activity category.
* **Authentication:** Required (Admin)
* **HTTP Method:** DELETE
* **Parameters:**
  - `id` (path): The category ID to be deleted.
* **Response:** Success message or error.

#### GET /category
* **Purpose:** Retrieve all activity categories.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of activity categories or error message.

#### POST /create_tourism_governer
* **Purpose:** Add a new tourism governor.
* **Authentication:** Required (Admin)
* **HTTP Method:** POST
* **Parameters:** Tourism governor information (body).
* **Response:** Success message or error.

#### GET /viewTourismGoverner
* **Purpose:** View all tourism governors.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of tourism governors or error message.

#### POST /add
* **Purpose:** Add a new admin.
* **Authentication:** Required (Admin)
* **HTTP Method:** POST
* **Parameters:** Admin details (body).
* **Response:** Success message or error.

#### DELETE /delete/:modelName/:id
* **Purpose:** Delete a user or model by ID.
* **Authentication:** Required (Admin)
* **HTTP Method:** DELETE
* **Parameters:**
  - `modelName` (path): The model name (e.g., User, Admin).
  - `id` (path): The ID of the user or model to delete.
* **Response:** Success message or error.

#### GET /:role/list
* **Purpose:** Retrieve a list of users by role (e.g., Admin, User).
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:**
  - `role` (path): The user role to list (e.g., Admin, User).
* **Response:** List of users or error message.

#### GET /Products/:id
* **Purpose:** Retrieve product details by ID.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The product ID.
* **Response:** Product details or error message.

#### GET /filterProducts/:id
* **Purpose:** Filter products by ID.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The product ID.
* **Response:** Filtered products or error message.

#### GET /sortByRate/:id
* **Purpose:** Retrieve products sorted by rating.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The product ID.
* **Response:** Sorted products by rating or error message.

#### POST /createProduct
* **Purpose:** Create a new product.
* **Authentication:** Required (Admin)
* **HTTP Method:** POST
* **Parameters:** Product information (body).
* **Response:** Success message or error.

#### PATCH /product/:id
* **Purpose:** Update product information.
* **Authentication:** Required (Admin)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): The product ID.
* **Response:** Success message or error.

#### GET /getSingleProduct/:id
* **Purpose:** Retrieve a single product by ID.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The product ID.
* **Response:** Product details or error message.

#### POST /resolveComplaint
* **Purpose:** Resolve a complaint.
* **Authentication:** Required (Admin)
* **HTTP Method:** POST
* **Parameters:** Complaint resolution details (body).
* **Response:** Success message or error.

#### GET /sales/:id
* **Purpose:** Retrieve sales details by product ID.
* **Authentication:** Required (Admin)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The product ID.
* **Response:** Sales details or error message.

</details>

<details> <summary>Advertiser APIs</summary>

#### PATCH /:id/upload-profile-image
* **Purpose:** Upload a profile image for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): Advertiser ID.
  - `image` (form data): Profile image file.
* **Response:** Success message or error.

#### PATCH /:id/upload-Doc
* **Purpose:** Upload documents for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): Advertiser ID.
  - `image` (form data): Array of document files.
* **Response:** Success message or error.

#### PATCH /change-password/:id/:modelName
* **Purpose:** Change the password for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): Advertiser ID.
  - `modelName` (path): Model name (e.g., Advertiser).
* **Response:** Success message or error.

#### POST /createActivity
* **Purpose:** Create a new activity for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** POST
* **Parameters:** Activity details (body).
* **Response:** Success message or error.

#### PATCH /updateActivity/:id
* **Purpose:** Update an existing activity.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): The activity ID.
* **Response:** Success message or error.

#### GET /
* **Purpose:** Retrieve all activities for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of activities or error message.

#### POST /newTransportation
* **Purpose:** Create new transportation details for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** POST
* **Parameters:** Transportation details (body).
* **Response:** Success message or error.

#### GET /showTransportation
* **Purpose:** Retrieve transportation details for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of transportation details or error message.

#### PATCH /updateTransportation/:id
* **Purpose:** Update transportation details for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): The transportation ID.
* **Response:** Success message or error.

#### DELETE /deleteTransportation/:id
* **Purpose:** Delete a transportation detail for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** DELETE
* **Parameters:**
  - `id` (path): The transportation ID.
* **Response:** Success message or error.

#### PATCH /requestDelete/:id
* **Purpose:** Request account deletion for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): Advertiser ID.
* **Response:** Success message or error.

#### GET /findtransport/:id
* **Purpose:** Find transportation details for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The transportation ID.
* **Response:** Transportation details or error message.

#### GET /findrefdetails/:id/:type
* **Purpose:** Find reference details for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The reference ID.
  - `type` (path): The type of reference.
* **Response:** Reference details or error message.

#### POST /createProfile/:id
* **Purpose:** Create an advertiser profile.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** POST
* **Parameters:**
  - `id` (path): Advertiser ID.
  - Advertiser profile details (body).
* **Response:** Success message or error.

#### PATCH /updateProfile/:id
* **Purpose:** Update an advertiser profile.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): Advertiser ID.
* **Response:** Success message or error.

#### GET /profile/:id
* **Purpose:** Retrieve an advertiser's profile.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): Advertiser ID.
* **Response:** Advertiser profile details or error message.

#### DELETE /deleteAct/delete/:id
* **Purpose:** Delete an activity for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** DELETE
* **Parameters:**
  - `id` (path): Activity ID.
* **Response:** Success message or error.

#### DELETE /:id
* **Purpose:** Delete an activity for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** DELETE
* **Parameters:**
  - `id` (path): Activity ID.
* **Response:** Success message or error.

#### POST /showAll/:id
* **Purpose:** Show all activities for the advertiser.
* **Authentication:** Required (Advertiser)
* **HTTP Method:** POST
* **Parameters:**
  - `id` (path): Advertiser ID.
* **Response:** List of activities or error message.

</details>

<details> <summary>Guest APIs</summary>

#### POST /searchActivityByRating
* **Purpose:** Search activities based on rating.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Activity search criteria (body).
* **Response:** List of activities filtered by rating or error message.

#### POST /searchActivityByDate
* **Purpose:** Search activities based on date.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Activity search criteria (body).
* **Response:** List of activities filtered by date or error message.

#### POST /searchActivityByCategory
* **Purpose:** Search activities based on category.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Activity search criteria (body).
* **Response:** List of activities filtered by category or error message.

#### POST /searchActivityByBudget
* **Purpose:** Search activities based on budget.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Activity search criteria (body).
* **Response:** List of activities filtered by budget or error message.

#### POST /searchItineraryByDate
* **Purpose:** Search itineraries based on date.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Itinerary search criteria (body).
* **Response:** List of itineraries filtered by date or error message.

#### POST /searchItineraryByBudget
* **Purpose:** Search itineraries based on budget.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Itinerary search criteria (body).
* **Response:** List of itineraries filtered by budget or error message.

#### POST /searchItineraryByLanguage
* **Purpose:** Search itineraries based on language.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Itinerary search criteria (body).
* **Response:** List of itineraries filtered by language or error message.

#### POST /searchItineraryByTag
* **Purpose:** Search itineraries based on tag.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Itinerary search criteria (body).
* **Response:** List of itineraries filtered by tag or error message.

#### GET /activities/category/:categoryId
* **Purpose:** Get activities by category.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:**
  - `categoryId` (path): The category ID of activities.
* **Response:** List of activities in the specified category.

#### GET /categories
* **Purpose:** Get all available activity categories.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of all categories.

#### GET /getUpcomingActivities
* **Purpose:** Get upcoming activities.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of upcoming activities.

#### GET /sortActivityByPrice
* **Purpose:** Sort activities by price.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of activities sorted by price.

#### GET /sortActivityByRating
* **Purpose:** Sort activities by rating.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of activities sorted by rating.

#### GET /getUpcomingItineraries
* **Purpose:** Get upcoming itineraries.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of upcoming itineraries.

#### GET /sortItineraryByPrice
* **Purpose:** Sort itineraries by price.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of itineraries sorted by price.

#### GET /sortItineraryByRating
* **Purpose:** Sort itineraries by rating.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of itineraries sorted by rating.

#### GET /getMuseums
* **Purpose:** Get all museums.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of museums.

#### GET /filterMuseumsByTag/:id
* **Purpose:** Filter museums by tag.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The tag ID to filter museums by.
* **Response:** List of museums filtered by tag.

#### GET /getHistoricalLocations
* **Purpose:** Get all historical locations.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of historical locations.

#### GET /filterHistoricalLocationsByTag/:id
* **Purpose:** Filter historical locations by tag.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:**
  - `id` (path): The tag ID to filter historical locations by.
* **Response:** List of historical locations filtered by tag.

</details>

<details> <summary>Product APIs</summary>

#### GET /
* **Purpose:** Get all products.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of all products.

#### GET /filterProducts
* **Purpose:** Filter products based on specific criteria.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** Filter criteria (query params).
* **Response:** List of products matching the filter criteria.

#### GET /sortByRate
* **Purpose:** Sort products by rating.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of products sorted by rating.

#### GET /searchProductName
* **Purpose:** Search products by name.
* **Authentication:** None
* **HTTP Method:** GET
* **Parameters:** Product name (query param).
* **Response:** List of products matching the search name.

#### POST /create
* **Purpose:** Create a new product.
* **Authentication:** Admin or authorized user
* **HTTP Method:** POST
* **Parameters:** Product details (body).
* **Response:** The newly created product or an error message.

#### PATCH /getSingleProduct/:id
* **Purpose:** Get details of a single product by its ID.
* **Authentication:** None
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): The product ID to fetch details for.
* **Response:** Product details or error message.

#### PATCH /:id
* **Purpose:** Update product details.
* **Authentication:** Admin or authorized user
* **HTTP Method:** PATCH
* **Parameters:**
  - `id` (path): The product ID to update.
* **Response:** Updated product details or error message.

</details>

<details> <summary>Registration APIs</summary>

#### POST /registerTourist
* **Purpose:** Register a new tourist user.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** Tourist details (body).
* **Response:** The newly registered tourist or an error message.

#### POST /registerTourGuide
* **Purpose:** Register a new tour guide user with required documents.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** 
  - `documents` (form-data): Required documents for registration.
  - Tour guide details (body).
* **Response:** The newly registered tour guide or an error message.

#### POST /registerAdvertiser
* **Purpose:** Register a new advertiser user with required documents.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** 
  - `documents` (form-data): Required documents for registration.
  - Advertiser details (body).
* **Response:** The newly registered advertiser or an error message.

#### POST /registerSeller
* **Purpose:** Register a new seller user with required documents.
* **Authentication:** None
* **HTTP Method:** POST
* **Parameters:** 
  - `documents` (form-data): Required documents for registration.
  - Seller details (body).
* **Response:** The newly registered seller or an error message.

</details>

<details> <summary>Seller APIs</summary>

#### PATCH /:id/upload-profile-image
* **Purpose:** Upload a profile image for the seller.
* **Authentication:** Required (Seller)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `image` (form-data): The profile image file.
* **Response:** Success or error message.

#### PATCH /:id/upload-Doc
* **Purpose:** Upload documents for the seller.
* **Authentication:** Required (Seller)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `image` (form-data): The documents to upload.
* **Response:** Success or error message.

#### PATCH /requestDelete/:id
* **Purpose:** Request to delete the seller account.
* **Authentication:** Required (Seller)
* **HTTP Method:** PATCH
* **Parameters:** None
* **Response:** Success or error message.

#### PATCH /change-password/:id/:modelName
* **Purpose:** Change the password for the seller account.
* **Authentication:** Required (Seller)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `id` (path parameter): Seller's ID.
  - `modelName` (path parameter): Model name for password change.
* **Response:** Success or error message.

#### POST /create/:id
* **Purpose:** Create a new seller profile.
* **Authentication:** Required (Seller)
* **HTTP Method:** POST
* **Parameters:** Seller profile details (body).
* **Response:** Newly created seller profile or error message.

#### PATCH /update/:id
* **Purpose:** Update the seller profile.
* **Authentication:** Required (Seller)
* **HTTP Method:** PATCH
* **Parameters:** Seller profile update details (body).
* **Response:** Updated seller profile or error message.

#### GET /profile/:id
* **Purpose:** Retrieve the seller profile.
* **Authentication:** Required (Seller)
* **HTTP Method:** GET
* **Parameters:** Seller ID (path parameter).
* **Response:** Seller profile details or error message.

#### GET /Products/:id
* **Purpose:** Retrieve products listed by the seller.
* **Authentication:** Required (Seller)
* **HTTP Method:** GET
* **Parameters:** Seller ID (path parameter).
* **Response:** List of products or error message.

#### GET /filterProducts/:id
* **Purpose:** Filter products listed by the seller.
* **Authentication:** Required (Seller)
* **HTTP Method:** GET
* **Parameters:** Seller ID (path parameter).
* **Response:** Filtered list of products or error message.

#### GET /sortByRate/:id
* **Purpose:** Sort products by rating listed by the seller.
* **Authentication:** Required (Seller)
* **HTTP Method:** GET
* **Parameters:** Seller ID (path parameter).
* **Response:** Sorted list of products or error message.

#### GET /searchProductName
* **Purpose:** Search products by name listed by the seller.
* **Authentication:** Required (Seller)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of products or error message.

#### POST /createProduct
* **Purpose:** Create a new product listing for the seller.
* **Authentication:** Required (Seller)
* **HTTP Method:** POST
* **Parameters:** Product details (body).
* **Response:** Created product or error message.

#### GET /getSingleProduct/:id
* **Purpose:** Retrieve details of a single product.
* **Authentication:** Required (Seller)
* **HTTP Method:** GET
* **Parameters:** Product ID (path parameter).
* **Response:** Product details or error message.

#### PATCH /archieved/:id
* **Purpose:** Archive a product listing.
* **Authentication:** Required (Seller)
* **HTTP Method:** PATCH
* **Parameters:** Product ID (path parameter).
* **Response:** Success or error message.

#### PATCH /product/:id
* **Purpose:** Update product listing details.
* **Authentication:** Required (Seller)
* **HTTP Method:** PATCH
* **Parameters:** Product ID (path parameter) and updated product details (body).
* **Response:** Updated product or error message.

</details>

<details> <summary>Tour Guide APIs</summary>

#### PATCH /:id/upload-profile-image
* **Purpose:** Upload a profile image for the tour guide.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `image` (form-data): The profile image file.
* **Response:** Success or error message.

#### PATCH /:id/upload-Doc
* **Purpose:** Upload documents for the tour guide.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `image` (form-data): The documents to upload.
* **Response:** Success or error message.

#### GET /showAll
* **Purpose:** Retrieve all itineraries created by the tour guide.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of itineraries or error message.

#### PATCH /change-password/:id/:modelName
* **Purpose:** Change the password for the tour guide account.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `id` (path parameter): Tour Guide's ID.
  - `modelName` (path parameter): Model name for password change.
* **Response:** Success or error message.

#### PATCH /requestDelete/:id
* **Purpose:** Request to delete the tour guide account.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** None
* **Response:** Success or error message.

#### PATCH /update/:id
* **Purpose:** Update the tour guide profile.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** Tour Guide profile update details (body).
* **Response:** Updated profile or error message.

#### GET /profile/:id
* **Purpose:** Retrieve the tour guide profile.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** GET
* **Parameters:** Tour Guide ID (path parameter).
* **Response:** Profile details or error message.

#### POST /create/:id
* **Purpose:** Create a new tour guide profile.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** POST
* **Parameters:** Tour Guide profile details (body).
* **Response:** Newly created tour guide profile or error message.

#### POST /createItinerary
* **Purpose:** Create a new itinerary for the tour guide.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** POST
* **Parameters:** Itinerary details (body).
* **Response:** Created itinerary or error message.

#### GET /getItineraries
* **Purpose:** Retrieve all itineraries.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of itineraries or error message.

#### PATCH /updateItinerary/:id
* **Purpose:** Update the details of an itinerary.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** Itinerary ID (path parameter) and updated itinerary details (body).
* **Response:** Updated itinerary or error message.

#### DELETE /deleteItinerary/:id
* **Purpose:** Delete an itinerary.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** DELETE
* **Parameters:** Itinerary ID (path parameter).
* **Response:** Success or error message.

#### PATCH /itineraries/activate/:id
* **Purpose:** Activate an itinerary with bookings.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** Itinerary ID (path parameter).
* **Response:** Activated itinerary or error message.

#### PATCH /itineraries/deactivate/:id
* **Purpose:** Deactivate an itinerary with bookings.
* **Authentication:** Required (Tour Guide)
* **HTTP Method:** PATCH
* **Parameters:** Itinerary ID (path parameter).
* **Response:** Deactivated itinerary or error message.

</details>

<details> <summary>Tourism Governor APIs</summary>

#### PATCH /change-password/:id/:modelName
* **Purpose:** Change the password for the tourism governor account.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `id` (path parameter): Tourism Governor's ID.
  - `modelName` (path parameter): Model name for password change.
* **Response:** Success or error message.

#### POST /newMuseum
* **Purpose:** Create a new museum.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** POST
* **Parameters:** Museum details (body).
* **Response:** Created museum or error message.

#### GET /showMuseum
* **Purpose:** Retrieve all museums.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of museums or error message.

#### PATCH /updateMuseum/:id
* **Purpose:** Update the details of a museum.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** PATCH
* **Parameters:** Museum ID (path parameter) and updated museum details (body).
* **Response:** Updated museum or error message.

#### DELETE /deleteMuseum/:id
* **Purpose:** Delete a museum.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** DELETE
* **Parameters:** Museum ID (path parameter).
* **Response:** Success or error message.

#### POST /newHL
* **Purpose:** Create a new historical location.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** POST
* **Parameters:** Historical location details (body).
* **Response:** Created historical location or error message.

#### GET /showHL
* **Purpose:** Retrieve all historical locations.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of historical locations or error message.

#### PATCH /updateHL/:id
* **Purpose:** Update the details of a historical location.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** PATCH
* **Parameters:** Historical location ID (path parameter) and updated details (body).
* **Response:** Updated historical location or error message.

#### DELETE /deleteHL/:id
* **Purpose:** Delete a historical location.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** DELETE
* **Parameters:** Historical location ID (path parameter).
* **Response:** Success or error message.

#### POST /newTag
* **Purpose:** Create a new tag for categorizing locations.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** POST
* **Parameters:** Tag details (body).
* **Response:** Created tag or error message.

#### GET /tags
* **Purpose:** Retrieve all tags.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of tags or error message.

#### GET /showAll
* **Purpose:** Retrieve all museums and historical places managed by the tourism governor.
* **Authentication:** Required (Tourism Governor)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of museums and historical places or error message.

</details>

<details> <summary>Tourist APIs</summary>

#### GET /mytransports/:touristId
* **Purpose:** Retrieve the transport bookings for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
* **Response:** List of transport bookings or error message.

#### GET /myactivities/:tourist
* **Purpose:** Retrieve the activity and itinerary bookings for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `tourist` (path parameter): Tourist's ID.
* **Response:** List of activity and itinerary bookings or error message.

#### POST /newTransportBooking
* **Purpose:** Create a new transport booking.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** Transport booking details (body).
* **Response:** Created transport booking or error message.

#### GET /showTransportBooking
* **Purpose:** Retrieve all transport bookings for a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of transport bookings or error message.

#### DELETE /deleteTransportBooking/:id
* **Purpose:** Delete a transport booking by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** DELETE
* **Parameters:** 
  - `id` (path parameter): Transport booking ID.
* **Response:** Success or error message.

#### PATCH /selectPrefrences/:id
* **Purpose:** Update preferences for a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `id` (path parameter): Tourist's ID.
  - Tourist preferences (body).
* **Response:** Updated preferences or error message.

#### GET /myPrefrences/:id
* **Purpose:** Retrieve the preferences for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Tourist's ID.
* **Response:** Tourist preferences or error message.

#### POST /api/tourist/shareViaEmail
* **Purpose:** Share tourist information via email.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** Email and tourist details (body).
* **Response:** Success or error message.

#### GET /activities/category/:categoryId
* **Purpose:** Retrieve activities by category.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `categoryId` (path parameter): Activity category ID.
* **Response:** List of activities in the specified category.

#### GET /categories
* **Purpose:** Retrieve all activity categories.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of activity categories.

#### PATCH /change-password/:id/:modelName
* **Purpose:** Change password for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `id` (path parameter): Tourist's ID.
  - `modelName` (path parameter): Model name.
* **Response:** Success or error message.

#### GET /Products
* **Purpose:** Retrieve all products.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of products.

#### GET /filterProducts
* **Purpose:** Filter products based on criteria.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** Filter criteria (query parameters).
* **Response:** Filtered list of products.

#### GET /sortByRate
* **Purpose:** Sort products by rating.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** Sorted list of products by rating.

#### GET /searchProductName
* **Purpose:** Search for products by name.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `productName` (query parameter): Product name.
* **Response:** List of products matching the search query.

#### GET /getSingleProduct/:id
* **Purpose:** Retrieve a single product by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Product ID.
* **Response:** Single product details or error message.

#### GET /activities/booked/:touristId
* **Purpose:** Retrieve all booked activities for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
* **Response:** List of booked activities.

#### PATCH /update/:id
* **Purpose:** Update tourist's personal information.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `id` (path parameter): Tourist's ID.
  - Updated info (body).
* **Response:** Updated tourist information or error message.

#### GET /profile/:id
* **Purpose:** Retrieve a tourist's profile by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Tourist's ID.
* **Response:** Tourist profile or error message.

#### PATCH /requestDelete/:id
* **Purpose:** Request account deletion for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `id` (path parameter): Tourist's ID.
* **Response:** Success or error message.

#### POST /searchHistoricalPlaceByName
* **Purpose:** Search for historical places by name.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `name` (body): Historical place name.
* **Response:** List of historical places matching the name.

#### POST /searchHistoricalPlaceByTag
* **Purpose:** Search for historical places by tag.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `tag` (body): Tag to search.
* **Response:** List of historical places matching the tag.

#### POST /searchHistoricalPlaceByCategory
* **Purpose:** Search for historical places by category.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `category` (body): Historical place category.
* **Response:** List of historical places in the specified category.

#### POST /getTagIdByName
* **Purpose:** Get the tag ID by name.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `tagName` (body): Tag name.
* **Response:** Tag ID or error message.

#### POST /searchMuseumByTag
* **Purpose:** Search for museums by tag.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `tag` (body): Museum tag.
* **Response:** List of museums matching the tag.

#### POST /searchMuseumByName
* **Purpose:** Search for museums by name.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `name` (body): Museum name.
* **Response:** List of museums matching the name.

#### POST /searchMuseumByCategory
* **Purpose:** Search for museums by category.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `category` (body): Museum category.
* **Response:** List of museums in the specified category.

#### POST /searchActivityByName
* **Purpose:** Search for activities by name.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `name` (body): Activity name.
* **Response:** List of activities matching the name.

#### POST /searchActivityByCategory
* **Purpose:** Search for activities by category.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `category` (body): Activity category.
* **Response:** List of activities in the specified category.

#### POST /searchActivityByTag
* **Purpose:** Search for activities by tag.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `tag` (body): Activity tag.
* **Response:** List of activities matching the tag.

#### POST /searchActivityByRating
* **Purpose:** Search for activities by rating.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `rating` (body): Rating threshold.
* **Response:** List of activities with the specified rating.

#### POST /searchActivityByDate
* **Purpose:** Search for activities by date.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `date` (body): Activity date.
* **Response:** List of activities on the specified date.

#### POST /searchActivityByBudget
* **Purpose:** Search for activities by budget.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `budget` (body): Budget range.
* **Response:** List of activities within the specified budget.

#### POST /searchItineraryByDate
* **Purpose:** Search for itineraries by date.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `date` (body): Itinerary date.
* **Response:** List of itineraries on the specified date.

#### POST /searchItineraryByBudget
* **Purpose:** Search for itineraries by budget.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `budget` (body): Budget range.
* **Response:** List of itineraries within the specified budget.

#### POST /searchItineraryByLanguage
* **Purpose:** Search for itineraries by language.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `language` (body): Itinerary language.
* **Response:** List of itineraries in the specified language.

#### POST /searchItineraryByName
* **Purpose:** Search for itineraries by name.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `name` (body): Itinerary name.
* **Response:** List of itineraries matching the name.

#### POST /searchItineraryByTag
* **Purpose:** Search for itineraries by tag.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `tag` (body): Itinerary tag.
* **Response:** List of itineraries matching the tag.

#### POST /feedback
* **Purpose:** Provide feedback or ratings for activities.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Feedback details (body).
* **Response:** Success or error message.

#### POST /addSales
* **Purpose:** Add sales record for activities.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Sales data (body).
* **Response:** Success or error message.

#### GET /getComplaints/:id
* **Purpose:** Retrieve complaints for a tourist by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Tourist ID.
* **Response:** List of complaints or error message.

#### GET /getUpcomingActivities
* **Purpose:** Retrieve upcoming activities for a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of upcoming activities.

#### GET /sortActivityByPrice
* **Purpose:** Sort activities by price.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** Sorted list of activities by price.

#### GET /sortActivityByRating
* **Purpose:** Sort activities by rating.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** Sorted list of activities by rating.

#### GET /getUpcomingItineraries
* **Purpose:** Retrieve upcoming itineraries for a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of upcoming itineraries.

#### GET /sortItineraryByPrice
* **Purpose:** Sort itineraries by price.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** Sorted list of itineraries by price.

#### GET /sortItineraryByRating
* **Purpose:** Sort itineraries by rating.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** Sorted list of itineraries by rating.

#### GET /getMuseums
* **Purpose:** Retrieve all museums for a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of museums.

#### GET /filterMuseumsByTag/:id
* **Purpose:** Filter museums by tag.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Tag ID.
* **Response:** List of museums matching the tag.

#### GET /getHistoricalLocations
* **Purpose:** Retrieve historical locations for a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of historical locations.

#### GET /filterHistoricalLocationsByTag/:id
* **Purpose:** Filter historical locations by tag.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Tag ID.
* **Response:** List of historical locations matching the tag.

#### PUT /rating
* **Purpose:** Rate an activity.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PUT
* **Parameters:** 
  - Rating details (body).
* **Response:** Success or error message.

#### GET /get_rating/:_id/:activityId
* **Purpose:** Retrieve a user's rating for an activity.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `_id` (path parameter): User ID.
  - `activityId` (path parameter): Activity ID.
* **Response:** Rating details or error message.

#### POST /bookflight
* **Purpose:** Create a flight booking.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** Flight details (body).
* **Response:** Flight booking confirmation.

#### POST /comment
* **Purpose:** Add a comment to an activity.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `activityId` (body): Activity ID.
  - Comment text (body).
* **Response:** Success or error message.

#### POST /commentcheck/:touristId/:commentId
* **Purpose:** Check if a comment was made by a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
  - `commentId` (path parameter): Comment ID.
* **Response:** Confirmation if the tourist made the comment.

#### DELETE /del_comment
* **Purpose:** Delete a comment from an activity.
* **Authentication:** Required (Tourist)
* **HTTP Method:** DELETE
* **Parameters:** 
  - `commentId` (body): Comment ID.
* **Response:** Success or error message.

#### POST /book_activity_Itinerary
* **Purpose:** Book an activity as part of an itinerary.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Activity and itinerary details (body).
* **Response:** Success or error message.

#### DELETE /cancel_booking
* **Purpose:** Cancel an activity or itinerary booking.
* **Authentication:** Required (Tourist)
* **HTTP Method:** DELETE
* **Parameters:** 
  - `bookingId` (body): Booking ID.
* **Response:** Success or error message.

#### POST /bookhotel
* **Purpose:** Create a hotel booking.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** Hotel booking details (body).
* **Response:** Hotel booking confirmation.

#### POST /addComplaint/:userId
* **Purpose:** Add a complaint for a specific user.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - `userId` (path parameter): User's ID.
  - Complaint details (body).
* **Response:** Success or error message.

#### PATCH /updatePointsToWallet/:touristId
* **Purpose:** Update points in a tourist's wallet.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
  - Points to update (body).
* **Response:** Updated wallet points.

#### PATCH /payForItinerary/:touristId
* **Purpose:** Pay for an itinerary.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
  - Payment details (body).
* **Response:** Payment confirmation.

#### PATCH /payForActivity/:touristId
* **Purpose:** Pay for an activity.
* **Authentication:** Required (Tourist)
* **HTTP Method:** PATCH
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
  - Payment details (body).
* **Response:** Payment confirmation.

#### GET /tagName/:id
* **Purpose:** Retrieve a tag name by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Tag ID.
* **Response:** Tag name.

#### GET /categoryName/:id
* **Purpose:** Retrieve a category name by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `id` (path parameter): Category ID.
* **Response:** Category name.

#### POST /addRating
* **Purpose:** Add a rating for an activity.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Rating details (body).
* **Response:** Success or error message.

#### POST /addComment
* **Purpose:** Add a comment for an activity.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Comment details (body).
* **Response:** Success or error message.

#### POST /addItineraryRating
* **Purpose:** Add a rating for an itinerary.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Itinerary rating details (body).
* **Response:** Success or error message.

#### POST /addItineraryComment
* **Purpose:** Add a comment for an itinerary.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Itinerary comment details (body).
* **Response:** Success or error message.

#### POST /follow
* **Purpose:** Follow an itinerary.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Itinerary details (body).
* **Response:** Success or error message.

#### POST /unfollow
* **Purpose:** Unfollow an itinerary.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Itinerary details (body).
* **Response:** Success or error message.

#### POST /compeleteWithTourGuide
* **Purpose:** Complete an activity with a tour guide.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Tour guide details (body).
* **Response:** Success or error message.

#### GET /completed/:touristId
* **Purpose:** Retrieve completed tour guides for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
* **Response:** List of completed tour guides.

#### GET /followed/:touristId
* **Purpose:** Retrieve followed itineraries for a specific tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
* **Response:** List of followed itineraries.

#### GET /getAllTourGuideProfiles
* **Purpose:** Retrieve all tour guide profiles.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** None
* **Response:** List of tour guide profiles.

#### POST /getItinerariesByTourGuide
* **Purpose:** Retrieve itineraries by a specific tour guide.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Tour guide ID (body).
* **Response:** List of itineraries by the tour guide.

#### POST /getSingleItinerary
* **Purpose:** Retrieve a single itinerary.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Itinerary ID (body).
* **Response:** Itinerary details.

#### POST /getTouristUsername
* **Purpose:** Retrieve the username of a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** POST
* **Parameters:** 
  - Tourist ID (body).
* **Response:** Tourist username.

#### GET /:touristId
* **Purpose:** Fetch tourist data by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
* **Response:** Tourist data.

#### GET /activity/:activityId
* **Purpose:** Fetch activity details by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `activityId` (path parameter): Activity ID.
* **Response:** Activity details.

#### GET /itinerary/:itineraryId
* **Purpose:** Fetch itinerary details by ID.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `itineraryId` (path parameter): Itinerary ID.
* **Response:** Itinerary details.

#### GET /activities/booked/:touristId
* **Purpose:** Fetch booked activities for a tourist.
* **Authentication:** Required (Tourist)
* **HTTP Method:** GET
* **Parameters:** 
  - `touristId` (path parameter): Tourist's ID.
* **Response:** List of booked activities.

</details>

## Testing with Postman
Before testing the API using Postman, make sure **Postman Installed**. Download and install [Postman](https://www.postman.com/downloads/).

Use these test cases to test your code using Postman:



#### **Create Tourist (POST)**

- *Endpoint*: `http://localhost:8000/registerTourist/`

- *Body Request*:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "Nationality": "Egypt",
  "dob": "1990-01-01",
  "job": "employee",
  "mobile": "1234567890"
}
```
- *Expected Response*:
```json
{
  "_id": "some_generated_id",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "Nationality": "Egypt",
  "dob": "1990-01-01",
  "job": "employee",
  "mobile": "1234567890"
}
```

#### **get complaints (GET)**

- *Endpoint*: `http://localhost:8000/getComplaints`

- *Body Request*:

```json
{}  // No request body for GET request
```
- *Expected Response*:
```json
[
  {
    "_id": "user_id",
    "title": "complaint title",
    "body": "this is the body that describes the complaint",
    "date": "2024-11-11",
    "status":"resolved"
  }
] //or empty list []
```

#### **get products (GET)**

- *Endpoint*: `http://localhost:8000/Products/${sellerId}`

- *Body Request*:

```json
{}  // No request body for GET request
```
- *Expected Response*:
```json
[
  {
    "name": "user_id",
    "description": "description_of_product",
    "createdAt": "2024-05-05",
    "price": "1200",
    "quantityAvailable":"some_number",
    "seller":"seller_id",
    "reviews":"array_of_reviews",
    "archieved":"true/false",
    "Tourists":"list_of_tourists",
    "ratings":"some_number",
    "picture":"some_picture",
  }
] //or empty list []
```

## How to use?

### As a Tourist

1. **Access the Application**: Launch your web browser and enter the provided URL to reach the registration page.

2. **Registration**: Select "Tourist Signup" to initiate the registration process. Complete the form with the necessary details and click "Submit".

3. **Dashboard Navigation**: Post-registration, you'll be redirected to the dashboard. The top bar serves as your primary navigation tool.

4. **Finding Bookings**: Click on "Book" to browse and search for Bookings.

5. **Viewing Trips**: Select "Trips" from the top bar to view Activities and Iteneraries.

6. **Places**: Use the "Places" option to view places of interest in different countries.

7. **Products**: Go to "Products" to shop in our exclusive gift shop.


### As a Admin

1. **Access the Application**: Launch your web browser and enter the provided URL to reach the registration page.

2. **Registration**: Select "Admin Signup" to initiate the registration process. Complete the form with the necessary details and click "Submit".

3. **Dashboard Navigation**: Post-registration, you'll be redirected to the dashboard. The top bar serves as your primary navigation tool.

4. **Finding Bookings**: Click on "Book" to browse and search for Bookings.

5. **Viewing Trips**: Select "Trips" from the top bar to review Trips issued.

6. **Places**: Use the "Places" option to view places of interest in different countries.

7. **Products**: Go to "Products" to shop in our exclusive gift shop.


### As a Advertiser

1. **Access the Application**: Launch your web browser and enter the provided URL to reach the registration page.

2. **Registration**: Select "Advertiser Signup" to initiate the registration process. Complete the form with the necessary details and click "Submit".

3. **Dashboard Navigation**: Post-registration, you'll be redirected to the dashboard. The top bar serves as your primary navigation tool.

4. **Finding Bookings**: Click on "Book" to browse and search for Bookings.

5. **Viewing Trips**: Select "Trips" from the top bar to review Trips issued.

6. **Places**: Use the "Places" option to view places of interest in different countries.

7. **Products**: Go to "Products" to shop in our exclusive gift shop.


### As a Seller

1. **Access the Application**: Launch your web browser and enter the provided URL to reach the registration page.

2. **Registration**: Select "Seller Signup" to initiate the registration process. Complete the form with the necessary details and click "Submit".

3. **Dashboard Navigation**: Post-registration, you'll be redirected to the dashboard. The top bar serves as your primary navigation tool.

4. **Finding Bookings**: Click on "Book" to browse and search for Bookings.

5. **Viewing Trips**: Select "Trips" from the top bar to review Trips issued.

6. **Places**: Use the "Places" option to view places of interest in different countries.

7. **Products**: Go to "Products" to shop in our exclusive gift shop.


### As a Tourguide

1. **Access the Application**: Launch your web browser and enter the provided URL to reach the registration page.

2. **Registration**: Select "Tourguide Signup" to initiate the registration process. Complete the form with the necessary details and click "Submit".

3. **Dashboard Navigation**: Post-registration, you'll be redirected to the dashboard. The top bar serves as your primary navigation tool.

4. **Finding Bookings**: Click on "Book" to browse and search for Bookings.

5. **Viewing Trips**: Select "Trips" from the top bar to review Trips issued.

6. **Places**: Use the "Places" option to view places of interest in different countries.

7. **Products**: Go to "Products" to shop in our exclusive gift shop.


### As a Tourism Governor

1. **Access the Application**: Launch your web browser and enter the provided URL to reach the registration page.

2. **Registration**: Select "Tourism Governor Signup" to initiate the registration process. Complete the form with the necessary details and click "Submit".

3. **Dashboard Navigation**: Post-registration, you'll be redirected to the dashboard. The top bar serves as your primary navigation tool.

4. **Finding Bookings**: Click on "Book" to browse and search for Bookings.

5. **Viewing Trips**: Select "Trips" from the top bar to review Trips issued.

6. **Places**: Use the "Places" option to view places of interest in different countries.

7. **Products**: Go to "Products" to shop in our exclusive gift shop.


## Contribute

We welcome contributions from everyone. Here's how you can contribute:

1. **Fork the Repository**: Start by forking the repository to your own GitHub account.

2. **Clone the Repository**: Clone the forked repository to your local machine.

3. **Create a New Branch**: Always create a new branch for each feature or bug fix you are working on. Never work directly on the `main` branch.

4. **Make Your Changes**: Make your changes or additions in your branch. Be sure to follow the existing code style.

5. **Commit Your Changes**: Commit your changes with a clear and concise commit message.

6. **Push to GitHub**: Push your changes to your fork on GitHub.

7. **Submit a Pull Request**: From your fork, submit a pull request to the `main` branch of the original repository. Describe your changes in the pull request. Link any related issues or pull requests.


## Credits  

This project was made possible with the help of the following resources and contributions:  

1. **[MERN Stack Crash Course Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)**  
   The tutorial playlist on YouTube provided a comprehensive guide to effectively implementing the MERN Stack in this project.  

2. **Contributors**  
   A heartfelt thanks to all contributors for their invaluable suggestions, bug reports, and code contributions, which significantly enhanced the quality and functionality of this project.  


## License

This project is licensed under the terms of the [MIT License](LICENSE).

By using this project, you agree to abide by the terms outlined in the license. For more information, refer to the [LICENSE](LICENSE) file in the repository.
