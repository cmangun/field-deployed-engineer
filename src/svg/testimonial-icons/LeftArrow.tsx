import { SvgProps } from '@/types/custom-d-t';
import React from 'react';

export const LeftArrowIcon: React.FC<SvgProps> = ({ width = "12", height = "12", viewBox = "0 0 12 12", strokeWidth="1.5", pathValue="M10.8907 6H0.895874M0.895874 6L5.89327 1M0.895874 6L5.89327 11"}) => {
    return (
        <>
            <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={pathValue} stroke="currentcolor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
