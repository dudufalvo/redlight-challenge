import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './HomePage.css'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import { BiSearch } from 'react-icons/bi';
import 'reactjs-popup/dist/index.css';
import Footer from '../../components/Footer/Footer'

const HomePage = () => {
  const [applicants, setApplicants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("applicants")
  const [searchHolder, setSearchHolder] = useState("Search applicants name")
  const [rolesOptions, setRolesOptions] = React.useState([])

  useEffect(() => {
    getApplicants();
  }, [])

  const getApplicants = async () => {
    /* function that get make a get request and 
    store all the applicants in the applicants variable */

    /* declare the url path and make a request using axios */
    const applicantsAPI = 'http://127.0.0.1:8000/api/applicants/'
    const getApplicants = axios.get(applicantsAPI)
    axios.all([getApplicants]).then(

        /* axios.spread is used to get the data from the request */
        axios.spread((...allData) => {

            /* store the data in the applicants variable */
            setApplicants(allData[0].data)
        })
    ).catch(error => console.log(error))
  }

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

  const setFilter = (filter) => {
    if (filter === 'applicants') {
      setSearchFilter('applicants')
      setSearchHolder('Search applicants name')
    } else if (filter === 'roles') {
      setSearchFilter('roles')
      setSearchHolder('Search roles name')
    }
  }

  return (
    <div className='homepage'>
        <Navbar/>
        <div className='homepage-container'>
          <h1 className='homepage-title'>HomePage</h1>
          <div className='homepage-content'>
            <div className='homepage-filters'>
              <form className='homepage-searchbox'>
                <BiSearch className='homepage-searchicon'/>
                <input
                    type="text"
                    onChange={(event)=>{
                      setSearchTerm(event.target.value);
                    }}
                    placeholder={searchHolder}
                />
              </form>
              
              <div className="homepage-list">
                <li>
                  <button onClick={() => setFilter('applicants')}><p className={(searchFilter==="applicants"?' active':'')}>Applicants</p></button>
                  <button onClick={() => setFilter('roles')}><p className={(searchFilter==="roles"?' active':'')}>Roles</p></button>
                </li>
              </div>
            </div>
            <div className='homepage-cards'>
              {searchFilter==="applicants" ?

                applicants.filter((value)=>{
                if (searchTerm === "") return value
                else if (value.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return value
                else return null
                }).map((applicant, index) => (<Card key={index} applicant={applicant} />))

                :
                
                applicants.filter((value)=>{
                  if (searchTerm === "") return value
                  else if (rolesOptions.some((role) => role.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))) {
                    console.log(rolesOptions.filter((role) => role.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())))
                    const rolesFiltered = rolesOptions.filter((role) => role.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                    const applicantsRoles=value.roles

                    if (applicantsRoles.some(approle => rolesFiltered.some(role => role.id === approle))) return value
                  }
                  else return null
                  }).map((applicant, index) => (<Card key={index} applicant={applicant} />))

              }
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default HomePage