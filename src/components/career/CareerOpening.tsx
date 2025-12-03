import { ArrowSvg, ButtonBlurFilter } from '@/svg';
import { ArrowTwenty } from '@/svg/ArrowIcons';
import Link from 'next/link';
import React from 'react';

interface JobOpening {
  title: string;
  openRoles: string;
  type: string;
  filterId: string;
}

const CareerOpening = () => {
  const jobOpenings: JobOpening[] = [
    {
      title: 'UI/UX Designer',
      openRoles: '(02 Open Roles)',
      type: 'Full-Time',
      filterId: 'buttonFilter'
    },
    {
      title: 'Frontend Developer',
      openRoles: '(01 Open Roles)',
      type: 'Remote',
      filterId: 'buttonFilter2'
    },
    {
      title: 'Product Manager',
      openRoles: '(03 Open Roles)',
      type: 'Full-Time',
      filterId: 'buttonFilter3'
    },
    {
      title: 'JavaScript Engineer',
      openRoles: '(01 Open Roles)',
      type: 'Remote',
      filterId: 'buttonFilter4'
    },
    {
      title: 'Joomla Developer',
      openRoles: '(02 Open Roles)',
      type: 'Full-Time',
      filterId: 'buttonFilter5'
    }
  ];

  const ApplyButton = ({ filterId }: { filterId: string }) => (
    <Link href="/career-details-light" className="tp-btn-black btn-red-bg">
      <span className="tp-btn-black-filter-blur">
        <ButtonBlurFilter filterId={filterId} />
      </span>
      <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: `url(#${filterId})` }}>
        <span className="tp-btn-black-text">Apply Now</span>
        <span className="tp-btn-black-circle">
          <ArrowSvg />
        </span>
      </span>
    </Link>
  );

  return (
    <section className="tp-career-opening-ptb pb-160">
      <div className="container container-1230">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-benefit-heading mb-100">
              <div className="ar-about-us-4-title-box tp_fade_anim d-flex align-items-center mb-15">
                <span className="tp-section-subtitle pre">Benefit</span>
                <div className="ar-about-us-4-icon">
                  <ArrowTwenty />
                </div>
              </div>
              <h3 className="tp-section-title lts tp_fade_anim">Current Openings</h3>
            </div>
          </div>
        </div>
        
        {/* Table Headers */}
        <div className="tp-career-opening-item">
          <div className="row">
            <div className="col-lg-4">
              <div className="tp-career-opening-heading">
                <span>Position</span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tp-career-opening-heading">
                <span>Roles</span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tp-career-opening-heading">
                <span>Type</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        {jobOpenings.map((job, index) => (
          <div key={index} className="tp-career-opening-item ptb">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="tp-career-opening-title">
                  <h4 className="tp-career-opening-title-name">{job.title}</h4>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-career-opening-role">
                  <span>{job.openRoles}</span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-career-opening-Type d-flex justify-content-between align-items-center">
                  <span>{job.type}</span>
                  <div className="tp-career-opening-btn">
                    <ApplyButton filterId={job.filterId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerOpening;