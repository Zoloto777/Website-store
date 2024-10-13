import React from 'react'
import ProductItem from '../ProductItem/ProductItem'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import './RecentlyAdded.css'
import Arrows from '../Arrows/Arrows'
const RecentlyAdded = () => {
    const { product_list } = useContext(StoreContext)
    return (
        <div className='recently-added'>
            <div className='header-holder'>
                <h4>Recently added</h4>
                <Arrows />
            </div>
            <div className='recent-products-list'>
                {
                    product_list.map((item, index) => {
                        // console.log(product_list)
                        return <ProductItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    })
                }
            </div>
        </div>
    )
}

export default RecentlyAdded