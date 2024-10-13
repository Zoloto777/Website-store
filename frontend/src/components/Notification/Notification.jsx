import React, { useState, useEffect } from 'react';
import './Notification.css'; // Link to the CSS file

const OrderStatusPopup = ({ orderStatus }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Show popup when the order status is updated
  useEffect(() => {
    if (orderStatus) {
      setShowPopup(true);

      // Auto-hide the popup after 5 seconds
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      // Cleanup the timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [orderStatus]);

  return (
    <div className="profile-area">

      {showPopup && (
        <div className="order-status-popup">
          <p>Order Status Updated: {orderStatus}</p>
          <button onClick={() => setShowPopup(false)} className="close-button">
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderStatusPopup;


