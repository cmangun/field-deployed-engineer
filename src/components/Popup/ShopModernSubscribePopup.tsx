"use client"
import popupImg from '../../../public/assets/img/shop-home/newsletter/window-popup.jpg';
import logo from '../../../public/assets/img/logo/logo-shop.png';
import React, { useEffect } from 'react';
import Image from 'next/image';

const ShopModernSubscribePopup = () => {
  const [showPopup, setShowPopup] = React.useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('subscribePopupClosed')) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('subscribePopupClosed', 'true');
  };

  if (!showPopup) return null;

  return (
    <div className={`subscribe-popup ${showPopup ? 'show' : ''}`}>
      <div className="tp-shop-popup-wrap">
        <div className="tp-shop-popup-img d-none d-md-block">
          <Image src={popupImg} alt="Subscribe offer" />
        </div>
        <div className="tp-shop-popup-content text-center">
          <div className="close" onClick={handleClose}>
            <i className="fa-light fa-xmark"></i>
          </div>
          <div className="tp-shop-popup-logo">
            <Image src={logo} alt="Logo" />
          </div>
          <div className="tp-shop-popup-text">
            <h4>Save 15%</h4>
            <p>ON TODAYS ORDER</p>
            <span>SIGN UP BELOW FOR DISCOUNT CODE</span>
          </div>
          <form action="#">
            <div className="tp-shop-popup-inputbox">
              <input type="text" placeholder="Email Address" />
              <button className="tp-btn-black-square w-100" type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopModernSubscribePopup;