import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import rateLimit from 'axios-rate-limit';
import Navbar from '../../components/Navbar/Navbar'
import './AppFormPage.css'
import DropdownRoles from '../../components/DropdownRoles/DropdownRoles'
import Footer from '../../components/Footer/Footer'

const api = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000 });

const AppFormPage = () => {
  /* declare reactive variables */
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState()
  const [roles, setRoles] = useState([])
  const [rolesOptions, setRolesOptions] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getRoles();
  }, [])

  const getRoles = async () => {
    /* function that get make a get request and 
    store all the roles in the rolesOption variable */

    /* declare the url path and make a request using axios */
    const rolesAPI = 'http://127.0.0.1:8000/api/roles/'
    const getRoles = axios.get(rolesAPI)
    axios.all([getRoles]).then(

        /* axios.spread is used to get the data from the request */
        axios.spread((...allData) => {

            /* store the data in the rolesOptions variable */
            setRolesOptions(allData[0].data)
        })
    ).catch(error => console.log(error))
  }

  const submitForm = async (e) => {
    /* function that submit the form to the backend */

    /* check if the form is valid */
    if (!(name === '' || phone === '' || email === '' || roles.length === 0)) {
      console.log(name, phone, email, roles)
      /* declare the url path and make a request using axios */
      const appFormAPI = 'http://127.0.0.1:8000/api/applicants/'

      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone_number', phone);
      formData.append('email', email);
      formData.append('avatar', avatar); // Assuming `avatarFile` is the File object representing the selected image

      const rolesToAppend = roles.map((item, index) => ({
        name: item.name,
        status: 'Under Analysis'
      }));
      formData.append('roles', JSON.stringify(rolesToAppend));

      /* make a post request to the backend */
      axios.post(appFormAPI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the proper content type for form data
        },
      })
      .then((response) => {
        console.log(response);
        if (response.statusText === 'Created') navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else {
      /* if the form is not valid, display an error message */
      alert('Please fill all the required fields')
    }

  }


  const imageConvertion = async (acceptedFiles) => {
    /* function that convert the image file to an url */

    /* declare the url path and make a request using axios */
    console.log(acceptedFiles)
    const file = acceptedFiles;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': 'Client-ID ce5cb2c03d9403c',  // Replace with your Imgur API Client ID
        },
      });

      const imageUrl = response.data.data.link;
      console.log('Imgur link:', imageUrl);
      // Do something with the Imgur link, such as storing it in state or sending it to the server.
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  return (
    <div className='app-form'>
      <Navbar/>
      <div className='appform-container'>
        <h1 className='appform-title'>Applicant's Forms</h1>
        <div className='appform-content'>
          <div className='appform-input'>
            <label className='input-text' htmlFor='name'>Name *</label>
            <input className='input-box' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='appform-input'>
            <label className='input-text' htmlFor='phone'>Phone Number *</label>
            <input className='input-box' type='text' value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
          <div className='appform-input'>
            <label className='input-text' htmlFor='email'>Email *</label>
            <input className='input-box' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='appform-input'>
            <label className='input-text' htmlFor='email'>Role *</label>
            <DropdownRoles isMulti isSearchable onChange={(value) => setRoles(value)} placeHolder={'Select a Role...'} options={rolesOptions}/>
          </div>
          <div className='appform-input'>
            <label className='input-text' htmlFor='email'>Avatar</label>
            <input className='input-file' type='file' onChange={(e) => setAvatar(e.target.files[0])}/>
          </div>
        </div>
        <div className='appform-button'>
          <button onClick={() => submitForm()} className='button-submit'>Submit</button>
        </div>    
      </div>
      <Footer/>
    </div>
  )
}

export default AppFormPage