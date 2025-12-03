
"use client";
import PortfolioShowcaseCard from './subComponents/PortfolioShowcaseCard';
import portfolioData from '@/data/portfolioData';

const PortfolioShowcase = () => {
    return (
        <div className="des-portfolio-area">
            <div className="container container-1750">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="showcase-portfolio-wrap pt-130 pb-60">
                            {portfolioData.slice(0, 4).map((item) => (
                                <PortfolioShowcaseCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioShowcase;