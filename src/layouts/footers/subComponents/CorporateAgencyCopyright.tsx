import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';
import React from 'react';

const CorporateAgencyCopyright = () => {
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="crp-copyright-text text-center pt-40 pb-50">
                    <p>© {getCurrentYear()} – {getCurrentYear()} | All rights reserved by <Link href="#"><span>Aqlova</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default CorporateAgencyCopyright;