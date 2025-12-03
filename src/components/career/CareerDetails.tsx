import CareerDetailsSidebar from './subComponents/CareerDetailsSidebar';
import React from 'react';

// Align with left edge of C// logo
const LEFT_ALIGN = '55px';

const CareerDetails = () => {
    return (
        <section className="tp-career-details-ptb pt-20 pb-100" style={{ paddingLeft: LEFT_ALIGN, paddingRight: '20px' }}>
            <div style={{ maxWidth: '1230px' }}>

                {/* Two column content */}
                <div className="row">
                    <div className="col-lg-8" style={{ paddingRight: '100px' }}>
                        <div className="tp-career-details-wrapper pb-40">
                            <div className="tp-career-details-wrap">
                                <p style={{ marginBottom: '16px', fontWeight: 700, fontSize: '20px' }}>Forward-Deployed AI Engineer with 15+ years leading technical transformation across regulated industries.</p>
                                <p style={{ marginBottom: '30px', fontSize: '20px' }}>Specializes in enterprise LLM architectures, AI deployment strategy, and the cross-functional implementation of compliance-ready AI systems. A seasoned contractor who leads by example, builds bridges of trust across domains, and enables reliable, high-stakes delivery.</p>
                                
                                <div className="tp-career-details-info d-flex align-items-center" style={{ gap: '40px', marginBottom: '50px' }}>
                                    <div className="tp-career-details-info-item">
                                        <span style={{ fontSize: '14px', color: '#999', display: 'block', marginBottom: '4px' }}>Experience</span>
                                        <h5 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>15+ Years</h5>
                                    </div>
                                    <div className="tp-career-details-info-item">
                                        <span style={{ fontSize: '14px', color: '#999', display: 'block', marginBottom: '4px' }}>Specialization</span>
                                        <h5 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Regulated Industries</h5>
                                    </div>
                                    <div className="tp-career-details-info-item">
                                        <span style={{ fontSize: '14px', color: '#999', display: 'block', marginBottom: '4px' }}>Availability</span>
                                        <h5 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Contract / FDE Roles</h5>
                                    </div>
                                </div>

                                <h4 className="tp-career-details-title-2">Professional Experience</h4>
                                <div className="tp-career-details-list pb-50">
                                    <h5 style={{marginBottom: '5px', fontWeight: 600}}>Self-Employed Contractor</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Activation Architect / Forward-Deployed Engineer</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>NYC | July 2025 – Present</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Built Salesforce–Shopify integration pipelines and marketing automation infrastructure supporting Love Trust's growth platform.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Authored ID8TION and The Activation Architect (The 5%), advancing structured AI/ML implementation methodologies.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Earned the Stanford AI/ML Healthcare Specialization, strengthening expertise in regulated AI systems.</div>
                                    </div>

                                    <h5 style={{marginTop: '30px', marginBottom: '5px', fontWeight: 600}}>Publicis Groupe / Pfizer Colab</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Production Lead (Forward Deployed Engineering Role)</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>New York, NY | Mar 2024 – July 2025</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Embedded with Pfizer Global Production as part of CEO special projects strike-force pilots, focused on strategic operations.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Led design of an internal AI search assistant using OpenAI + SharePoint, accelerating air-gapped enterprise search via Glean-style semantic indexing.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Production Lead (IC Role) for Pfizer's largest brand initiatives (Abrysvo RSV & Comirnaty vaccines).</div>
                                    </div>

                                    <h5 style={{marginTop: '30px', marginBottom: '5px', fontWeight: 600}}>IPG Health – IPG ProHealth & Area 23</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Director of Production & Delivery</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>New York, NY | Mar 2020 – Mar 2024</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Launched global intranet with single-source knowledge bases for AREA23, FCB Health & ProHealth.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Managed $51M portfolio across Novartis (6 brands) and Sanofi (7 brands).</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Designed solutions for market access and regulatory pathways in HCP engagement.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Directed 60+ cross-disciplinary staff across product, creative, and medical.</div>
                                    </div>

                                    <h5 style={{marginTop: '30px', marginBottom: '5px', fontWeight: 600}}>Abbott Labs – Advanced Analytics & Machine Learning</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Forward-Deployed Engineering (Contract)</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>Chicago, IL | Dec 2018 – Mar 2020</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Deployed data ingestion and ML-readiness pipelines across 30K+ global diagnostics systems; enabled real-time insights for business leaders and downstream LLM-readiness and advanced analytics enablement.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Led agile transformation of global data ecosystem enabling BinaxNOW.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Built production-grade NLP and LLM-readiness pipelines optimizing read round-trip latency by 10×.</div>
                                    </div>

                                    <h5 style={{marginTop: '30px', marginBottom: '5px', fontWeight: 600}}>Boundless Life Science Group (HCB)</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Associate Director, Tech</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>Chicago, IL | Sep 2017 – Oct 2018</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Guided strategy for GI Genius™ AI system for adenoma detection.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Directed launches for 3 pharma brands ($5M portfolio).</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Implemented agile workflows for healthcare teams.</div>
                                    </div>

                                    <h5 style={{marginTop: '30px', marginBottom: '5px', fontWeight: 600}}>Syneos Health GSW / Innovation Lab</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Senior Technical Program Manager</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>NYC | Jan 2015 – Jan 2017</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Developed $12M SOWs and staffing plans for Eli Lilly, Boehringer Ingelheim.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Led launches for Amgen Biosimilars & Repatha; MM&M award-winning Pradaxa TV campaign.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Tech lead Salesforce/Veeva Cloud gatekeeper for Eli Lilly.</div>
                                    </div>

                                    <h5 style={{marginTop: '30px', marginBottom: '5px', fontWeight: 600}}>Self-Employed Contractor</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Software Engineer (SaaS)</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>NYC | Jan 2008 – Jan 2015</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Engineered workflow and application infrastructure for Running Man Post (HBO).</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Designed and deployed systems for MSK Enterprise, AOM Non-Profit, Concentric Health, and Grey Group.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Served as embedded contractor to optimize Pfizer's Salesforce + CLM (Closed-Loop Marketing) integration layers.</div>
                                    </div>

                                    <h5 style={{marginTop: '30px', marginBottom: '5px', fontWeight: 600}}>Naked Heart Foundation</h5>
                                    <p style={{marginBottom: '5px', fontWeight: 500, color: '#333'}}>Project Manager</p>
                                    <p style={{marginBottom: '15px', color: '#666'}}>New York, NY | 2005 – 2008</p>
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Partnered with Natalia Vodianova to launch the Naked Heart Foundation's first global digital platform.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Engineered the international donation system with multi-currency support and full tax-compliant receipts.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Built a secure, scalable website architecture enabling global fundraising and transparent financial reporting.</div>
                                    </div>
                                </div>

                                <h4 className="tp-career-details-title-2">Key Achievements</h4>
                                <div className="tp-career-details-list pb-50">
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Reduced compliant content review cycles by 35% and increased asset reuse 2.3× via Azure ML + SharePoint/Teams RAG system with MLR-aware guardrails at Publicis.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Designed and deployed HIPAA-compliant data plane at Abbott enabling ML for BinaxNOW.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Built first-in-industry MCP RAG platform for pharma data retrieval.</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}>Improved enterprise data retrieval efficiency by 65% through ML pipeline optimization.</div>
                                    </div>
                                </div>

                                <h4 className="tp-career-details-title-2">Technical Skills</h4>
                                <div className="tp-career-details-list pb-20">
                                    <div style={{ borderTop: '1px solid #eee' }}>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}><strong>Cloud:</strong> Azure OpenAI, AWS Bedrock, GCP Vertex AI</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}><strong>LLM Ops:</strong> LangChain, PromptLayer, OpenAI Eval, Weights & Biases</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}><strong>Collaboration Platforms:</strong> SharePoint, Airtable, Zapier, Asana, Salesforce, ServiceNow</div>
                                        <div style={{ padding: '12px 0', borderBottom: '1px solid #eee', fontSize: '15px', color: '#333' }}><strong>Compliance:</strong> Audit-Ready ML, Transparent AI Logging, Security in Deployment</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* Right sidebar - Certifications & Core Competencies */}
                        <div style={{ paddingTop: '290px' }}>
                            <div style={{ marginBottom: '30px', background: '#f8f8f8', borderRadius: '24px', padding: '30px' }}>
                                <h4 className="tp-career-details-title-2">Certifications</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e0e0e0', fontSize: '14px' }}>Stanford AI/ML Healthcare Specialization – Stanford University</li>
                                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e0e0e0', fontSize: '14px' }}>Lean Six Sigma Black Belt – Process Optimization & Quality Engineering</li>
                                    <li style={{ padding: '10px 0', fontSize: '14px' }}>Agile Scrum Master Certified – Agile Alliance</li>
                                </ul>
                            </div>

                            <div style={{ marginBottom: '30px', background: '#f8f8f8', borderRadius: '24px', padding: '30px' }}>
                                <h4 className="tp-career-details-title-2">Core Competencies</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>Enterprise LLM Deployment (ChatGPT Enterprise, Azure Cognitive Search, OpenAI APIs)</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>RAG Architecture Design (Vector DBs: Pinecone, FAISS, Weaviate)</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>MLOps & Model Lifecycle Orchestration (LangChain, Azure OpenAI, Vertex AI)</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>AI Governance, Risk, and Policy Integration (ISO/IEC 42001, HIPAA, GDPR)</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>Technical Leadership & Team Enablement (Agile, Scrum, Matrix Teams)</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>Cross-Sector Alignment (Pharma, Public Health, Education, Government)</li>
                                    <li style={{ padding: '8px 0', fontSize: '13px' }}>Human-Centered AI Systems (UX, Evaluation Harnesses, PromptOps)</li>
                                </ul>
                            </div>

                            <div style={{ background: '#f8f8f8', borderRadius: '24px', padding: '30px' }}>
                                <h4 className="tp-career-details-title-2">Full Stack</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>TypeScript</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>React / Next.js</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>Python</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>MCP</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>GraphRAG</li>
                                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0', fontSize: '13px' }}>Claude Code</li>
                                    <li style={{ padding: '8px 0', fontSize: '13px' }}>Cursor</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer CTA */}
            <div style={{ padding: '0 20px', marginTop: '60px', marginBottom: '20px' }}>
                <CareerDetailsSidebar />
            </div>
        </section>
    );
};

export default CareerDetails;
