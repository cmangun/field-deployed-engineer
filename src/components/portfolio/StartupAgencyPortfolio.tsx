

import StartupPortfolioItemCard from './subComponents/StartupPortfolioItemCard';
import portfolioData from '@/data/portfolioData';
import React from 'react';

const StartupAgencyPortfolio = () => {
  // Group items into rows based on their layout needs
  const row1Items = portfolioData.filter(item => [5, 6].includes(item.id));
  const row2Items = portfolioData.filter(item => [7, 8].includes(item.id));
  const row3Items = portfolioData.filter(item => [9, 10].includes(item.id));

  return (
    <div className="st-portfolio-area st-portfolio-ptb p-relative">
      <div className="container container-1320">
        <div className="row">
          <div className="col-lg-12">
            <div className="st-portfolio-heading text-center mb-200">
              <h3 className="tp-section-title-playfair st-portfolio-title mb-20">
                {`WE 'VE DONE`} <br />
                PERFECT <span>WORKS</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container container-1830">
        <div className="row">
          {row1Items.map(item => (
            <div key={item.id} className={item.colClass}>
              <StartupPortfolioItemCard item={item} />
            </div>
          ))}
        </div>
        <div className="row">
          {row2Items.map(item => (
            <div key={item.id} className={item.colClass}>
              <StartupPortfolioItemCard item={item} />
            </div>
          ))}
        </div>
        <div className="row">
          {row3Items.map(item => (
            <div key={item.id} className={item.colClass}>
              <StartupPortfolioItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupAgencyPortfolio;