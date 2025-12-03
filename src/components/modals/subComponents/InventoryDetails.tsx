import React from 'react';

const InventoryDetails = () => {
    return (
        <>
            <div className="tp-product-details-inventory d-flex align-items-center mb-10">
                <div className="tp-product-details-stock mb-10">
                    <span>In Stock</span>
                </div>
                <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
                    <div className="tp-product-details-rating">
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                        <span><i className="fa-solid fa-star"></i></span>
                    </div>
                    <div className="tp-product-details-reviews">
                        <span>(36 Reviews)</span>
                    </div>
                </div>
            </div>
            <div className="tp-product-details-sort-desc">
                <p>A Screen Everyone Will Love: Whether your family is streaming or <br /> video chatting with friends tablet A8... <span>See more</span></p>
            </div>
        </>
    );
};

export default InventoryDetails;