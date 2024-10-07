import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItineraryManager.css'; // Add a CSS file for custom styles

axios.defaults.baseURL = 'http://localhost:4000'; // Replace with your actual API URL

const tourGuide_ID = '67002c827e9690cf35059882';

const ItineraryManager = () => {
  const [itineraryData, setItineraryData] = useState({
    title: '',
    description: '',
    tourGuide: tourGuide_ID,
    activities: { name: [], duration: [] },
    locations: [],
    timeline: [], // Timeline added here
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
      timeline: [], // Reset timeline
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
    <div className="itinerary-manager">
      <h1 className="title">Itinerary Manager</h1>

      {/* Display errors */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form for creating/updating an itinerary */}
      <form onSubmit={handleSubmit} className="itinerary-form">
        <input type="text" name="title" placeholder="Title" value={itineraryData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={itineraryData.description} onChange={handleChange} required />
        <input type="text" name="language" placeholder="Language" value={itineraryData.language} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={itineraryData.price} onChange={handleChange} required />
        <input type="text" name="pickupLocation" placeholder="Pickup Location" value={itineraryData.pickupLocation} onChange={handleChange} required />
        <input type="text" name="dropoffLocation" placeholder="Dropoff Location" value={itineraryData.dropoffLocation} onChange={handleChange} required />

        {/* Accessibility Options */}
        <select name="accessibility" value={itineraryData.accessibility} onChange={handleChange} required>
          <option value="">Select Accessibility</option>
          <option value="wheelchair accessible">Wheelchair Accessible</option>
          <option value="not accessible">Not Accessible</option>
          <option value="limited accessibility">Limited Accessibility</option>
        </select>

        {/* Rating */}
        <div className="form-group">
          <label>Rating:</label>
          <input type="number" name="rating" value={itineraryData.rating} onChange={handleChange} min="0" max="5" />
        </div>

        {/* Is Booked */}
        <div className="form-group">
          <label>
            <input type="checkbox" name="isBooked" checked={itineraryData.isBooked} onChange={(e) => setItineraryData({ ...itineraryData, isBooked: e.target.checked })} />
            Is Booked
          </label>
        </div>

        {/* Activities */}
        <h3>Activities</h3>
        {itineraryData.activities.name.map((_, index) => (
          <div key={index} className="activity-item">
            <input type="text" placeholder="Activity Name" value={itineraryData.activities.name[index] || ''} onChange={(e) => handleActivityChange(index, 'name', e.target.value)} />
            <input type="text" placeholder="Duration" value={itineraryData.activities.duration[index] || ''} onChange={(e) => handleActivityChange(index, 'duration', e.target.value)} />
            <button type="button" className="remove-btn" onClick={() => {
              const updatedActivities = itineraryData.activities;
              updatedActivities.name.splice(index, 1);
              updatedActivities.duration.splice(index, 1);
              setItineraryData({ ...itineraryData, activities: updatedActivities });
            }}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => setItineraryData({
          ...itineraryData,
          activities: { name: [...itineraryData.activities.name, ''], duration: [...itineraryData.activities.duration, ''] }
        })}>Add Activity</button>

        {/* Locations */}
        <h3>Locations</h3>
        {itineraryData.locations.map((location, index) => (
          <div key={index} className="location-item">
            <input type="text" placeholder="Location" value={location || ''} onChange={(e) => handleArrayChange(index, 'locations', e.target.value)} />
            <button type="button" className="remove-btn" onClick={() => {
              const updatedLocations = [...itineraryData.locations];
              updatedLocations.splice(index, 1);
              setItineraryData({ ...itineraryData, locations: updatedLocations });
            }}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => setItineraryData({
          ...itineraryData,
          locations: [...itineraryData.locations, '']
        })}>Add Location</button>

        {/* Timeline */}
        <h3>Timeline</h3>
        {itineraryData.timeline.map((time, index) => (
          <div key={index} className="timeline-item">
            <input type="text" placeholder="Timeline Entry" value={time || ''} onChange={(e) => handleArrayChange(index, 'timeline', e.target.value)} />
            <button type="button" className="remove-btn" onClick={() => {
              const updatedTimeline = [...itineraryData.timeline];
              updatedTimeline.splice(index, 1);
              setItineraryData({ ...itineraryData, timeline: updatedTimeline });
            }}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => setItineraryData({
          ...itineraryData,
          timeline: [...itineraryData.timeline, '']
        })}>Add Timeline Entry</button>

        {/* Tags as toggle buttons */}
        <div>
          <h3>Tags</h3>
          <div className="tags-container">
            {tags.map((tag) => (
              <button
                key={tag._id}
                type="button"
                onClick={() => {
                  // Create a copy of the current tags array
                  let updatedTags;
                  // Check if the tag is already selected
                  if (itineraryData.tags.includes(tag._id)) {
                    // Remove the tag if it's already selected
                    updatedTags = itineraryData.tags.filter(t => t !== tag._id);
                  } else {
                    // Add the tag if it's not selected
                    updatedTags = [...itineraryData.tags, tag._id];
                  }
                  // Update the state with the new tags array
                  setItineraryData({ ...itineraryData, tags: updatedTags });
                }}
                className={itineraryData.tags.includes(tag._id) ? 'tag-btn selected' : 'tag-btn'}
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
        </div>

        {/* Add available dates */}
        <div>
          <h3>Available Dates</h3>
          {itineraryData.availableDates.map((dateItem, dateIndex) => (
            <div key={dateIndex}>
              <input type="date" value={dateItem.date || ''} onChange={(e) => handleDateChange(dateIndex, e.target.value)} />
              {dateItem.times.map((time, timeIndex) => (
                <input type="time" key={timeIndex} value={time || ''} onChange={(e) => handleTimeChange(dateIndex, timeIndex, e.target.value)} />
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
      <div className="itinerary-list">
        {itineraries.map((itinerary) => (
          <div key={itinerary._id} className="itinerary-card">
            <h3>{itinerary.title}</h3>
            <p>{itinerary.description}</p>
            <p><strong>Language:</strong> {itinerary.language}</p>
            <p><strong>Price:</strong> ${itinerary.price}</p>
            <p><strong>Pickup Location:</strong> {itinerary.pickupLocation}</p>
            <p><strong>Dropoff Location:</strong> {itinerary.dropoffLocation}</p>
            <p><strong>Rating:</strong> {itinerary.rating}</p>
            <p><strong>Booked:</strong> {itinerary.isBooked ? 'Yes' : 'No'}</p>

            <h4>Activities</h4>
            <ul>
              {itinerary.activities.name.map((activity, index) => (
                <li key={index}>{activity} - {itinerary.activities.duration[index]}</li>
              ))}
            </ul>

            <h4>Locations</h4>
            <ul>
              {itinerary.locations.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>

            <h4>Timeline</h4>
            <ul>
              {itinerary.timeline.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>

            <h4>Tags</h4>
            <ul>
              {itinerary.tags.map(tag => {
                const selectedTag = tags.find(t => t._id === tag);
                return selectedTag ? <li key={tag}>{selectedTag.tag_name}</li> : null;
              })}
            </ul>

            <button className="edit-btn" onClick={() => handleEdit(itinerary)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(itinerary._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryManager;
