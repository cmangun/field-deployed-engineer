import React from 'react';
interface LinkedinSvgProps {
  width?: string | number;
  height?: string | number;
  color?: string; 
}

export const LinkedinSvg: React.FC<LinkedinSvgProps> = ({ 
  width = "14", 
  height = "14",
  color = "currentColor" 
}) => {

    return (
        <>
            <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.8001 4.2002C10.914 4.2002 11.9823 4.64269 12.7699 5.43035C13.5576 6.218 14.0001 7.28629 14.0001 8.4002V13.3002H11.2001V8.4002C11.2001 8.02889 11.0526 7.6728 10.79 7.41025C10.5275 7.1477 10.1714 7.0002 9.8001 7.0002C9.42879 7.0002 9.0727 7.1477 8.81015 7.41025C8.5476 7.6728 8.4001 8.02889 8.4001 8.4002V13.3002H5.6001V8.4002C5.6001 7.28629 6.0426 6.218 6.83025 5.43035C7.6179 4.64269 8.68619 4.2002 9.8001 4.2002Z" fill={color} />
                <path d="M2.8 4.89941H0V13.2994H2.8V4.89941Z" fill={color} />
                <path d="M1.4 2.8C2.1732 2.8 2.8 2.1732 2.8 1.4C2.8 0.626801 2.1732 0 1.4 0C0.626801 0 0 0.626801 0 1.4C0 2.1732 0.626801 2.8 1.4 2.8Z" fill={color} />
            </svg>
        </>
    );
};

