import React, { useContext, useState } from 'react'
import Heart from '../../assets/heart.svg'
import Addcart from '../../assets/Add Cart.svg'
import './ProductItem.css'
import AddedCartImage from '../../assets/cartadded.svg'
import { StoreContext } from '../../context/StoreContext'


const ProductItem = ({ id, name, price, description, image }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cartItems, removeFromCart, addToCart, url } = useContext(StoreContext)

  const handleAddToCartClick = () => {
    if (isAddedToCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
    setIsAddedToCart(!isAddedToCart);
  };

  return (
    <div className='product-select'>
      <div className='product-image-status'>
        <img className='product-img' src={url + "/images/" + image} alt={name} />
        <div className='product-status'>
          <p className='product-status-name'>Sales</p>
        </div>
        <div className='heart-container'>
          <img className='heart' src={Heart} alt="heart" />
        </div>
      </div>
      <div className='product-info'>
        <div className='product-name-price'>
          <p
            className='product-name'
            style={{ color: isAddedToCart ? 'rgba(0, 117, 128, 1)' : '#272343' }}
          >
            {name}
          </p>
          <div className='prices'>
            <p className='product-price'>${price}</p>
            <s className='product-price-discounted'>$20</s>
          </div>
        </div>
        <img
          className='add-cart'
          src={isAddedToCart ? AddedCartImage : Addcart}
          alt="Add to cart"
          onClick={handleAddToCartClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default ProductItem;