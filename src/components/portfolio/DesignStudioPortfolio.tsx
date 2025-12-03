"use client";
import DesignStudioPortfolioCard from './subComponents/DesignStudioPortfolioCard';
import portfolioData from '@/data/portfolioData';

const DesignStudioPortfolio = () => {
  return (
    <div className="des-portfolio-area pb-160">
      <div className="container container-1750">
        <div className="row">
          <div className="col-xl-12">
            <div className="des-portfolio-wrap">
              {portfolioData.slice(0, 4).map((item) => (
                <DesignStudioPortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudioPortfolio;