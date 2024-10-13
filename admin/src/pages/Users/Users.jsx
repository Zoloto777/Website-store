import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import './Users.css'
const Users = () => {
    const url = "http://localhost:4000"
    const [list, setList] = useState([])

    const fetchAllUsers = async () => {
        const response = await axios.get(`${url}/api/user/users`)

        if (response.data.success) {
            setList(response.data.data)
        }
        else {
            toast.error("Error");
        }
    }

    // update product
    const updateProduct = async (userID, data, variable) => {
        try {
            console.log(data)
            console.log(variable)
            const response = await axios.put(`${url}/api/user/update?id=${userID}`, { field: data, value: variable });
            console.log(response.data.success)
            if (response.data.success) {
                console.log(response.data.data)
            } else {
                console.log("Error: Update failed");
            }
        } catch (error) {
            console.error("Error in update users:", error);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const removeUser = async(productID) => {
        const response = await axios.post(`${url}/api/user/remove`, {id:productID})
        await fetchAllUsers();
        if(response.data.success ) {
          toast.success(response.data.message)
        }
        else{
        toast.error("Error")}
      }

    return (
        <div className='list add flex-col'>
            <p>List of users</p>
            <div className='list-table-user'>
                <div className='user-list-table-format title'>
                    <b>Name</b>
                    <b>Action</b>
                </div>
                {
                    list.map((item, index) => {
                        return (
                            <div key={index} className="user-list-table-format">
                                <p contenteditable="true" onBlur={(e) => updateProduct(item._id, "name", e.target.innerText)}> {item.name} </p>
                                <button onClick={() => removeUser(item._id)} className='cursor'>Delete</button>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
export default Users