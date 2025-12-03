'use client';
import announcementBg from '../../../../public/assets/img/home-10/header-img/announcement.png';
import React, { useState, useEffect } from 'react';
import { ArrowSvg, CrossIconFour } from '@/svg';
import Link from 'next/link';

const HeaderTop = () => {
  const [isVisible, setIsVisible] = useState(true);      
  const [isHiding, setIsHiding] = useState(false);     

  const handleHide = () => {
    setIsHiding(true);
  };

  useEffect(() => {
    if (isHiding) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isHiding]);

  if (!isVisible) return null;

  return (
    <div
      className={`tp-header-10-announcement-area p-relative include-bg announcement-slide ${
        isHiding ? 'hide' : ''
      }`}
      style={{ backgroundImage: `url(${announcementBg.src})` }}
    >
      <div className="tp-header-10-announcement-close">
        <button className="hide-button" onClick={handleHide}>
          <CrossIconFour />
        </button>
      </div>
      <div className="container container-1430">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-header-10-announcement-wrapper">
              <div className="tp-header-10-announcement-content d-flex align-items-center justify-content-center">
                <p>
                  <span>Free Update</span>Free support, Free updates, Free plugins.
                </p>
                <Link className="d-none d-sm-block" href="/contact">
                  Join Us{' '}
                  <span>
                    <ArrowSvg strokeWidth={2} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
