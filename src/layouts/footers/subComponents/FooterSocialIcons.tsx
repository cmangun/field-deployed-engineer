import { DribbleTwo, FacebookSvg, FacebookTwo, InstagramSvg, InstagramTwo, LinkedinSvg, TwitterSvg, TwitterTwo } from '@/svg';
import Link from 'next/link';
import React from 'react';

export const FooterSocialIcons = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <Link href="#">
                <span><FacebookTwo /></span>
            </Link>{" "}
            <Link href="#">
                <span><TwitterTwo /></span>
            </Link>{" "}
            <Link href="#">
                <span><DribbleTwo /></span>
            </Link>{" "}
            <Link href="#">
                <span><InstagramTwo /></span>
            </Link>
        </div>
    );
};
export const FooterSocialIconsTwo = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <Link href="#">
                <span><FacebookSvg /></span>
            </Link>{" "}
            <Link href="#">
                <span><TwitterSvg /></span>
            </Link>{" "}
            <Link href="#">
                <span><LinkedinSvg /></span>
            </Link>{" "}
            <Link href="#">
                <span><InstagramSvg /></span>
            </Link>
        </div>
    );
};

