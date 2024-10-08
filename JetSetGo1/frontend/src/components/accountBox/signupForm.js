import React, { useState, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

var userId = ""

const SignupForm =()=> {
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
    name: true,
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

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;

  //   // Ensure the field name exists in the state object
  //   if (!formData.hasOwnProperty(name)) {
  //     console.warn(Invalid input name: ${name});
  //     return;
  //   }
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };



  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Ensure the field name exists in the state object
    if (!formData.hasOwnProperty(name)) {
      console.warn(`Invalid input name: ${name}`);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);


    switch (selectedOption.value) {
      case 'Tourist':
        setShowFields((prevShowFields) => ({
          username: true,
          email: true,
          password: true,
          mobile: true,
          nationality: true,
          dob: true,
          job: true
        }));
        break;

      default:
        setShowFields((prevShowFields) => ({
          username: true,
          email: true,
          password: true,
          mobile: false,
          nationality: false,
          dob: false,
          job: false,
        }));
        break;
    }


  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract allowed fields based on selectedOption
    const allowedFields = Object.entries(showFields)
      .filter(([key]) => showFields[key])
      .map(([key]) => key);

    // Construct the data object with only allowed fields
    const data = {};
    for (const field of allowedFields) {
      data[field] = formData[field];
    }

    console.log(data);
    console.log(JSON.stringify(data));

    // Replace with your actual API endpoint and request method
    const response = await fetch(`http://localhost:8000/api/register/register${selectedOption.value}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      // Handle successful signup
      console.log('Signup successful!');
      localStorage.setItem('id', responseData._id);
      localStorage.setItem('role', selectedOption.value);
      const userId = responseData._id;
      const role = selectedOption.value;

      // Redirect based on role
      let url;
      
      if (role === 'Advertiser') {
        url = `/profile/${userId}`;
        // navigate('/profile', { state: { userId } });
        // this.props.history.push({
        //   pathname: '/profile',
        //   state: userId // your data array of objects
        // })
        // console.log('Navigating to profile with User ID:', userId); 
        // navigate('/profile', { state: { userId }});

      } else if (role === 'Seller') {
        url = `/profile/${userId}`;
        // navigate('/profile', { state: { userId } });
      } else if (role == 'Tourist') {
        url = ``;//home page aw haga @ALY
      }
      else if (role == 'TourGuide') {
        url = ``;///@moemen
      }
      else {
        throw new Error('Invalid user role');
      }

      // Redirect to the profile page
      window.location.href = url;

    } else {
      // Handle signup error
      // console.error('Signup failed:', await response.text());
      // Display error message to user
    }
  };




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
        {showFields.mobile && <Input type="tel" name="mobile" placeholder="mobile number" onChange={handleInputChange} value={formData.mobile} />}
        {showFields.nationality && <Input type="text" name="nationality" placeholder="Nationality" onChange={handleInputChange} value={formData.nationality} />}
        {showFields.dob && <label htmlFor="dob">Date of Birth:</label>}
        {showFields.dob && <Input type="date" name="dob" placeholder="Date of Birth" onChange={handleInputChange} value={formData.dob} />}
        {showFields.job && <label>Please enter whether you are a student/employee/unemployed</label>}
        {showFields.job && <Input type="text" name="job" placeholder="Job" onChange={handleInputChange} value={formData.description} />}
      </FormContainer>
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
export { SignupForm, userId };
