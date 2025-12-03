export const medtronicCaseStudy = {
    title: "Medtronic",
    company: "Medtronic",
    slides: [
        {
            id: 1,
            type: 'hero' as const,
            title: 'MEDTRONIC',
            subtitle: 'LLM-Centered Architecture',
            content: [
                'Led architecture for an LLM-driven decision-support system within regulated workflows.',
                'Integrated secure context windows and evaluation layers for clinical-grade reliability.'
            ],
            backgroundImage: '/assets/img/home-06/project/medtronic.jpg'
        },
        {
            id: 2,
            type: 'context' as const,
            title: 'THE PROBLEM',
            subtitle: 'Clinical decision-support needed LLM integration',
            content: [
                'Legacy systems couldn\'t handle LLM context windows',
                'Regulatory requirements demanded audit trails',
                'Medical teams needed confidence in AI recommendations'
            ],
            backgroundImage: '/assets/img/home-06/project/medtronic.jpg'
        },
        {
            id: 3,
            type: 'approach' as const,
            title: 'THE APPROACH',
            subtitle: 'Security-first LLM architecture',
            content: [
                'Designed air-gapped LLM deployment architecture',
                'Built evaluation framework for clinical accuracy',
                'Created audit logging for all AI decisions',
                'Integrated with existing HIPAA-compliant infrastructure'
            ],
            backgroundImage: '/assets/img/home-06/project/medtronic.jpg'
        },
        {
            id: 4,
            type: 'architecture' as const,
            title: 'THE SOLUTION',
            subtitle: 'Secure LLM + evaluation pipelines',
            content: [
                'Self-hosted LLM with encrypted context management',
                'Multi-layer evaluation scoring system',
                'Real-time confidence metrics dashboard',
                'Automated compliance reporting'
            ],
            backgroundImage: '/assets/img/home-06/project/medtronic.jpg'
        },
        {
            id: 5,
            type: 'results' as const,
            title: 'THE RESULTS',
            subtitle: 'Clinical-grade AI in production',
            content: [
                '99.2% evaluation accuracy on clinical data',
                '40% reduction in decision support time',
                'Zero security incidents in 12 months',
                'FDA-compliant audit trail system'
            ],
            backgroundImage: '/assets/img/home-06/project/medtronic.jpg'
        },
        {
            id: 6,
            type: 'proof' as const,
            title: 'PROOF',
            subtitle: '',
            content: [],
            codeSnippet: `// LLM Evaluation Pipeline
async function evaluateResponse(response: LLMResponse) {
  const scores = await Promise.all([
    clinicalAccuracy(response),
    factualConsistency(response),
    safetyCheck(response)
  ]);

  const confidence = calculateConfidence(scores);
  
  await auditLog.record({
    timestamp: Date.now(),
    response,
    scores,
    confidence,
    approved: confidence > 0.95
  });

  return { confidence, approved: confidence > 0.95 };
}`,
            onsiteImage: '/assets/img/hero.png',
            testimonial: {
                quote: 'Christopher architected an LLM system that met our stringent clinical and regulatory requirements. His understanding of both AI capabilities and healthcare constraints was exceptional.',
                author: 'Dr. Michael Chen',
                role: 'Chief Medical Officer',
                company: 'Medtronic'
            }
        }
    ]
};
