import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './uploadPicture.css'

export default function ImageUpload() {
  const { id, controllerName } = useParams()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    // Create a preview URL for the selected file
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    if (!file) {
      setError('Please select a file to upload')
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/${controllerName}/${id}/upload-profile-image`, // this component is for 3 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setSuccess(true)
      setFile(null)
      // Keep the preview URL after successful upload
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while uploading the image')
    } finally {
      setIsLoading(false)
    }
  }

  const isTourGuide = controllerName === 'tour-guides'

  return (
    <div className="image-upload-container">
      <div className="image-upload-form">
        <h2 className="image-upload-title">Upload Profile Image</h2>
        <p className="image-upload-subtitle">
          {isTourGuide ? "Upload your photo" : "Upload the logo"}
        </p>
        {error && (
          <div className="alert alert-error" role="alert">
            <strong className="alert-title">Error!</strong>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            <strong className="alert-title">Success!</strong>
            <span>Your image has been uploaded successfully.</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="form-group">
          <div>
            <label htmlFor="profileImage" className="form-label">
              Select Image
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          {previewUrl && ( <div className="mt-4 height:300px width:300px;"> <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p> <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto" /> </div> )} 
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>
    </div>
  )
}