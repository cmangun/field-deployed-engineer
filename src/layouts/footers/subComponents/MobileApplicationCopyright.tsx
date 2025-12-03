import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';
import React from 'react';

const MobileApplicationCopyright = () => {
    return (
        <div className="tp-copyright-app-area tp-copyright-2-border app-copyright-border">
            <div className="container container-1430">
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="app-copyright-text text-center z-index-1">
                            <p>© {getCurrentYear()} Copyrights by Agntix Co. All Rights Reserved. Developed by <Link href="#">Aqlova</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default MobileApplicationCopyright;