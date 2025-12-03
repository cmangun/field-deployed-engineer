import { productData } from '@/data/productData';
import useGlobalContext from '@/hooks/useContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CartOffcanvas = () => {
    const { openCartOffcanvas, toggleCartOffcanvas } = useGlobalContext();
    const displayProduct = productData.slice(16, 19);
    const subtotal = displayProduct.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <div className={`cartmini__area ${openCartOffcanvas ? "cartmini-opened" : ""}`}>
                <div className="cartmini__wrapper d-flex justify-content-between flex-column">
                    <div className="cartmini__top-wrapper">
                        <div className="cartmini__top p-relative">
                            <div className="cartmini__top-title">
                                <h4>Shopping cart</h4>
                            </div>
                            <div className="cartmini__close">
                                <button onClick={toggleCartOffcanvas} type="button" className="cartmini__close-btn cartmini-close-btn">
                                    <i className="fal fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div className="cartmini__shipping">
                            <p>Free Shipping for all orders over <span>$50</span></p>
                            <div className="progress">
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                    role="progressbar"
                                    style={{ width: '70%' }}
                                    aria-valuenow={70}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                ></div>
                            </div>
                        </div>

                        <div className="cartmini__widget">
                            {displayProduct.map((item) => (
                                <div className="cartmini__widget-item" key={item.id}>
                                    <div className="cartmini__thumb">
                                        <Link href={item.link}>
                                            <Image src={item.image} alt={item.title} />
                                        </Link>
                                    </div>
                                    <div className="cartmini__content">
                                        <h5 className="cartmini__title">
                                            <Link href={item.link}>{item.title}</Link>
                                        </h5>
                                        <div className="cartmini__price-wrapper">
                                            <span className="cartmini__price">${item.price.toFixed(2)}</span>
                                            <span className="cartmini__quantity">x{item.quantity}</span>
                                        </div>
                                    </div>
                                    <Link href="#" className="cartmini__del">
                                        <i className="fa-regular fa-xmark"></i>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cartmini__checkout">
                        <div className="cartmini__checkout-title mb-30">
                            <h4>Subtotal:</h4>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cartmini__checkout-btn">
                            <Link href="/cart" className="tp-btn-white-border coffee-bg text-center mb-10 w-100">
                                View Cart
                            </Link>
                            <Link href="/checkout" className="tp-btn-white-border coffee-bg border-none text-center w-100">
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={toggleCartOffcanvas} className={`body-overlay ${openCartOffcanvas ? "opened" : ""}`}></div>
        </>
    );
};

export default CartOffcanvas;