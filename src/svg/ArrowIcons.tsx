import { SvgProps } from '@/types/custom-d-t';
import React from 'react';

interface ArrowSvgProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    pathValue?: string;
    color?: string;
    strokeWidth?: number | string;
    className?: string;
}


export const ArrowSvg: React.FC<ArrowSvgProps> = ({ width = "10", height = "10", strokeWidth = "1.5", viewBox = "0 0 10 10", pathValue = "M1 9L9 1M9 1H1M9 1V9" }) => {
    return (
        <>
            <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={pathValue} stroke="currentcolor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};

export const ArrowTwo: React.FC<ArrowSvgProps> = ({ width = "102", height = "9", viewBox = "0 0 102 9", pathValue = "M98 8L101.5 4.5L98 1M1 4H101V5H1V4Z" }) => {
    return (
        <>
            <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={pathValue} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowThree: React.FC<ArrowSvgProps> = () => {
    return (
        <>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowFour: React.FC<ArrowSvgProps> = ({ width = "12", height = "12", viewBox = "0 0 12 12", pathValue = "M1 11L11 1M11 1H1M11 1V11" }) => {
    return (
        <>
            <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={pathValue} stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowFive: React.FC = () => {
    return (
        <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const BottomArrow: React.FC = () => {
    return (
        <>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8267 7.78875V9.76887L7.58239 14.6467H7.34091V12.5579L14.8267 7.78875ZM0 7.78875L7.4858 12.5579V14.6467H7.24432L0 9.76887V7.78875ZM14.8267 0.606934V2.58705L7.58239 7.46489H7.34091V5.37611L14.8267 0.606934ZM0 0.606934L7.4858 5.37611V7.46489H7.24432L0 2.58705V0.606934Z" fill="white" />
            </svg>
        </>
    );
};
export const ArrowSix: React.FC = () => {
    return (
        <>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16L16 2M16 2V16M16 2L2 2" stroke="#17312F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </>
    );
};
export const ArrowSeven: React.FC<SvgProps> = ({ color = "#E9FF48" }) => {
    return (
        <>
            <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M77.4231 0.5H3.57692C1.87846 0.5 0.5 1.87846 0.5 3.57692C0.5 5.27538 1.87846 6.65385 3.57692 6.65385H69.9939L1.40154 75.2477C0.2 76.4492 0.2 78.3969 1.40154 79.5985C2.00308 80.2 2.78923 80.5 3.57692 80.5C4.36462 80.5 5.15231 80.2 5.75231 79.5985L74.3462 11.0046V77.4231C74.3462 79.1215 75.7246 80.5 77.4231 80.5C79.1215 80.5 80.5 79.1215 80.5 77.4231V3.57692C80.5 1.87846 79.1215 0.5 77.4231 0.5Z" fill={color} />
            </svg>
        </>
    );
};
export const ArrowEight: React.FC = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M2.45844 0H1.04844C0.118443 0 -0.351558 1.13 0.308442 1.79L6.03844 7.52C7.67844 9.16 10.3284 9.16 11.9684 7.52L17.6984 1.79C18.3484 1.13 17.8784 0 16.9484 0H15.5384C14.7084 0 13.9084 0.33 13.3184 0.92L9.73844 4.5C9.32844 4.91 8.66844 4.91 8.25844 4.5L4.67844 0.92C4.08844 0.33 3.28844 0 2.45844 0Z" fill="#292D32" />
                <path opacity="0.4" d="M2.45844 19.97H1.04844C0.118443 19.97 -0.351558 18.84 0.308442 18.18L6.03844 12.45C7.67844 10.81 10.3284 10.81 11.9684 12.45L17.6984 18.18C18.3584 18.84 17.8884 19.97 16.9584 19.97H15.5484C14.7184 19.97 13.9184 19.64 13.3284 19.05L9.74844 15.47C9.33844 15.06 8.67844 15.06 8.26844 15.47L4.68844 19.05C4.08844 19.64 3.28844 19.97 2.45844 19.97Z" fill="#292D32" />
            </svg>
        </>
    );
};
export const ArrowNine: React.FC = () => {
    return (
        <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="#21212D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowTen = ({ strokeColor = "#21212D" }) => {
    return (
        <>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L9 1M9 1H1M9 1V9" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowEleven: React.FC = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path d="M14.5303 6.53033C14.8232 6.23744 14.8232 5.76256 14.5303 5.46967L9.75736 0.696699C9.46447 0.403806 8.98959 0.403806 8.6967 0.696699C8.40381 0.989592 8.40381 1.46447 8.6967 1.75736L12.9393 6L8.6967 10.2426C8.40381 10.5355 8.40381 11.0104 8.6967 11.3033C8.98959 11.5962 9.46447 11.5962 9.75736 11.3033L14.5303 6.53033ZM0 6.75H14V5.25H0V6.75Z" fill="currentColor" />
            </svg>
        </>
    );
};
export const ArrowTwelve: React.FC = () => {
    return (
        <>
            <svg width="351" height="8" viewBox="0 0 351 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M350.354 4.35355C350.549 4.15829 350.549 3.84171 350.354 3.64645L347.172 0.464466C346.976 0.269204 346.66 0.269204 346.464 0.464466C346.269 0.659728 346.269 0.976311 346.464 1.17157L349.293 4L346.464 6.82843C346.269 7.02369 346.269 7.34027 346.464 7.53553C346.66 7.7308 346.976 7.7308 347.172 7.53553L350.354 4.35355ZM0 4V4.5H350V4V3.5H0V4Z" fill="currentcolor" />
            </svg>
        </>
    );
};
export const ArrowThirteen: React.FC<SvgProps> = ({ width = "14", height = "14", viewBox = "0 0 14 14", pathValue = "M1 7H13", pathValueTwo = "M7 1L13 7L7 13" }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="none">
                <path d={pathValue} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d={pathValueTwo} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowFourteen: React.FC = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3793 3.0269C14.6433 2.80336 18.8918 1.42595 22 0C20.5735 3.10763 19.1955 7.35556 18.9725 10.6196L16.8278 6.04382L1.05218 21.82C0.936508 21.9354 0.77977 22.0001 0.616396 22C0.494507 22 0.375362 21.9638 0.274025 21.8961C0.172686 21.8284 0.0936985 21.7321 0.0470581 21.6195C0.000415802 21.5069 -0.0117893 21.383 0.0119839 21.2634C0.0357552 21.1439 0.0944386 21.034 0.180614 20.9478L15.9563 5.17221L11.3793 3.0269Z" fill="currentColor" />
            </svg>
        </>
    );
};
export const ArrowFifteen: React.FC = () => {
    return (
        <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 1H13V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowSixteen = ({ width = "73", height = "72", strokeColor = "#453030" }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 73 72" fill="none">
                <path d="M39.7519 0.249535V59.2614L67.5 31.5133L72.4725 36.4858L38.7225 70.2358C38.0628 70.8946 37.1686 71.2646 36.2362 71.2646C35.3039 71.2646 34.4097 70.8946 33.75 70.2358L0 36.4858L4.9725 31.5133L32.7206 59.2614V0.249535H39.7519Z" fill={strokeColor} />
            </svg>
        </>
    );
};
export const ArrowSeventeen: React.FC = () => {
    return (
        <>
            <svg width="205" height="209" viewBox="0 0 205 209" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9992 110.499C79.4994 235.001 90.4995 23.4983 192.778 88.2089" stroke="#CFC292" strokeWidth="1.5" />
                <path d="M191.52 76.8785C188.858 81.4883 190.33 87.3118 194.811 89.8989" stroke="#CFC292" strokeWidth="1.5" strokeMiterlimit="10" />
                <path d="M194.814 89.8969C190.333 87.3098 184.553 88.9466 181.892 93.5563" stroke="#CFC292" strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
        </>
    );
};
export const ArrowEightteen: React.FC = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="21" viewBox="0 0 10 21" fill="none">
                <path d="M4.57574 20.4243C4.81005 20.6586 5.18995 20.6586 5.42426 20.4243L9.24264 16.6059C9.47696 16.3716 9.47696 15.9917 9.24264 15.7574C9.00833 15.523 8.62843 15.523 8.39411 15.7574L5 19.1515L1.60589 15.7574C1.37157 15.523 0.991674 15.523 0.757359 15.7574C0.523045 15.9917 0.523045 16.3716 0.757359 16.6059L4.57574 20.4243ZM4.4 0L4.4 20H5.6L5.6 0L4.4 0Z" fill="currentColor"></path>
            </svg>
        </>
    );
};

export const ArrowNineteen: React.FC = () => {
    return (
        <>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.23804 17.2178L18.2428 8.11173" stroke="#141414" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M8.62744 5.00098C11.1637 8.6231 16.1444 9.50353 19.7634 6.96947" stroke="#141414" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M19.7642 6.96914C16.1452 9.5032 15.2691 14.4847 17.8053 18.1068" stroke="#141414" strokeWidth="2" strokeMiterlimit="10" />
            </svg>
        </>
    );
};
export const ArrowTwenty = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="81" height="9" viewBox="0 0 81 9" fill="none">
                <rect y="4" width="80" height="1" fill="#111013" />
                <path d="M77 7.96366L80.5 4.48183L77 1" stroke="#111013" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};

export const ArrowNextPrevIcon = ({ direction = 'right', strokeColor = 'white' }) => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d={direction === 'right' ? "M1 13L7 7L1 1" : "M7 1L1 7L7 13"}
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const ArrowTwentyOne = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.41379 3.30208C5.97452 3.05821 10.6092 1.55558 14 0C12.4438 3.39014 10.9406 8.02425 10.6973 11.585L8.35796 6.59396L1.14867 13.8038C1.02249 13.9296 0.851498 14.0003 0.673273 14.0001C0.540303 14.0001 0.410328 13.9606 0.299776 13.8867C0.189224 13.8129 0.103059 13.7079 0.0521774 13.585C0.00129604 13.4622 -0.0120192 13.327 0.0139141 13.1966C0.0398474 13.0661 0.103867 12.9463 0.197876 12.8523L7.40747 5.64271L2.41379 3.30208Z" fill="#030303" />
            </svg>
        </>
    );
};
export const ArrowTwentyTwo = ({ direction = "right" }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="101" height="9" viewBox="0 0 101 9" fill="none">
                <rect width="100" height="1" transform="matrix(-1 0 0 1 101 4.01807)" fill="#111013" />
                <path d={direction === "right" ? "M4 7.98173L0.5 4.4999L4 1.01807" : "M97 7.98173L100.5 4.4999L97 1.01807"} stroke="#111013" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowTwentyThree = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="82" height="9" viewBox="0 0 82 9" fill="none">
                <path d="M78 7.95425L81.5 4.47169L78 0.989136M1 3.98977H81V4.98977H1V3.98977Z" stroke="#FF5722" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowTwentyFour = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1V12M6.5 12L12 6.5M6.5 12L1 6.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowTwentyFive = ({ width = "732" }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height="9" viewBox="0 0 732 9" fill="none">
                <path d="M728 7.96512L731.5 4.48256L728 1M1 4H731V5H1V4Z" stroke="#000" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowTwentySix = () => {
    return (
        <>
            <svg width="102" height="9" viewBox="0 0 102 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M98 8L101.5 4.5L98 1M1 4H101V5H1V4Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </>
    );
};
export const ArrowTwentySeven = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="21" viewBox="0 0 15 21" fill="none">
                <rect x="6.25781" width="1.5" height="21" fill="#000" />
                <path d="M14.1641 13.6257C10.28 13.6257 7.13714 16.9239 7.13714 21" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" />
                <path d="M7.13672 21C7.13672 16.9239 3.99384 13.6257 0.109797 13.6257" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
        </>
    );
};
export const ArrowTwentyEight = () => {
    return (
        <>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9.99999H15.2222M8.11121 1.11108L17.0001 9.99997L8.11121 18.8889" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const ArrowTwentyNine = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                <path d="M0.250745 12.3137C0.250745 12.7279 0.586531 13.0637 1.00074 13.0637H7.75074C8.16496 13.0637 8.50074 12.7279 8.50074 12.3137C8.50074 11.8995 8.16496 11.5637 7.75074 11.5637L1.75074 11.5637L1.75074 5.56371C1.75074 5.14949 1.41496 4.81371 1.00074 4.81371C0.586531 4.81371 0.250745 5.14949 0.250745 5.56371V12.3137ZM12.3145 1L11.7841 0.46967L0.470415 11.7834L1.00074 12.3137L1.53107 12.844L12.8448 1.53033L12.3145 1Z" fill="currentColor" />
            </svg>
        </>
    );
};
export const ArrowHeroIcon = ({ direction = "right" }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
                <path d={direction === 'right' ? "M1 21L11 11L1 1" : "M11 21L1 11L11 1"} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};

export const DownArrow = ({ width = "18", height = "18", path = "M1 1L17 17", pathTwo = "M17 1V17H1", }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={path} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d={pathTwo} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
}
export const DownArrowTwo = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.99999 1V19M9.99999 19L1 10M9.99999 19L19 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
}

export const BacktoTopArrowFooter = () => {
    return (
        <>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 19V1M8 1L1 8M8 1L15 8" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const BacktoTopArrow = () => {
    return (
        <>
            <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11 6L6 1L1 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
};



