import { SvgProps } from '@/types/custom-d-t';
import React from 'react';

export const RightArrowIcon:React.FC<SvgProps> = ({width="12", height="12", strokeWidth="1.5", viewBox = "0 0 12 12", pathValue="M0.87085 6H10.8656M10.8656 6L5.86825 1M10.8656 6L5.86825 11"}) => {
    return (
        <>
            <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={pathValue} stroke="currentcolor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};