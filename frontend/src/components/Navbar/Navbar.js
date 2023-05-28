import React from 'react'
import './Navbar.css'
import redlogo from '../../assets/imgs/logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='navbar-container'>
          <div className='navbar-logo'><a href='/'><img href='/' src={redlogo} alt='logo'/></a></div>
          <div className='navbar-list'>
              <li>
                  <a href='/' className='underline'>Home</a>
                  <a href='/applicants-form/' className='underline'>Applicant Form</a>
                  <a href='/roles-form/' className='underline'>Role Form</a>
              </li>
          </div>
        </div>
    </div>
  )
}


export default Navbar