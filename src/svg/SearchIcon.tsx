import React from 'react';

interface SearchProps {
    width?: string;
    height?: string;
    strokeColor?:string
}

export const SearchIcon:React.FC<SearchProps> = ({width="20", height="20", strokeColor="#191919"}) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.0004 18.9999L14.6504 14.6499M17.0001 9.00004C17.0001 13.4183 13.4183 17.0001 9.00004 17.0001C4.58174 17.0001 1 13.4183 1 9.00004C1 4.58174 4.58174 1 9.00004 1C13.4183 1 17.0001 4.58174 17.0001 9.00004Z" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
