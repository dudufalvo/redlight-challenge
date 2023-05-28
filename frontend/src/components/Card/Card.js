import React, {useEffect, useState} from 'react'
import './Card.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import avatar from '../../assets/imgs/avatar.png'

const Card = ({applicant}) => {
    const [roles, setRoles] = useState([])
    const [applicantRoles, setApplicantRoles] = React.useState([])

    useEffect(() => {
        console.log('Card')
        console.log(applicant)
        getRoles();
    }, [])

    const getRoles = async () => {
        /* function that get make a get request and
        store all the roles in the role variable */

        /* declare the url path and make a request using axios */
        const applicantsAPI = 'http://127.0.0.1:8000/api/roles/'
        const getApplicants = axios.get(applicantsAPI)
        axios.all([getApplicants]).then(

            /* axios.spread is used to get the data from the request */
            axios.spread((...allData) => {
                
                console.log(allData[0].data)
                /* store the data in the applicants variable */
                setRoles(allData[0].data)
            })
        ).catch(error => console.log(error))
    }

    useEffect(() => {
        /* useEffect to relate the applicant's roles ids with the role's names */
    
        /* declare an array to store the roles */
        var appRolesArray = []
    
        /* verifies if the roles and the applicant are not empty */
        if (roles.length > 0 && applicant.roles !== undefined) {
    
          /* for each role id in the applicant, find the role name in 
          the roles and store it in the appRolesArray */
          applicant.roles.map(applicantRole => {
            const role = roles.find(role => role.id === applicantRole)
            appRolesArray.push(role)
          })
    
          /* store the appRolesArray in the applicantRoles variable */
          setApplicantRoles(appRolesArray)
          console.log(appRolesArray)
        }
    }, [roles, applicant])


    return (
    <Link to={`/applicants/${applicant.id}`} className='card-link'>
    <div className='card-container'>
        <div className='card-image'><img src={applicant.avatar ? `http://localhost:8000/api${applicant.avatar}` : avatar} alt='avatar'/></div>
        <div className='card-content'>
            <div className='card-detail'>{applicant.name}</div>
            <div className='card-detail'>{applicant.phone_number}</div>
            <div className='card-detail'>{applicant.email}</div>
            <div className='card-detail'>{
                applicantRoles.map((role) => {
                    return applicantRoles.length > 1 ? role.name + '|' : role.name
                })
            }</div>
        </div>
    </div>
    </Link>
  )
}

export default Card