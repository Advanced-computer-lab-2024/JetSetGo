'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

const API_BASE_URL = 'http://localhost:8000/api';

const ActivityForm = ({ addMode, onSubmit, initialData }) => {
  const [activity, setActivity] = useState({...initialData});
  const params= useParams()

console.log(activity)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivity(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(activity)
    onSubmit({
      ...activity,
      _id: initialData? initialData._id : undefined,
      tags: activity.tags?.split(',').map(tag => tag.trim()),
      price: parseFloat(activity.price),
      latitude: parseFloat(activity.latitude),
      longitude: parseFloat(activity.longitude),
      advertiser: params.id
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl mb-6">Activities</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="title"
          value={activity.title}
          onChange={handleChange}
          placeholder="title"
          required={addMode}
          className="w-full p-2 border rounded"
        />
          <input
            type="date"
            name="date"
            value={activity.date}
            onChange={handleChange}
            required={addMode}
            className="flex-1 p-2 border rounded"
          />
          <input
            type="time"
            name="time"
            value={activity.time}
            onChange={handleChange}
            required={addMode}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <input
          type="text"
          name="location"
          value={activity.location}
          onChange={handleChange}
          placeholder="Location"
          required={addMode}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="latitude"
          value={activity.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          required={addMode}
          className="w-full p-2 border rounded"
          step="any"
        />
        <input
          type="number"
          name="longitude"
          value={activity.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          required={addMode}
          className="w-full p-2 border rounded"
          step="any"
        />
        <input
          type="number"
          name="price"
          value={activity.price}
          onChange={handleChange}
          placeholder="Price"
          required={addMode}
          className="w-full p-2 border rounded"
          step="any"
        />
        <input
          type="text"
          name="category"
          value={activity.category}
          onChange={handleChange}
          placeholder="Category"
          required={addMode}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="tags"
          value={activity.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="specialDiscounts"
          value={activity.specialDiscounts}
          onChange={handleChange}
          placeholder="Special Discounts"
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="bookingOpen"
            checked={activity.bookingOpen}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="bookingOpen">Booking Open</label>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {initialData ? 'Update Activity' : 'Add Activity'}
        </button>
      </form>
    </div>
  );
};

const ActivityItem = ({ activity, onEdit, onDelete }) => (
  <div className="border p-4 mb-4 rounded bg-white">
    <h3 className="font-bold">{activity.category}</h3>
    <p>Date: {activity.date}</p>
    <p>Time: {activity.time}</p>
    <p>Location: {activity.location}</p>
    <p>Price: ${activity.price}</p>
    <p>Tags: {Array.isArray(activity.tags) ? activity.tags.join(', ') : activity.tags}</p>
    <p>Special Discounts: {activity.specialDiscounts}</p>
    <p>Booking: {activity.bookingOpen ? 'Open' : 'Closed'}</p>
    <div className="mt-2">
      <button onClick={() => onEdit(activity)} className="mr-2 p-1 bg-yellow-500 text-white rounded">Edit</button>
      <button onClick={() => onDelete(activity._id)} className="p-1 bg-red-500 text-white rounded">Delete</button>
    </div>
  </div>
);

const MapComponent = ({ activities }) => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={2}
      >
        {activities.map((activity) => (
          <Marker
            key={activity._id}
            position={{ 
              lat: parseFloat(activity.latitude) || 0, 
              lng: parseFloat(activity.longitude) || 0 
            }}
            title={activity.category}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default function ActivityPageJohn() {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [error, setError] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetchActivities(id);
  }, []);

  const fetchActivities = async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/advertisers/showAll`, { id });
      setActivities(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to load activities. Please try again later.');
    }
  };

  const handleAddActivity = async (newActivity) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/advertisers/create`, newActivity);
      setActivities((prev) => [...prev, response.data]);
      setError(null);
    } catch (error) {
      console.error('Error adding activity:', error);
      setError('Failed to add activity. Please try again.');
    }
  };

  const handleEditActivity = async (activity) => {
    try {
      console.log(activity)
      const response = await axios.patch(`${API_BASE_URL}/advertisers/updateActivity/${activity._id}`, activity);
      setActivities((prev) => 
        prev.map((a) => (a._id === response.data._id ? response.data : a))
      );
      setEditingActivity(null);
      setError(null);
    } catch (error) {
      console.error('Error updating activity:', error);
      setError('Failed to update activity. Please try again.');
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/advertisers/deleteAct/delete/${id}`);
      setActivities((prev) => prev.filter((activity) => activity._id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting activity:', error);
      setError('Failed to delete activity. Please try again.');
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <ActivityForm
          addMode={editingActivity ?  false:true}
          onSubmit={editingActivity ? handleEditActivity : handleAddActivity}
          initialData={editingActivity}
        />
      </div>
      
      {error && (
        <div className="container mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl mb-4">Activity Map</h2>
          <MapComponent activities={activities} />
        </div>
      </div>

      <div className="container mx-auto p-4" style={{ maxHeight: '550px', overflowX: 'auto' }}>
        <h2 className="text-2xl font-bold mb-4">Activity List</h2>
        {activities.map((activity) => (
          <ActivityItem
            key={activity._id}
            activity={activity}
            onEdit={setEditingActivity}
            onDelete={handleDeleteActivity}
          />
        ))}
      </div>
    </>
  );
}
