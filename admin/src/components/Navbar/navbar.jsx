import React from 'react'
import './navbar.css'
import logo from '../../assets/logo.avif'
const navbar = () => {
  return (
    <div className='navbar'>
        <img className = 'logo' src = {logo} alt = ""/>
        <img className = 'profile' src = {logo} alt = ""/>
    </div>
  )
}

export default navbar