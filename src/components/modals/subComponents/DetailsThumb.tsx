import React, { useState } from 'react';
import Image from 'next/image';

// Import main product images
import productThumb1 from '../../../../public/assets/img/product/product-details-main/product-thumb-1.png';
import productThumb2 from '../../../../public/assets/img/product/product-details-main/product-thumb-2.png';
import productThumb3 from '../../../../public/assets/img/product/product-details-main/product-thumb-3.png';

// Import thumbnail images
import productNav1 from '../../../../public/assets/img/product/product-details-main/nav/product-details-nav-1.png';
import productNav2 from '../../../../public/assets/img/product/product-details-main/nav/product-details-nav-2.png';
import productNav3 from '../../../../public/assets/img/product/product-details-main/nav/product-details-nav-3.png';
import { ProductImage } from '@/types/product.d-t';

const DetailsThumb = () => {
  const [activeTab, setActiveTab] = useState('1');

  const productImages: ProductImage[] = [
    {
      id: '1',
      main: productThumb1,
      thumbnail: productNav1,
      alt: 'Product view 1'
    },
    {
      id: '2',
      main: productThumb2,
      thumbnail: productNav2,
      alt: 'Product view 2'
    },
    {
      id: '3',
      main: productThumb3,
      thumbnail: productNav3,
      alt: 'Product view 3'
    }
  ];

  return (
    <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
      {/* Main Images */}
      <div className="tab-content m-img" id="productDetailsNavContent">
        {productImages.map((image) => (
          <div
            key={`main-${image.id}`}
            className={`tab-pane fade ${activeTab === image.id ? 'show active' : ''}`}
            id={`nav-${image.id}-${image.id}`}
            role="tabpanel"
            aria-labelledby={`nav-${image.id}-tab-${image.id}`}
            tabIndex={0}
          >
            <div className="tp-product-details-nav-main-thumb">
              <Image style={{width:"100%", height:"auto"}} src={image.main} alt={image.alt} className="w-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail Navigation */}
      <nav>
        <div className="nav nav-tab flex-sm-column" id="productDetailsNavThumb" role="tablist">
          {productImages.map((image) => (
            <button
              key={`thumb-${image.id}`}
              className={`nav-links ${activeTab === image.id ? 'active' : ''}`}
              id={`nav-${image.id}-tab-${image.id}`}
              type="button"
              role="tab"
              aria-controls={`nav-${image.id}-${image.id}`}
              aria-selected={activeTab === image.id}
              onClick={() => setActiveTab(image.id)}
            >
              <Image style={{width:"100%", height:"auto"}} src={image.thumbnail} alt={`Thumbnail ${image.id}`} />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DetailsThumb;