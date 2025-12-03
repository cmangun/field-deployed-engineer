import agntixImg from "../../../../public/assets/img/home-05/footer/agntix.png"
import { getCurrentYear } from "@/utils/getCurrentYear";
import { BacktoTopArrowFooter } from "@/svg/ArrowIcons";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DesignAgencyCopyright = () => {
    return (
        <div className="design-copyright-area pt-45">
            <div className="container container-1680">
                <div className="row">
                    <div className="col-md-6">
                        <div className="design-copyright-text text-center text-md-start mb-10">
                            <p>© {getCurrentYear()} Agntix, All rights reserved.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="design-copyright-backtoTop text-center smooth  text-md-end smooth mb-10">
                            <Link href="#top">
                                Back to top
                                <span><BacktoTopArrowFooter /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="design-copyright-big-text pt-120">
                <Image style={{ width: "100%", height: "auto" }} src={agntixImg} alt="agntix-image" />
            </div>
        </div>
    );
};

export default DesignAgencyCopyright;