import React, {useEffect, useState} from 'react'
import './ApplicantPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import {IoMdSend} from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/imgs/avatar.png'
import RoleChange from '../../components/RoleChange/RoleChange';

const ApplicantPage = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = React.useState({})
  const [applicantRoles, setApplicantRoles] = React.useState({})
  const [rolesOptions, setRolesOptions] = React.useState([])
  const [status, setStatus] = React.useState([])
  const [editing, setEditing] = useState()

  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const getApplicant = () => {
      /* function that get make a get request and 
      store the applicant in the applicants variable */
  
      /* declare the url path and make a request using axios */
      const applicantAPI = `http://127.0.0.1:8000/api/applicants/${id}/`;
      const getApplicant = axios.get(applicantAPI);
      axios.all([getApplicant]).then(
  
        /* axios.spread is used to get the data from the request */
        axios.spread((...allData) => {
  
          /* store the data in the applicant variable */
          setApplicant(allData[0].data);
        })
      ).catch(error => console.log(error))
    }

    getApplicant();
  }, [id])

  useEffect(() => {
    setNameInput(applicant?.name)
    setEmailInput(applicant?.email)
    setPhoneInput(applicant?.phone_number)
  }, [applicant])

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

  useEffect(() => {
    getStatus();

  }, [])

  const getStatus = async () => {
    /* function that get make a get request and 
    store all the status in the status variable */

    /* declare the url path and make a request using axios */
    const statusAPI = 'http://127.0.0.1:8000/api/status/'
    const getStatus = axios.get(statusAPI)
    axios.all([getStatus]).then(

        /* axios.spread is used to get the data from the request */
        axios.spread((...allData) => {

            /* store the data in the rolesOptions variable */
            setStatus(allData[0].data)
        })
    ).catch(error => console.log(error))
  }

  useEffect(() => {
    /* useEffect to relate the applicant's roles ids with the role's names */

    /* declare an array to store the roles */
    var appRolesArray = []

    /* verifies if the rolesOptions and the applicant are not empty */
    if (rolesOptions.length > 0 && applicant.roles !== undefined) {

      /* for each role id in the applicant, find the role name in 
      the rolesOptions and store it in the appRolesArray */
      applicant.roles.map(applicantRole => {
        const role = rolesOptions.find(role => role.id === applicantRole)
        appRolesArray.push(role)
      })

      /* store the appRolesArray in the applicantRoles variable */
      setApplicantRoles(appRolesArray)
    }
  }, [rolesOptions, applicant])

  const handleDelete = (event) => {
    /* function that delete the applicant from the backend */

    /* declare the url path and make a request using axios */
    console.log('deleting...')
    axios.delete(`http://127.0.0.1:8000/api/applicants/${id}/`)
    .then(res => {

        /* if the request is successful, redirect to the home page */
        console.log(res)
        navigate('/')})
    .catch(err => console.log(err))
  }

  const handleEdit = (event) => {
    /* function that submit the form to the backend */

    /* declare the url path and make a request using axios */
    console.log('editing...')
    const appFormAPI = `http://127.0.0.1:8000/api/applicants/${id}/`

    const data = {
      name: nameInput,
      phone_number: phoneInput,
      email: emailInput
    }

    axios.patch(appFormAPI, data).then((response) => {

      /* if the request is successful, redirect to the home page */
      console.log(response)
      if (response.statusText === "OK") setEditing(false)

    }).catch((error) => {

      /* if the request is not successful, log the error */
      console.log(error)
    })

  }

  const handleNameChange = (event) => {
    /*  handle the input change  and update the input var*/
    setNameInput(event.target.value)
  }
  const handleEmailChange = (event) => {
    /*  handle the input change  and update the input var*/
    setEmailInput(event.target.value)
  }
  const handlePhoneChange = (event) => {
    /*  handle the input change  and update the input var*/
    setPhoneInput(event.target.value)
  }


  return (
    <div className='applicant'>
        <Navbar/>
        <div className='applicant-container'>
          <div className='applicant-image'>
            <img src={applicant.avatar ? `http://localhost:8000/api${applicant.avatar}` : avatar} alt='applicant'/>
          </div>
          <div className='applicant-container2'>
              {!editing?
                <div className='applicant-info'>
                  <h1>{applicant.name}</h1>
                  <h2>{applicant.email}</h2>
                  <h2>{applicant.phone_number}</h2>
                  <div>
                    {applicantRoles.length > 0 && applicantRoles.map(role => {
                      
                      /* filter the applicant in the status array by their name */
                      const appStatusFilter = status.filter(status => status.applicant.name === applicant.name)
                      
                      /* filter the status related to the current role mentioned */
                      const roleStatusFilter = appStatusFilter.filter(status => status.role.name === role.name)
                      
                      var statusStyle = ''
                      if (roleStatusFilter[0]?.status === 'Approved')  statusStyle='accepted'
                      if (roleStatusFilter[0]?.status === 'Rejected')  statusStyle='rejected'
                      if (roleStatusFilter[0]?.status === 'Under Analysis')  statusStyle='pending'

                      return (
                        <div className='applicant-role'>
                          <h3>- {role.name}</h3>
                          <p className={statusStyle}>{roleStatusFilter[0]?.status}</p>
                        </div>
                      )
                    })}
                  </div>
                </div> :
                <div className='applicant-info'>
                  <form className='applicant-edit'>
                    <input
                      type='text'
                      placeholder={applicant.name}
                      onChange={handleNameChange}
                      value={nameInput}
                    />
                  </form>
                  <form className='applicant-edit'>
                    <input
                      type='text'
                      placeholder={applicant.email}
                      onChange={handleEmailChange}
                      value={emailInput}
                    />
                  </form>
                  <form className='applicant-edit'>
                    <input
                      type='text'
                      placeholder={applicant.phone_number}
                      onChange={handlePhoneChange}
                      value={phoneInput}
                    />
                  </form>
                  {applicantRoles.map(role => <RoleChange role={role} applicant={applicant} />)}
                </div>
              }
            <div className='applicant-icons'>
            {!editing?
              <button className='role-button' onClick={() => {setEditing(!editing)}}><AiFillEdit /></button> :
              <button className='role-button' onClick={handleEdit} ><IoMdSend/></button>
            }
            <button className='role-button' onClick={handleDelete}><AiFillDelete /></button>   
          </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ApplicantPage