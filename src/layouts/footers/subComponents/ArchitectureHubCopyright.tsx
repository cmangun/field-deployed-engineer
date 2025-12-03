import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';
import React from 'react';

const ArchitectureHubCopyright = () => {
    return (
        <div className="ar-copyright-area ar-copyright-ptb" style={{ backgroundColor: "#111214" }}>
            <div className="container container-1430">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="ar-copyright-text text-lg-start text-center">
                            <p>Aqlova ©{getCurrentYear()}. All rights reserved.</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="ar-copyright-social text-center text-lg-end">
                            <Link href="#">Pinterest</Link>
                            <Link href="#">Twitter</Link>
                            <Link href="#">Medium</Link>
                            <Link href="#">Instagram</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureHubCopyright;