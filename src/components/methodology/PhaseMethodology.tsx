import { ArrowSvg, ButtonBlurFilter } from '@/svg';
import phasesData from '@/data/phaseData';
import Image from 'next/image';
import Link from "next/link";
import React from 'react';

const PhaseMethodology = () => {

  return (
    <div id="down" className="tp-service-area pt-120" style={{ backgroundColor: '#F6F6F9' }}>
      <div className="container-fluid p-0">
        <div className="row gx-0">
          <div className="col-12">
            <div className="tp-service-title-box" style={{ marginBottom: '60px' }}>
              <h3 className="tp-section-title-clash mb-40 tp-text-revel-anim">Four Phase Method</h3>
              <p style={{ fontSize: '18px', maxWidth: '1000px', lineHeight: '1.7', color: '#0E0F11', marginLeft: '40px' }}>
                AI delivery fails when organizations skip the fundamentals. The four phases create the discipline to move from ambiguity to architecture, from architecture to safe execution, and from execution to sustainable ownership.
              </p>
            </div>
          </div>
        </div>
        <div className="tp-service-pin">
          {phasesData.map((phase) => {
            return (
              <div key={phase.id} className="tp-service-item tp-service-panel">
                <div className="row">
                  <div className="col-xxl-3 col-xl-2 col-lg-1 col-md-1">
                    <div className="tp-service-number">
                      <span>0{phase.id}.</span>
                    </div>
                  </div>
                  <div className="col-xxl-9 col-xl-10 col-lg-11 col-md-11">
                    <div className="tp-service-content">
                      <h4 className="tp-section-title">
                        <span className="tp_text_invert">
                          {phase.title}
                        </span>
                      </h4>
                      <p style={{ fontStyle: 'italic', fontSize: '20px', marginBottom: '20px', opacity: 0.85 }}>
                        {phase.tagline}
                      </p>
                      <p style={{ marginBottom: '30px' }}>
                        This phase answers: <strong>{phase.question}</strong>
                      </p>
                      
                      <h5 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>The 4 Gating Artifacts</h5>
                      
                      <ol style={{ paddingLeft: '20px', marginBottom: '30px' }}>
                        {phase.artifacts.map((artifact, index) => (
                          <li key={index} style={{ marginBottom: '10px', fontSize: '17px' }}>
                            <strong>{artifact}</strong>
                          </li>
                        ))}
                      </ol>

                      <div style={{ marginBottom: '20px' }}>
                        <h5 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Gate Condition:</h5>
                        <p style={{ fontSize: '16px', opacity: 0.9 }}>{phase.gateCondition}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default PhaseMethodology;