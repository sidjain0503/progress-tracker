import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <div className='header'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/programming">Programming</Link>
        <Link className='link' to="/college">College</Link>
        <Link className='link' to="/other">Other</Link>
    </div>
  )
}

export default Header