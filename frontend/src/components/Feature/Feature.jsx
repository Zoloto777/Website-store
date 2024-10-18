import React from 'react'
import './Feature.css'
import hours from "../../assets/24-hours.png"
import box from "../../assets/box.png"
import shield from "../../assets/shield.png"
import truck from "../../assets/delivery-truck.png"
import logos from "../../assets/Company Logo.png"
const Feature = () => {
  return (
    <div className='feature-container'>
      <div className='feature'>
        <div className="frame">
          <img src={box} />
          <div>
            <p className='frame-name'>Discount</p>
            <p className='frame-desc'>Every week new sale</p>
          </div>
        </div>
        <div className="frame">
          <img src={truck} />
          <div>
            <p className='frame-name'>Free Delivery</p>
            <p className='frame-desc'>100% Free for all orders</p>
          </div>
        </div>
        <div className="frame">
          <img src={hours} />
          <div>
            <p className='frame-name'>Great Support 24/7</p>
            <p className='frame-desc'>We care your experiences</p>
          </div>
        </div>
        <div className="frame">
          <img src={shield} />
          <div>
            <p className='frame-name'>secure Payment</p>
            <p className='frame-desc'>100% Secure Payment Method</p>
          </div>
        </div>
      </div>
      <div className='logos'>
          <img src = {logos}/>
        </div>
    </div>
  )
}

export default Feature