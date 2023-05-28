import React, {useEffect} from 'react'
import axios from 'axios'
import './RoleFormPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Role from '../../components/Role/Role'
import Footer from '../../components/Footer/Footer'


const RoleFormPage = () => {
  /* declare reactive variables */
  const [name, setName] = React.useState('')
  const [rolesOptions, setRolesOptions] = React.useState([])

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

    /* declare the url path and make a request using axios */
    const roleFormAPI = 'http://127.0.0.1:8000/api/roles/'

    /* store all the forms content in the data variable */
    const data = {
      name: name
    }

    /* make a post request to the backend */
    axios.post(roleFormAPI, data).then((response) => {

      /* if the request is successful, redirect to the home page */
      console.log(response)
      if (response.statusText === "Created") window.location.reload(false);

    }).catch((error) => {

      /* if the request is not successful, log the error */
      console.log(error)
    })

  }

  return (
    <div className='roleform'>
        <Navbar/>
        <div className='roleform-container'>
          <h1 className='roleform-title'>Role's Form</h1>
          <div className='roleform-content'>
            <div className='roleform-input'>
              <label className='input-text' htmlFor='name'>New Role Name *</label>
              <input className='input-box' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
              <div className='roleform-button'><button onClick={() => submitForm()} className='button-submit'>Submit</button></div> 
            </div>
            <div className='roleform-content-left'>
              <h2 className='roleform-title2'>Existing Roles</h2>
              <div className='roleform-roles'>
                {rolesOptions.map((role, index) => (<Role key={index} role={role} />))}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default RoleFormPage