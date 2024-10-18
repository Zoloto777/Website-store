import React from 'react'
import "./Testimonial.css"
import Arrows from '../Arrows/Arrows'
import pfp from '../../assets/pfp1.png'
import quotes from '../../assets/quotes.png'

const Testimonial = () => {
    return (
        <div className='testimonial'>
            <div className='testimonial-header'>
                <h4>What Client Says About Us</h4>
                <Arrows />
            </div>
            <div className="testimonials-main">
                <div className="testimonial-card">
                    <p className='comment'>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet mi nec massa tincidunt blandit et eu sem. Maecenas laoreet ultrices diam dignissim posuere. Aenean ultrices dui at ipsum sagittis, pharetra lacinia dui faucibus. In ac bibendum ex. Aenean dolor massa, euismod sit amet suscipit et“
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet mi nec massa tincidunt blandit et eu sem. Maecenas laoreet ultrices diam dignissim posuere. Aenean ultrices dui at ipsum sagittis, pharetra lacinia dui faucibus. In ac bibendum ex. Aenean dolor massa, euismod sit amet suscipit et“
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet mi nec massa tincidunt blandit et eu sem. Maecenas laoreet ultrices diam dignissim posuere. Aenean ultrices dui at ipsum sagittis, pharetra lacinia dui faucibus. In ac bibendum ex. Aenean dolor massa, euismod sit amet suscipit et“
                    </p>
                    <div className='profile'>
                        <div className='profile-container'>
                            <img className='pfp' src={pfp} />
                            <div className='profile-info'>
                                <p className='profile-name'>Name surname</p>
                                <p className='profile-desc'>Name surname</p>
                            </div>
                        </div>
                        <img className='quotes' src={quotes} />
                    </div>
                </div>
                <div className="testimonial-card"></div>
            </div>
        </div>
    )
}

export default Testimonial