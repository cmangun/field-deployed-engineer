import { CaseStudyData } from '@/types/caseStudy';

/**
 * CASE STUDY DATA TEMPLATE
 * 
 * Copy this file and rename it to match your case study slug (e.g., medtronicData.ts)
 * Then update all the fields below.
 * 
 * Images needed (5 total):
 * 1. heroImage - Main hero banner image
 * 2. galleryImages[3] - Approach section image
 * 3. galleryImages[4] - Challenge section image  
 * 4. galleryImages[5] - Solution section image
 * 5. galleryImages[6] - Testimonial section image
 * 
 * After creating the data file, add it to the registry in index.ts:
 * import { yourData } from "./yourData";
 * export const caseStudyRegistry = { ..., "your-slug": yourData };
 */

export const templateData: CaseStudyData = {
    slug: 'your-slug',
    title: 'Company Name',
    subtitle: 'Project Type / Service',
    company: 'Company Full Name',
    role: 'Your Role',
    year: '2024-2025',
    services: ['Service 1', 'Service 2', 'Service 3'],
    heroImage: '/assets/img/case-studies/your-slug/hero.jpg',
    clientLogo: '/assets/img/case-studies/your-slug/logo.png', // optional
    
    overview: 'A 2-3 sentence overview of the project. What was the engagement? What did you do? What was the outcome?',
    
    challenge: {
        title: 'Challenge',
        description: 'Brief description of the core problem or challenge.',
        points: [
            'Specific challenge point 1',
            'Specific challenge point 2',
            'Specific challenge point 3',
            'Specific challenge point 4',
        ]
    },
    
    approach: {
        title: 'Approach',
        description: 'How you approached solving the problem.',
        points: [
            'Approach step or method 1',
            'Approach step or method 2',
            'Approach step or method 3',
            'Approach step or method 4',
        ]
    },
    
    solution: {
        title: 'Solution',
        description: 'What you built or delivered.',
        points: [
            'Solution component 1',
            'Solution component 2',
            'Solution component 3',
            'Solution component 4',
        ],
        tools: [
            { label: 'Framework', value: 'Next.js, React' },
            { label: 'AI/ML', value: 'OpenAI, Azure ML' },
            { label: 'Infrastructure', value: 'Azure, AWS' },
            { label: 'Data', value: 'PostgreSQL, Redis' },
        ]
    },
    
    codeSnippet: {
        language: 'TypeScript',
        filename: 'example.ts',
        description: 'Brief description of what this code does and why it matters.',
        code: `// Your code snippet here
export async function example() {
  // Implementation
  return result;
}`
    },
    
    results: {
        title: 'Outcomes',
        metrics: [
            { value: '35%', numericValue: 35, suffix: '%', label: 'Improvement in X' },
            { value: '2.3×', numericValue: 2.3, suffix: '×', label: 'Increase in Y' },
            { value: '100%', numericValue: 100, suffix: '%', label: 'Achievement of Z' },
            { value: '$1M+', label: 'Value delivered' },
        ]
    },
    
    testimonial: {
        quote: 'Testimonial quote from the client or stakeholder about your work.',
        author: 'Person Name',
        role: 'Their Title',
        company: 'Company Name'
    },
    
    galleryImages: [
        '/assets/img/case-studies/your-slug/gallery-1.jpg', // [0] - not currently used
        '/assets/img/case-studies/your-slug/gallery-2.jpg', // [1] - not currently used
        '/assets/img/case-studies/your-slug/gallery-3.jpg', // [2] - not currently used
        '/assets/img/case-studies/your-slug/approach.jpg',  // [3] - Approach section
        '/assets/img/case-studies/your-slug/challenge.jpg', // [4] - Challenge section
        '/assets/img/case-studies/your-slug/solution.jpg',  // [5] - Solution section
        '/assets/img/case-studies/your-slug/testimonial.jpg', // [6] - Testimonial section
    ],
    
    // Optional: Link to next/prev case studies for navigation
    nextCaseStudy: {
        brand: 'Next Company',
        title: 'Next Project Title',
        description: 'Brief description of the next case study.',
        href: '/case-study/next-slug'
    },
    prevCaseStudy: {
        brand: 'Prev Company',
        title: 'Prev Project Title',
        description: 'Brief description of the previous case study.',
        href: '/case-study/prev-slug'
    }
};
