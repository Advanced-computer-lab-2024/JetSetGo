import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000'; // Replace with your actual API URL

const tourGuide_ID = '67002c827e9690cf35059882';

const ItineraryManager = () => {
  const [itineraryData, setItineraryData] = useState({
    title: '',
    description: '',
    tourGuide: tourGuide_ID,
    activities: { name: [], duration: [] },
    locations: [],
    timeline: [],
    tags: [], // This will hold the selected tag IDs
    language: '',
    price: '',
    availableDates: [{ date: '', times: [] }],
    accessibility: '',
    pickupLocation: '',
    dropoffLocation: '',
    rating: 0, // Added rating field
    isBooked: false, // Added isBooked field
  });

  const [itineraries, setItineraries] = useState([]);
  const [tags, setTags] = useState([]); // Store fetched tags from backend
  const [editMode, setEditMode] = useState(false);
  const [currentItineraryId, setCurrentItineraryId] = useState(null);
  const [error, setError] = useState(null); // State for handling errors

  // Fetch tags from the backend
  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/admin/tag'); // Fetch tags
      setTags(response.data); // Set fetched tags
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  // Fetch all itineraries
  const fetchItineraries = async () => {
    try {
      const response = await axios.get('/api/tour-guides/getItineraries');
      setItineraries(response.data);
      setError(null); // Clear error state on success
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      setError('Error fetching itineraries');
    }
  };

  useEffect(() => {
    fetchItineraries(); // Fetch itineraries on component mount
    fetchTags(); // Fetch tags when component mounts
  }, []);

  // Handle input changes for basic fields
  const handleChange = (e) => {
    setItineraryData({
      ...itineraryData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle dynamic input changes for nested arrays
  const handleActivityChange = (index, type, value) => {
    const updatedActivities = { ...itineraryData.activities };
    updatedActivities[type][index] = value;
    setItineraryData({
      ...itineraryData,
      activities: updatedActivities,
    });
  };

  // Handle changes for arrays like locations, timeline, availableDates
  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...itineraryData[field]];
    updatedArray[index] = value;
    setItineraryData({
      ...itineraryData,
      [field]: updatedArray,
    });
  };

  // Handle changes for availableDates
  const handleDateChange = (index, value) => {
    const updatedDates = [...itineraryData.availableDates];
    updatedDates[index].date = value;
    setItineraryData({
      ...itineraryData,
      availableDates: updatedDates,
    });
  };

  const handleTimeChange = (dateIndex, timeIndex, value) => {
    const updatedDates = [...itineraryData.availableDates];
    updatedDates[dateIndex].times[timeIndex] = value;
    setItineraryData({
      ...itineraryData,
      availableDates: updatedDates,
    });
  };

  // Submit the form to create or update an itinerary
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(`/api/tour-guides/updateItinerary/${currentItineraryId}`, itineraryData);
        alert('Itinerary updated successfully!');
        setEditMode(false);
        setCurrentItineraryId(null);
      } else {
        await axios.post('/api/tour-guides/createItinerary', itineraryData);
        alert('Itinerary created successfully!');
      }
      fetchItineraries();
      resetForm();
      setError(null); // Clear error state on success
    } catch (error) {
      console.error('Error submitting itinerary:', error);
      setError('Error submitting itinerary'); // Display error
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tour-guides/deleteItinerary/${id}`);
      alert('Itinerary deleted successfully!');
      fetchItineraries();
      setError(null); // Clear error state on success
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      setError('Error deleting itinerary because it is booked'); // Display error
    }
  };

  // Handle edit operation (fill the form with existing data)
  const handleEdit = (itinerary) => {
    // Format date to YYYY-MM-DD for display
    const formattedDates = itinerary.availableDates.map((dateItem) => ({
      ...dateItem,
      date: new Date(dateItem.date).toISOString().split('T')[0], // Format date for input field
    }));

    setItineraryData({ ...itinerary, availableDates: formattedDates });
    setEditMode(true);
    setCurrentItineraryId(itinerary._id);
  };

  // Reset form after submission
  const resetForm = () => {
    setItineraryData({
      title: '',
      description: '',
      tourGuide: tourGuide_ID,
      activities: { name: [], duration: [] },
      locations: [],
      timeline: [],
      tags: [], // Reset tags
      language: '',
      price: '',
      availableDates: [{ date: '', times: [] }],
      accessibility: '',
      pickupLocation: '',
      dropoffLocation: '',
      rating: 0, // Reset rating
      isBooked: false, // Reset isBooked
    });
  };

  return (
    <div>
      <h1>Itinerary Manager</h1>

      {/* Display errors */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form for creating/updating an itinerary */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={itineraryData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={itineraryData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={itineraryData.language}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={itineraryData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={itineraryData.pickupLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Dropoff Location"
          value={itineraryData.dropoffLocation}
          onChange={handleChange}
          required
        />

        {/* Accessibility Options */}
        <select name="accessibility" value={itineraryData.accessibility} onChange={handleChange} required>
          <option value="">Select Accessibility</option>
          <option value="wheelchair accessible">Wheelchair Accessible</option>
          <option value="not accessible">Not Accessible</option>
          <option value="limited accessibility">Limited Accessibility</option>
        </select>

        {/* Rating */}
        <div>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={itineraryData.rating}
              onChange={handleChange}
              min="0"
              max="5"
            />
          </label>
        </div>

        {/* Is Booked */}
        <div>
          <label>
            <input
              type="checkbox"
              name="isBooked"
              checked={itineraryData.isBooked}
              onChange={(e) => setItineraryData({ ...itineraryData, isBooked: e.target.checked })}
            />
            Is Booked
          </label>
        </div>

        {/* Add activities */}
        <div>
          <h3>Activities</h3>
          {itineraryData.activities.name.map((_, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Activity Name"
                value={itineraryData.activities.name[index] || ''}
                onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration"
                value={itineraryData.activities.duration[index] || ''}
                onChange={(e) => handleActivityChange(index, 'duration', e.target.value)}
              />
              <button type="button" onClick={() => {
                const updatedActivities = itineraryData.activities;
                updatedActivities.name.splice(index, 1);
                updatedActivities.duration.splice(index, 1);
                setItineraryData({ ...itineraryData, activities: updatedActivities });
              }}>Remove Activity</button>
            </div>
          ))}
          <button type="button" onClick={() => setItineraryData({
            ...itineraryData,
            activities: { name: [...itineraryData.activities.name, ''], duration: [...itineraryData.activities.duration, ''] }
          })}>Add Activity</button>
        </div>

        {/* Add locations */}
        <div>
          <h3>Locations</h3>
          {itineraryData.locations.map((location, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Location"
                value={location || ''}
                onChange={(e) => handleArrayChange(index, 'locations', e.target.value)}
              />
              <button type="button" onClick={() => {
                const updatedLocations = [...itineraryData.locations];
                updatedLocations.splice(index, 1);
                setItineraryData({ ...itineraryData, locations: updatedLocations });
              }}>Remove Location</button>
            </div>
          ))}
          <button type="button" onClick={() => setItineraryData({
            ...itineraryData,
            locations: [...itineraryData.locations, '']
          })}>Add Location</button>
        </div>

        {/* Add timeline */}
        <div>
          <h3>Timeline</h3>
          {itineraryData.timeline.map((time, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Timeline"
                value={time || ''}
                onChange={(e) => handleArrayChange(index, 'timeline', e.target.value)}
              />
              <button type="button" onClick={() => {
                const updatedTimeline = [...itineraryData.timeline];
                updatedTimeline.splice(index, 1);
                setItineraryData({ ...itineraryData, timeline: updatedTimeline });
              }}>Remove Timeline</button>
            </div>
          ))}
          <button type="button" onClick={() => setItineraryData({
            ...itineraryData,
            timeline: [...itineraryData.timeline, '']
          })}>Add Timeline</button>
        </div>

        {/* Tags as toggle buttons */}
        <div>
          <h3>Tags</h3>
          {tags.map((tag) => (
            <button
              key={tag._id}
              type="button"
              onClick={() => {
                const updatedTags = itineraryData.tags.includes(tag._id)
                  ? itineraryData.tags.filter(t => t !== tag._id) // Remove tag ID if already selected
                  : [...itineraryData.tags, tag._id]; // Add tag ID if not selected
                setItineraryData({ ...itineraryData, tags: updatedTags });
              }}
              style={{
                backgroundColor: itineraryData.tags.includes(tag._id) ? 'blue' : 'lightgray',
                color: itineraryData.tags.includes(tag._id) ? 'white' : 'black',
                margin: '5px',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {tag.tag_name}
            </button>
          ))}
        </div>

        {/* Add available dates */}
        <div>
          <h3>Available Dates</h3>
          {itineraryData.availableDates.map((dateItem, dateIndex) => (
            <div key={dateIndex}>
              <input
                type="date"
                value={dateItem.date || ''}
                onChange={(e) => handleDateChange(dateIndex, e.target.value)}
              />
              {dateItem.times.map((time, timeIndex) => (
                <input
                  type="time"
                  key={timeIndex}
                  value={time || ''}
                  onChange={(e) => handleTimeChange(dateIndex, timeIndex, e.target.value)}
                />
              ))}
              <button type="button" onClick={() => handleTimeChange(dateIndex, dateItem.times.length, '')}>Add Time</button>
              <button type="button" onClick={() => {
                const updatedDates = itineraryData.availableDates;
                updatedDates.splice(dateIndex, 1);
                setItineraryData({ ...itineraryData, availableDates: updatedDates });
              }}>Remove Date</button>
            </div>
          ))}
          <button type="button" onClick={() => setItineraryData({
            ...itineraryData,
            availableDates: [...itineraryData.availableDates, { date: '', times: [] }]
          })}>Add Date</button>
        </div>

        <button type="submit">{editMode ? 'Update Itinerary' : 'Create Itinerary'}</button>
      </form>

      {/* Displaying fetched itineraries */}
      <h2>Itineraries</h2>
      <ul>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id}>
            <h3>{itinerary.title}</h3>
            <p>{itinerary.description}</p>
            <p>Rating: {itinerary.rating}</p>
            <p>Booked: {itinerary.isBooked ? 'Yes' : 'No'}</p>
            <button onClick={() => handleEdit(itinerary)}>Edit</button>
            <button onClick={() => handleDelete(itinerary._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryManager;
