import React from 'react';

interface EmailThreeProps {
    colorName?: string;
    strokeWidth?: string;
}

export const EmailIconOne= () => {
    return (
        <>
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 14.6H5C2.6 14.6 1 13.4 1 10.6V5C1 2.2 2.6 1 5 1H13C15.4 1 17 2.2 17 5V10.6C17 13.4 15.4 14.6 13 14.6Z" stroke="currentcolor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 5.40039L10.496 7.40039C9.672 8.05639 8.32 8.05639 7.496 7.40039L5 5.40039" stroke="currentcolor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};

export const EmailIconTwo= () => {
    return (
        <>
            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2.5C16 1.675 15.325 1 14.5 1H2.5C1.675 1 1 1.675 1 2.5M16 2.5V11.5C16 12.325 15.325 13 14.5 13H2.5C1.675 13 1 12.325 1 11.5V2.5M16 2.5L8.5 7.74998L1 2.5" stroke="#A1A4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const EmailIconThree: React.FC<EmailThreeProps> = ({ colorName = "white", strokeWidth = "2" }) => {
    return (
        <>
            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2.5C16 1.675 15.325 1 14.5 1H2.5C1.675 1 1 1.675 1 2.5M16 2.5V11.5C16 12.325 15.325 13 14.5 13H2.5C1.675 13 1 12.325 1 11.5V2.5M16 2.5L8.5 7.75L1 2.5" stroke={colorName} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const EmailIconFour= () => {
    return (
        <>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 2.75C18.5 1.7875 17.7125 1 16.75 1H2.75C1.7875 1 1 1.7875 1 2.75M18.5 2.75V13.25C18.5 14.2125 17.7125 15 16.75 15H2.75C1.7875 15 1 14.2125 1 13.25V2.75M18.5 2.75L9.75 8.875L1 2.75" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};
export const EmailIconFive= () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
                <path d="M2.58672 1H14.593C15.4184 1 16.0938 1.675 16.0938 2.5V11.5C16.0938 12.325 15.4184 13 14.593 13H2.58672C1.76129 13 1.08594 12.325 1.08594 11.5V2.5C1.08594 1.675 1.76129 1 2.58672 1Z" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.0938 2.5L8.58984 7.75L1.08594 2.5" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
};

export const SendEmailIcon = () => {
    return (
        <>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.4918 0.523919C17.0417 0.0609703 16.3754 -0.110257 15.7541 0.0709359L1.2672 4.28277C0.611729 4.46578 0.147138 4.98852 0.0219872 5.65169C-0.105865 6.32754 0.340718 7.18639 0.924156 7.54515L5.45391 10.3283C5.9185 10.6146 6.51815 10.543 6.9026 10.1552L12.0896 4.93597C12.3507 4.66328 12.7829 4.66328 13.044 4.93597C13.3051 5.1978 13.3051 5.62451 13.044 5.8963L7.84799 11.1156C7.46263 11.5033 7.3906 12.1049 7.67422 12.5733L10.442 17.1484C10.7661 17.6911 11.3243 18 11.9366 18C12.0086 18 12.0896 18 12.1617 17.99C12.8639 17.9003 13.4222 17.4193 13.6293 16.7398L17.924 2.27243C18.1131 1.65638 17.942 0.985961 17.4918 0.523919Z" fill="currentcolor" />
                <path opacity="0.4" d="M6.7091 15.5302C6.97201 15.7957 6.97201 16.226 6.7091 16.4915L5.47919 17.7281C5.34774 17.8613 5.17487 17.9274 5.002 17.9274C4.82913 17.9274 4.65626 17.8613 4.5248 17.7281C4.261 17.4627 4.261 17.0332 4.5248 16.7678L5.75381 15.5302C6.01761 15.2657 6.44529 15.2657 6.7091 15.5302ZM6.00348 12.0984C6.26639 12.3639 6.26639 12.7942 6.00348 13.0597L4.77358 14.2963C4.64212 14.4295 4.46925 14.4956 4.29638 14.4956C4.12351 14.4956 3.95064 14.4295 3.81919 14.2963C3.55538 14.0309 3.55538 13.6014 3.81919 13.336L5.04819 12.0984C5.312 11.8339 5.73967 11.8339 6.00348 12.0984ZM2.61701 11.0182C2.87992 11.2836 2.87992 11.714 2.61701 11.9794L1.38711 13.216C1.25566 13.3492 1.08279 13.4154 0.909915 13.4154C0.737044 13.4154 0.564173 13.3492 0.432719 13.216C0.168911 12.9506 0.168911 12.5212 0.432719 12.2557L1.66172 11.0182C1.92553 10.7536 2.35321 10.7536 2.61701 11.0182Z" fill="currentcolor" />
            </svg>
        </>
    );
};
