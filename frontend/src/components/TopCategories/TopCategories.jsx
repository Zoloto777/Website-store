import React, { useState, useEffect } from 'react';
import white_chair from "../../assets/white_chair.png"; // Use your image path
import './TopCategories.css';

const TopCategories = () => {
    const items = [
        {
            id: 1,
            name: 'Wing Chair',
            products: '3,584 Products',
            image: white_chair,
        },
        {
            id: 2,
            name: 'Wooden Chair',
            products: '157 Products',
            image: white_chair,
        },
        {
            id: 3,
            name: 'Desk Chair',
            products: '1599 Products',
            image: white_chair,
        },
        {
            id: 4,
            name: 'Park Bench',
            products: '1540 Products',
            image: white_chair,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(1);
    const itemCount = items.length;

    // Duplicate items for seamless scrolling with unique keys
    const visibleItems = [
        { ...items[itemCount - 1], id: items[itemCount - 1].id + 100 }, // Unique key for the previous item
        ...items,
        { ...items[0], id: items[0].id + 200 }, // Unique key for the next item
    ];

    const handleNext = () => {   
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrev = () => {
        console.log(currentIndex)
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        if (currentIndex === visibleItems.length - 1) {
            setCurrentIndex(1); // Reset to first original item
        } else if (currentIndex === -1) {
            setCurrentIndex(visibleItems.length - 2); // Go to last original item
        }
    }, [currentIndex, visibleItems.length]);

    return (
        <div className="carousel-container">
            <div className='header-container'>
                <h2 className='top-categories-header'>Top Categories</h2>
                <div className='arrow-container'>
                    <button className="arrow left-arrow" onClick={handlePrev}>
                        &lt;
                    </button>
                    <button className="arrow right-arrow" onClick={handleNext}>
                        &gt;
                    </button>
                </div>
            </div>
            <div className="carousel">
                <div 
                    className="carousel-items" 
                    style={{ transform: `translateX(-${(currentIndex * (424 + 24))}px)` }}
                >
                    {visibleItems.map((item, index) => (
                        <div
                            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                            key={item.id} 
                        >
                            <img src={item.image} alt={item.name} />
                            <div className="item-info">
                                <h3 className='item-name'>{item.name}</h3>
                                <p className='item-quantity'>{item.products}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopCategories;
