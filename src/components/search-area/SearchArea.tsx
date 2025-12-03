import useGlobalContext from '@/hooks/useContext';
import {CrossIconThree, SearchIcon } from '@/svg';
import React from 'react';

const SearchArea = () => {
    const { openSearch, toggleSearch } = useGlobalContext();
    return (
        <>
            <div className={`tp-search-area p-relative search-white ${openSearch ? "opened" : ""}`}>
                <div className="tp-search-close">
                    <button onClick={toggleSearch} className="tp-search-close-btn">
                        <CrossIconThree />
                    </button>
                </div>
                <div className="container container-1230">
                    <div className="row">
                        <div className="tp-search-wrapper">
                            <div className="col-lg-8">
                                <div className="tp-search-content">
                                    <div className="search p-relative">
                                        <input type="text" className="search-input" placeholder="Search" />
                                        <button className="tp-search-icon">
                                            <SearchIcon strokeColor="#191919" width='24' height='24' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={toggleSearch} className={`body-overlay ${openSearch ? "opened" : ""}`}></div>
        </>
    );
};

export default SearchArea;