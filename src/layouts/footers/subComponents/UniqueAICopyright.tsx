import shape from '../../../../public/assets/img/home-07/shape/shape-7.png';
import logo from '../../../../public/assets/img/logo/logo-white.png';
import { getCurrentYear } from '@/utils/getCurrentYear';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UniqueAICopyright = () => {
    return (
        <div className="ai-copyright-area ai-copyright-ptb p-relative" style={{ backgroundColor: "#08041D" }}>
            <div className="ai-copyright-shape-1">
                <Image src={shape} alt="shape" />
            </div>
            <div className="container container-1230">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="ai-copyright-logo text-center text-md-start">
                            <Link href="/"><Image width={120} src={logo} alt="logo" /></Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="ai-copyright-content text-center text-md-end">
                            <p>Aqlova © {getCurrentYear()}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueAICopyright;