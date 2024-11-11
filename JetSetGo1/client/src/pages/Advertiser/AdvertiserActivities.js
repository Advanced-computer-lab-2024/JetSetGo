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

    </div>
  </div>
);


export default function AdvertiserActivities() {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/advertisers`);
      setActivities(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to load activities. Please try again later.');
    }
  };

  
  return (
    <>


      <div className="container mx-auto p-4" style={{ maxHeight: '550px', overflowX: 'auto' }}>
        <h2 className="text-2xl font-bold mb-4">Activity List</h2>
        {activities.map((activity) => (
          <ActivityItem
            key={activity._id}
            activity={activity}
          />
        ))}
      </div>
    </>
  );
}
