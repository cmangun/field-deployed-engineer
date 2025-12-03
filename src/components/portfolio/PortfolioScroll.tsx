"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import img1 from "../../../public/assets/img/interactive-img/port-1.jpg";
import img2 from "../../../public/assets/img/interactive-img/port-2.jpg";
import img3 from "../../../public/assets/img/interactive-img/port-3.jpg";
import img4 from "../../../public/assets/img/interactive-img/port-4.jpg";
import img5 from "../../../public/assets/img/interactive-img/port-5.jpg";
import img6 from "../../../public/assets/img/interactive-img/port-6.jpg";

const portfolioItems = [
  { id: "tp-port-1", img: img1, title: "Milo", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-2", img: img2, title: "FASTWIRE", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-3", img: img3, title: "MEDIABION", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-4", img: img4, title: "Spruce", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-5", img: img5, title: "PSDMockup", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-6", img: img6, title: "JQ Wine", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-7", img: img4, title: "Diseño", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-8", img: img5, title: "Photoshoot", link: "/portfolio-details-gallery-light" },
  { id: "tp-port-9", img: img6, title: "Gráfico", link: "/portfolio-details-gallery-light" },
];

const PortfolioScroll = () => {
  const defaultId = portfolioItems[0].id;
  const [activeId, setActiveId] = React.useState<string>(defaultId);

  function handleActive(id: string) {
    setActiveId(id);
  }

  function handleDeactive() {
    setActiveId(defaultId);
  }

  return (
    <main>
      {/* -- portfolio area start -- */}
      <div className="tp-port-slider-area">
        <div className="tp-port-slider-main p-relative">
          {/* Thumbnails */}
          <div
            id="tp-port-slider-wrap"
            className={activeId}
          >
            {portfolioItems.map((item) => (
              <div key={item.id} className={`tp-port-slider-thumb ${item.id}`}>
                <Image src={item.img} alt={item.title} />
              </div>
            ))}
          </div>

          {/* Titles */}
          <div className="tp-port-slider-content-wrap z-index-5">
            <div className="tp-port-slider-content">
              {portfolioItems.map((item) => (
                <h4
                  key={item.id}
                  className={`tp-port-slider-title ${activeId === item.id ? "active" : ""
                    }`}
                  rel={item.id}
                  onMouseEnter={() => handleActive(item.id)}
                  onMouseLeave={handleDeactive}
                >
                  <Link href={item.link}>{item.title}</Link>
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* -- portfolio area end -- */}
    </main>
  );
};

export default PortfolioScroll;
