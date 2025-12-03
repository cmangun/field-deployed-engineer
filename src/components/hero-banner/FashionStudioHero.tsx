import React from 'react';

const FashionStudioHero = () => {
    const credentialStyle: React.CSSProperties = {
        fontSize: '12px',
        lineHeight: '1.4',
        marginBottom: '2px',
        color: '#FFFFFF'
    };

    return (
        <section style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '50px 50px 30px 50px',
            alignItems: 'flex-start',
            backgroundImage: 'url(/assets/img/water.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div style={{ textAlign: 'left' }}>
                <h1 style={{
                    color: '#FFFFFF', 
                    fontSize: '100px', 
                    fontWeight: '700', 
                    lineHeight: '1', 
                    marginBottom: '10px',
                    fontFamily: 'var(--tp-ff-heading)',
                    textAlign: 'left'
                }}>
                    Christopher<br/>Mangun
                </h1>
            </div>
            
            <div style={{ textAlign: 'left' }}>
                <p style={{ textAlign: 'left', color: '#FFFFFF', fontSize: '23px', fontWeight: '600', marginBottom: '15px' }}>Forward Deployed Engineer | Healthcare & Life Sciences</p>
                <div>
                    <span style={credentialStyle}>Full stack TypeScript, React/Next.js, Python, MCP, GraphRAG</span><br/>
                    <span style={credentialStyle}>Stanford AI/ML Healthcare Specialization</span><br/>
                    <span style={credentialStyle}>Certified Scrum Master</span><br/>
                    <span style={credentialStyle}>Six Sigma Blackbelt</span><br/>
                    <a href="mailto:cmangun@gmail.com" style={{ fontSize: '12px', lineHeight: '1.4', color: '#FFFFFF', textDecoration: 'none', marginTop: '10px', display: 'inline-block' }}>cmangun@gmail.com</a>
                </div>
            </div>
        </section>
    );
};

export default FashionStudioHero;
