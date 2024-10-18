import React from 'react'
import chairheader from "../../assets/chair-header.png"
import bgshape from "../../assets/BG Shapes.png"
import discount from "../../assets/discount.png"
import "./Header.css"
const header = () => {
    return (
        <div className='main-header'>
            <div className='header-arrow-left arrow'>
                <p>&#8592;</p>
            </div>

            <div className='hero-info'>
                <h1 className='upper-text'>Welcome to chairy</h1>
                <p className='main-text'>Best Furniture Collection for your interior.</p>
                <button>Shop now &#8594;</button>
            </div>
            <div className='display'>
                <img className='main-img' src={chairheader} />
                <img className='bg-shape' src={bgshape} />
                <div className='discount'>
                    <img src={discount} />
                    <p className='discount-num'>54%</p>
                    <p className='discount-name'>Discount</p>
                </div>
            </div>

            <div className='header-arrow-right arrow'>
                <p> &#8594;</p>
            </div>
        </div>
    )
}

export default header