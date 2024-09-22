import React from 'react'
import './sidebar.css'
import additem from '../../assets/add_item.png'
import listitems from '../../assets/list_items.png'
import orders from '../../assets/orders.png'
import { NavLink } from 'react-router-dom'
const sidebar = () => {
  return (
    <div className = 'sidebar'>
      <div className="sidebar-options">
        <NavLink to = "/add" className="sidebar-option">
            <img src = {additem} alt =""/>
            <p>Add items</p>
        </NavLink>
        <NavLink to = "/list" className="sidebar-option">
            <img src = {listitems} alt =""/>
            <p>List items</p>
        </NavLink>
        <NavLink to = "/orders" className="sidebar-option">
            <img src = {orders} alt =""/>
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default sidebar