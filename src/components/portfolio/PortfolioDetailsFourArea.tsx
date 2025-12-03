import { ArrowSvg } from '@/svg';
import Link from 'next/link';
import React from 'react';

const PortfolioDetailsFourArea = () => {
  const infoItems = [
    { label: "Client", value: "Envato Market" },
    { label: "Expertise", value: "UX, UI Design, Development" },
    { label: "Duration", value: "1 July 2025" },
    { label: "Designer", value: "Aqlova" },
  ];

  return (
    <div id="top" className="tp-pd-4-ptb">
      <div className="container container-1630">
        <div className="row">
          <div className="col-lg-12">
            {/* Title */}
            <div className="tp-pd-4-heading mb-90 tp_fade_anim" data-delay=".3">
              <h3 className="tp-pd-4-title">simple logistics</h3>
            </div>

            {/* Info Items & Button */}
            <div
              className="tp-pd-4-heading-bottom d-flex justify-content-between tp_fade_anim flex-wrap"
              data-delay=".5"
            >
              {infoItems.map((item, idx) => (
                <div className="tp-pd-2-bottom-item mb-30" key={idx}>
                  <span>{item.label}</span>
                  <h6>{item.value}</h6>
                </div>
              ))}

              {/* Visit Site Button */}
              <div className="tp-pd-4-bottom-btn mb-30">
                <Link
                  href="#"
                  className="tp-portfolio-details-btn d-flex align-items-center gap-2"
                >
                  Visit Site
                  <ArrowSvg strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailsFourArea;
