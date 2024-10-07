import React, { useContext } from 'react'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './OurProducts.css'
import ProductItem from '../ProductItem/ProductItem.jsx'

function OurProducts() {
    const [selectedTab, setSelectedTab] = useState(null);
    const {product_list} = useContext(StoreContext)

    const handleClick = (index) => {
        setSelectedTab(index);
    };

    const tabs = ["ALL", "NEWEST", "TRENDING", "BEST SELLERS", "FEATURED"];
    return (
        <div className='main'>
            <p className='name'>Our Products</p>
            <div className='tab'>
                <ul className="tab-list">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`tab-item ${selectedTab === index ? "highlighted-text" : ""}`}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>
            <div className= 'products-list'>
                {
                    product_list.map((item, index)=>{
                        // console.log(product_list)
                        return <ProductItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    })
                }
            </div>
        </div>
    )
}

export default OurProducts