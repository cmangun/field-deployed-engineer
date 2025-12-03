import FashionPortfolioItemCard from './subComponents/FashionPortfolioItemCard';
import { ArrowSeventeen, ArrowThirteen } from '@/svg';
import portfolioData from '@/data/portfolioData';
import Link from 'next/link';
import React from 'react';

const FashionStudioPortfolio = () => {

  // Group items into rows based on their layout needs
  const row1Items = portfolioData.filter(item => [11, 12].includes(item.id));
  const row2Items = portfolioData.filter(item => [13, 14].includes(item.id));
  const row3Items = portfolioData.filter(item => [15, 16].includes(item.id));

  return (
    <div className="tp-project-5-2-area pt-120 pb-130 z-index-1">
      <div className="container container-1800">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-project-5-2-title-box mb-170 text-center">
              <h4 className="tp-project-5-2-title">Portfolio</h4>
            </div>
          </div>
        </div>

        <div className="tp-project-5-2-wrap z-index-1">
          <div className="tp-project-5-2-item-wrap">
            <div className="row align-items-center justify-content-between">
              {row1Items.map(item => (
                <div key={item.id} className={item.colClass}>
                  <FashionPortfolioItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="tp-project-5-2-item-wrap">
            <div className="row align-items-center justify-content-between">
              {row2Items.map(item => (
                <div key={item.id} className={item.colClass}>
                  <FashionPortfolioItemCard item={item}/>
                </div>
              ))}
            </div>
          </div>
          <div className="tp-project-5-2-item-wrap">
            <div className="row align-items-center justify-content-between">
              {row3Items.map(item => (
                <div key={item.id} className={item.colClass}>
                  <FashionPortfolioItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="tp-project-5-2-btn text-center p-relative">
              <div className="tp-project-5-2-shape d-none d-lg-block">
                <span><ArrowSeventeen /></span>
              </div>
              <Link href="/portfolio-col-3-light">
                SEE MORE PROJECTS
                <span>
                  <ArrowThirteen pathValue='M1 13L13 1' pathValueTwo='M1 1H13V13' />
                  <ArrowThirteen pathValue='M1 13L13 1' pathValueTwo='M1 1H13V13' />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionStudioPortfolio;