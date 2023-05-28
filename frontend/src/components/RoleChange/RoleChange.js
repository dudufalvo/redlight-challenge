import React, {useState, useEffect} from 'react'
import { AiFillDelete } from 'react-icons/ai';
import {IoMdSend} from 'react-icons/io'
import axios from "axios";
import './RoleChange.css'

const RoleChange = ({role, applicant}) => {
  const [allStatus, setAllStatus] = useState();
  const [status, setStatus] = useState();
  const [statusChanged, setStatusChanged] = useState('');

  useEffect(() => {
    getAllStatus()
  }, []) 

  useEffect(() => {
    const getThisStatus = async () => {
      /* function that filters the applicant and 
      role and match them to get the status info */
  
      /* filter the status with the applicant name */
      const applicantFilter = allStatus?.filter((status) => status.applicant.name === applicant?.name)
      
      /* filter the filtered status with the role name */
      const roleFilter = applicantFilter?.filter((status) => status.role.name === role?.name)
  
      /* ends up with the status that correspond to the match between applicant and role */
      setStatus(roleFilter[0])
    }

    if (allStatus) getThisStatus()
  }, [allStatus, applicant, role])

  const handleStatusChange = (e) => {
    console.log(e.target.value)
    setStatusChanged(e.target.value);
  };

  const getAllStatus = async () => {
    /* function that get make a get request and 
    store all the status in the status variable */

    /* declare the url path and make a request using axios */
    const statusAPI = 'http://127.0.0.1:8000/api/status/'
    const getStatus = axios.get(statusAPI)
    axios.all([getStatus]).then(

        /* axios.spread is used to get the data from the request */
        axios.spread((...allData) => {

            /* store the data in the rolesOptions variable */
            setAllStatus(allData[0].data)
        })
    ).catch(error => console.log(error))
  }
    

  const handleEdit = async () => {
    /* function that get make a get request and
    store all the status in the status variable */

    /* declare the url path and make a request using axios */
    const statusAPI = `http://127.0.0.1:8000/api/status/${status.id}/`

    const data = {
      status: statusChanged
    }

    axios.patch(statusAPI, data).then((response) => {

      /* if the request is successful, redirect to the home page */
      console.log(response)
      if (response.statusText === "OK") window.location.reload(false);

    }).catch((error) => {

      /* if the request is not successful, log the error */
      console.log(error)
    })}

    const handleDelete = (event) => {
      /* function that delete the approle from the backend */
  
      /* declare the url path and make a request using axios */
      console.log('deleting...')
      axios.delete(`http://127.0.0.1:8000/api/status/${status.id}/`)
      .then(res => {
  
          /* if the request is successful, redirect to the home page */
          console.log(res)
          window.location.reload(false);})
      .catch(err => console.log(err))
    }

  return (
    <div className='rolechange'>
        <div className='rolechange-select'>
            <p>{role.name}</p>
        </div>
        <div className='rolechange-select'>
            <select name="status" id="status" onChange={handleStatusChange}>
                {status?.status === 'Accepted' ? <option value="Approved" selected>Approved</option> : <option value="Approved">Approved</option>}
                {status?.status === 'Under Analysis' ? <option value="Under Analysis" selected>Under Analysis</option> : <option value="Under Analysis">Under Analysis</option>}
                {status?.status === 'Rejected' ? <option value="Rejected" selected>Rejected</option> : <option value="Rejected">Rejected</option>}
            </select>
        </div>
        <div className='rolechange-icons'>
          <button className='role-button' onClick={handleEdit} ><IoMdSend/></button>
          <button className='role-button' onClick={handleDelete}><AiFillDelete /></button> 
        </div>
    </div>
  )
}

export default RoleChange