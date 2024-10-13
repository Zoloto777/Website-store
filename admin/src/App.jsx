import React from "react";
import Navbar from "./components/Navbar/navbar.jsx";
import Sidebar from "./components/Sidebar/sidebar";
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import Orders from "./pages/Orders/Orders.jsx";
import List from "./pages/List/List.jsx";
import Users from './pages/Users/Users.jsx'
const App = () => {
  const url = "http://localhost:4000"
  return (
    <div>
         <Navbar/>
         <hr/>
         <div className = "app-content">
          <Sidebar/>
          <Routes>
            <Route path = "/add" element = {<Add url = {url}/>}/>
            <Route path = "/list" element = {<List url = {url}/>}/>
            <Route path = "/orders" element = {<Orders url = {url}/>}/>
            <Route path = "/users" element = {<Users url = {url}/>}/>
          </Routes>
         </div>
    </div>
  )
}

export default App