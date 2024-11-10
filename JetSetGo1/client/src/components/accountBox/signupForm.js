import React, { useState, useContext } from "react";
import axios from 'axios';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const { switchToSignin } = useContext(AccountContext);
  const options = [
    { value: 'Tourist', label: 'Tourist' },
    { value: 'Advertiser', label: 'Advertiser' },
    { value: 'Seller', label: 'Seller' },
    { value: 'TourGuide', label: 'Tour Guide' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showFields, setShowFields] = useState({
    username: true,
    email: true,
    password: true,
    mobile: true,
    nationality: true,
    dob: true,
    job: true,
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
    nationality: '',
    dob: '',
    job: '',
  });
  const [files, setFiles] = useState({ doc1: null, doc2: null });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (!formData.hasOwnProperty(name)) {
      console.warn(`Invalid input name: ${name}`);
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, docKey) => {
    const selectedFile = e.target.files[0];
    setFiles(prevFiles => ({ ...prevFiles, [docKey]: selectedFile }));
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFiles({ doc1: null, doc2: null });

    switch (selectedOption.value) {
      case 'Tourist':
        setShowFields({
          username: true,
          email: true,
          password: true,
          mobile: true,
          nationality: true,
          dob: true,
          job: true
        });
        break;
      default:
        setShowFields({
          username: true,
          email: true,
          password: true,
          mobile: false,
          nationality: false,
          dob: false,
          job: false,
        });
        break;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const allowedFields = Object.entries(showFields)
      .filter(([key]) => showFields[key])
      .map(([key]) => key);

    // Create data object with only allowed fields
    const data = {};
    for (const field of allowedFields) {
      data[field] = formData[field] || '';
    }

    try {
      let response;
      
      if (selectedOption.value === 'Tourist') {
        // For Tourist, send as JSON
        response = await axios.post(
          `http://localhost:8000/api/register/registerTourist`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        // For other roles, use FormData for file uploads
        const formDataObj = new FormData();
        Object.keys(data).forEach(key => {
          formDataObj.append(key, data[key]);
        });

        if (files.doc1) formDataObj.append('documents', files.doc1);
        if (files.doc2) formDataObj.append('documents', files.doc2);

        response = await axios.post(
          `http://localhost:8000/api/register/register${selectedOption.value}`,
          formDataObj,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }
      
      if (response.status === 200) {
        console.log('Signup successful!');
        localStorage.setItem('id', response.data._id);
        localStorage.setItem('role', selectedOption.value);
        const userId = response.data._id;

        let url;
        if (selectedOption.value === 'Advertiser' || selectedOption.value === 'Seller') {
          url = `/profileJohn/${userId}`;
        } else if (selectedOption.value === 'Tourist') {
          url = '/';
        } else if (selectedOption.value === 'TourGuide') {
          url = '/tourguide-dashboard';
        } else {
          throw new Error('Invalid user role');
        }

        window.location.href = url;
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  const renderFileInput = (docKey, label) => (
    <div>
      <label htmlFor={`doc${docKey}`} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={`doc${docKey}`}
        type="file"
        accept=".pdf,.jpeg,.jpg"
        onChange={(e) => handleFileChange(e, docKey)}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
    </div>
  );

  return (
    <BoxContainer>
      <FormContainer>
        <label>Sign up as:</label>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
        />
        {showFields.username && <Input type="text" name="username" placeholder="User name" onChange={handleInputChange} value={formData.username} />}
        {showFields.email && <Input type="email" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} />}
        {showFields.password && <Input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={formData.password} />}
        {showFields.mobile && <Input type="tel" name="mobile" placeholder="Mobile number" onChange={handleInputChange} value={formData.mobile} />}
        {showFields.nationality && <Input type="text" name="nationality" placeholder="Nationality" onChange={handleInputChange} value={formData.nationality} />}
        {showFields.dob && <label htmlFor="dob">Date of Birth:</label>}
        {showFields.dob && <Input type="date" name="dob" placeholder="Date of Birth" onChange={handleInputChange} value={formData.dob} />}
        {showFields.job && <label>Please enter whether you are a student/employee/unemployed</label>}
        {showFields.job && <Input type="text" name="job" placeholder="Job" onChange={handleInputChange} value={formData.job} />}
        {['Advertiser', 'Seller', 'TourGuide'].includes(selectedOption.value) && (
          <>
            {renderFileInput('doc1', 'Upload ID')}
            {renderFileInput('doc2', selectedOption.value === 'TourGuide' ? 'Upload Certificates' : 'Upload Taxation Registry Card')}
          </>
        )}
      </FormContainer>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={handleSubmit} type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}

export { SignupForm };