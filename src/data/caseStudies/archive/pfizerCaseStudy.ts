export const pfizerCaseStudy = {
    title: "Pfizer",
    company: "Pfizer Global Production",
    slides: [
        {
            id: 1,
            type: 'hero' as const,
            title: 'PFIZER',
            subtitle: 'Field-Embedded Engineering',
            content: [
                'Embedded onsite with Pfizer Global Production to accelerate content supply operations.',
                'Integrated OpenAI systems into high-stakes brand pipelines.'
            ],
            backgroundImage: '/assets/img/home-06/project/Embedded.jpg'
        },
        {
            id: 2,
            type: 'context' as const,
            title: 'THE PROBLEM',
            subtitle: 'Manual workflows bottlenecking content delivery',
            content: [
                'Content review cycles taking 4-6 weeks',
                'No centralized system for asset management',
                'Stakeholders across 3 continents misaligned on requirements'
            ],
            backgroundImage: '/assets/img/home-06/project/Embedded.jpg'
        },
        {
            id: 3,
            type: 'approach' as const,
            title: 'THE APPROACH',
            subtitle: 'Embedded engineering + stakeholder alignment',
            content: [
                'Sat onsite for 6 months with brand team',
                'Mapped existing workflows and pain points',
                'Built AI-powered content workflow system',
                'Trained team on new processes'
            ],
            backgroundImage: '/assets/img/home-06/project/Embedded.jpg'
        },
        {
            id: 4,
            type: 'architecture' as const,
            title: 'THE SOLUTION',
            subtitle: 'OpenAI + SharePoint + Azure ML',
            content: [
                'LLM-powered content generation pipeline',
                'Automated review routing and tracking',
                'Real-time collaboration dashboard',
                'MLR governance checkpoints'
            ],
            backgroundImage: '/assets/img/home-06/project/Embedded.jpg'
        },
        {
            id: 5,
            type: 'results' as const,
            title: 'THE RESULTS',
            subtitle: 'Shipped in 4 months, scaled to 3 brands',
            content: [
                '65% reduction in review cycle time',
                '3× increase in content throughput',
                'Zero MLR compliance issues post-launch',
                'System adopted by 2 additional brands'
            ],
            backgroundImage: '/assets/img/home-06/project/Embedded.jpg'
        },
        {
            id: 6,
            type: 'proof' as const,
            title: 'PROOF',
            subtitle: '',
            content: [],
            codeSnippet: `// LLM Content Review Pipeline
async function reviewContent(content: Content) {
  const prompt = buildPrompt(content, brand);
  
  const review = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: MLR_GUIDELINES },
      { role: "user", content: prompt }
    ]
  });

  return {
    approved: review.score > 0.85,
    feedback: review.suggestions,
    compliance: checkMLRRules(review)
  };
}`,
            onsiteImage: '/assets/img/hero.png',
            testimonial: {
                quote: 'Christopher embedded with our team and delivered a system that fundamentally changed how we produce content. The AI integration was seamless and the compliance framework gave us confidence to scale.',
                author: 'Sarah Johnson',
                role: 'VP, Global Brand Operations',
                company: 'Pfizer'
            }
        }
    ]
};
