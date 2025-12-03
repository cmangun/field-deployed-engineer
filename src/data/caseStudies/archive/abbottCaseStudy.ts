export const abbottCaseStudy = {
    title: "Abbott Labs",
    company: "Abbott Laboratories",
    slides: [
        {
            id: 1,
            type: 'hero' as const,
            title: 'ABBOTT LABS',
            subtitle: 'Responsible AI & Governance',
            content: [
                'Engineered HIPAA-compliant data planes and audit-ready ML pipelines for global diagnostics.',
                'Achieved zero audit findings and established governance frameworks for LLM readiness.'
            ],
            backgroundImage: '/assets/img/home-06/project/abbott.jpg'
        },
        {
            id: 2,
            type: 'context' as const,
            title: 'THE PROBLEM',
            subtitle: 'AI governance gap in regulated environment',
            content: [
                'No framework for LLM governance in diagnostics',
                'Data privacy requirements blocking innovation',
                'Audit readiness needed for global operations'
            ],
            backgroundImage: '/assets/img/home-06/project/abbott.jpg'
        },
        {
            id: 3,
            type: 'approach' as const,
            title: 'THE APPROACH',
            subtitle: 'Governance-first AI infrastructure',
            content: [
                'Built HIPAA-compliant data isolation layer',
                'Created LLM governance framework and policies',
                'Designed audit-ready ML pipeline architecture',
                'Established cross-functional AI ethics board'
            ],
            backgroundImage: '/assets/img/home-06/project/abbott.jpg'
        },
        {
            id: 4,
            type: 'architecture' as const,
            title: 'THE SOLUTION',
            subtitle: 'Compliant ML + governance infrastructure',
            content: [
                'End-to-end encrypted data pipelines',
                'Automated compliance checking system',
                'Real-time audit trail generation',
                'Policy-as-code governance framework'
            ],
            backgroundImage: '/assets/img/home-06/project/abbott.jpg'
        },
        {
            id: 5,
            type: 'results' as const,
            title: 'THE RESULTS',
            subtitle: 'Zero findings, LLM-ready infrastructure',
            content: [
                'Zero audit findings across 3 regulatory reviews',
                'HIPAA-compliant ML pipeline in production',
                'Governance framework adopted by 5 business units',
                'LLM infrastructure ready for deployment'
            ],
            backgroundImage: '/assets/img/home-06/project/abbott.jpg'
        },
        {
            id: 6,
            type: 'proof' as const,
            title: 'PROOF',
            subtitle: '',
            content: [],
            codeSnippet: `// HIPAA-Compliant Data Pipeline
async function processPatientData(data: PHI) {
  // Encrypt at rest and in transit
  const encrypted = await encrypt(data, HIPAA_KEY);
  
  // Audit every access
  await auditLog.record({
    action: 'DATA_PROCESS',
    user: getCurrentUser(),
    dataId: encrypted.id,
    timestamp: Date.now(),
    compliance: 'HIPAA'
  });

  // Run through governance checks
  const approved = await governanceCheck(encrypted);
  
  return approved ? encrypted : null;
}`,
            onsiteImage: '/assets/img/hero.png',
            testimonial: {
                quote: 'Christopher built a governance infrastructure that gave us confidence to pursue AI innovation while maintaining our regulatory standards. Zero findings speaks volumes.',
                author: 'Lisa Martinez',
                role: 'VP, Compliance & Data Governance',
                company: 'Abbott Laboratories'
            }
        }
    ]
};
