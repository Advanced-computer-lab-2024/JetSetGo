'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SellerProfile() {
  const params = useParams()
  const userId = params.userId // Ensure we're accessing the correct parameter name
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  })
   
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5300'

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/sellers/profile/${userId}`)
        const data = response.data
        if (!data.accepted) {
          setError('Seller profile creation not allowed: User not accepted.')
          return
        }
        setFormValues({
          name: data.name || '',
          description: data.description || '',
        })
        setIsEditing(false)
      } catch (err) {
        console.error('Error fetching user data:', err)
        if (err.response) {
          setError(err.response.data.error || 'Failed to fetch')
        } else if (err.request) {
          setError('Network error occurred')
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId])

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await axios.patch(`/api/sellers/update/${userId}`, formValues)

      setIsEditing(true)
    } catch (err) {
      console.error('Error updating profile:', err)
      if (err.response) {
        setError(err.response.data.error || 'Failed to update profile')
      } else if (err.request) {
        setError('Network error occurred')
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
      setIsEditing(true)
    }
    
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Edit Seller Profile</h2>
        </div>
        <div className="card-content">
          {error && <p className="error-message">Error: {error}</p>}

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                disabled={!isEditing}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                required
                placeholder="Describe yourself"
                disabled={!isEditing}
                className="textarea"
              />
            </div>

            {isEditing ? (
              <button type="submit" disabled={loading} className="button">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="button">
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}