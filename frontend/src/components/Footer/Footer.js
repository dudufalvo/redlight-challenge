import React from 'react'
import './Footer.css'
import redlogo from '../../assets/imgs/logoW.png'
import insta from '../../assets/imgs/insta.svg'
import face from '../../assets/imgs/facebook.svg'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-container'>
            <div className='navbar-logo'><a href='https://redlight.dev/'><img src={redlogo} alt='logo'/></a></div>
            <div className='footer-list'>
                <li>
                    <a className='footer-list-icon' href='https://www.instagram.com/redlight.dev/'><img src={insta} alt='logo'/></a>
                    <a className='footer-list-icon' href='https://www.facebook.com/redlight.dev/'><img  src={face} alt='logo'/></a>
                </li>
            </div>
        </div>
    </div>
  )
}

export default Footer