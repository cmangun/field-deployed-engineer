import { CartAddsIcon, CartMinusIcon, CompareIcon, QuestionIcon, WishlistIcon } from '@/svg/ProductIcons';
import InventoryDetails from './subComponents/InventoryDetails';
import ColorVariations from './subComponents/ColorVariations';
import DetailsThumb from './subComponents/DetailsThumb';
import React, { useState } from 'react';

const ProductQuickViewModal = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        } else if (e.target.value === '') {
            setQuantity(1);
        }
    };

    return (
        <div className="modal fade tp-product-modal" id="producQuickViewModal" tabIndex={-1} aria-labelledby="producQuickViewModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="tp-product-modal-content d-lg-flex">
                        <button type="button" className="tp-product-modal-close-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                            <i className="fa-regular fa-xmark"></i>
                        </button>
                        
                        {/* details thumbs */}
                        <DetailsThumb />

                        <div className="tp-product-details-wrapper">
                            <div className="tp-product-details-category">
                                <span>Tablets</span>
                            </div>
                            <h3 className="tp-product-details-title">Designer Glass Table</h3>

                            {/* -- inventory details -- */}
                            <InventoryDetails />

                            {/* -- price -- */}
                            <div className="tp-product-details-price-wrapper mb-20">
                                <span className="tp-product-details-price old-price">$320.00</span>{" "}
                                <span className="tp-product-details-price new-price">$236.00</span>
                            </div>

                            {/* -- variations -- */}
                            <div className="tp-product-details-variation">
                                <ColorVariations />
                            </div>

                            {/* -- actions -- */}
                            <div className="tp-product-details-action-wrapper">
                                <h3 className="tp-product-details-action-title">Quantity</h3>
                                <div className="tp-product-details-action-item-wrapper d-flex align-items-center">
                                    <div className="tp-product-details-quantity">
                                        <div className="tp-product-quantity mb-15 mr-15">
                                            <span 
                                                className="tp-cart-minus" 
                                                onClick={handleDecrement}
                                                role="button"
                                                aria-label="Decrease quantity"
                                            >
                                               <CartMinusIcon/>
                                            </span>
                                            <input 
                                                className="tp-cart-input" 
                                                type="text" 
                                                min="1"
                                                value={quantity}
                                                onChange={handleInputChange}
                                                aria-label="Product quantity"
                                            />
                                            <span 
                                                className="tp-cart-plus" 
                                                onClick={handleIncrement}
                                                role="button"
                                                aria-label="Increase quantity"
                                            >
                                              <CartAddsIcon/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="tp-product-details-add-to-cart mb-15 w-100">
                                        <button className="tp-product-details-add-to-cart-btn w-100">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                                <button className="tp-product-details-buy-now-btn w-100">
                                    Buy Now
                                </button>
                            </div>
                            <div className="tp-product-details-action-sm">
                                <button type="button" className="tp-product-details-action-sm-btn">
                                    <CompareIcon />{" "}
                                    Compare
                                </button>
                                <button type="button" className="tp-product-details-action-sm-btn">
                                    <WishlistIcon />{" "}
                                    Add Wishlist
                                </button>
                                <button type="button" className="tp-product-details-action-sm-btn">
                                    <QuestionIcon />{" "}
                                    Ask a question
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default ProductQuickViewModal;