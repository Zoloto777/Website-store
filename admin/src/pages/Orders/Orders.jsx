import React from 'react'
import "./Orders.css"
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import axios from 'axios'
import parcel from '../../assets/parcel.png'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    console.log(12)
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();

  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div ket={index} className='order-item'>
            <img src={parcel} alt='' />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ","
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + "  " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Product processing">Product processing</option>
              <option value="Currently being delivered">Currently being delivered</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Orders