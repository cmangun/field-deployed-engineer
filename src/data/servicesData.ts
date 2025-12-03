import { StaticImageData } from 'next/image';

export interface ServiceCategory {
    id: number;
    image: string;
    alt: string;
    title: string;
    description: string;
    priceRange: string;
    size: 'lg' | 'sm';
    link: string;
}

export interface ServicePackage {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    priceUnit: string;
    features: string[];
    deliverables: string[];
    timeline: string;
    image: string;
    category: string;
    popular?: boolean;
}

// Service Categories (like product categories)
export const serviceCategoryData: ServiceCategory[] = [
    {
        id: 1,
        image: '/assets/img/services/ai-strategy.jpg',
        alt: 'AI/ML Strategy',
        title: 'AI/ML Strategy',
        description: 'Define your AI roadmap and identify high-impact opportunities',
        priceRange: 'From $5,000',
        size: 'lg',
        link: '/services/ai-strategy',
    },
    {
        id: 2,
        image: '/assets/img/services/rapid-prototype.jpg',
        alt: 'Rapid Prototyping',
        title: 'Rapid Prototyping',
        description: 'POC to production in weeks, not months',
        priceRange: 'From $10,000',
        size: 'sm',
        link: '/services/prototyping',
    },
    {
        id: 3,
        image: '/assets/img/services/embedded.jpg',
        alt: 'Embedded Engineering',
        title: 'Embedded Engineering',
        description: 'Fractional FDE embedded with your team',
        priceRange: 'From $15,000/mo',
        size: 'sm',
        link: '/services/embedded',
    },
    {
        id: 4,
        image: '/assets/img/services/training.jpg',
        alt: 'Team Enablement',
        title: 'Team Enablement',
        description: 'Upskill your team on AI/ML best practices',
        priceRange: 'From $3,000',
        size: 'sm',
        link: '/services/training',
    },
    {
        id: 5,
        image: '/assets/img/services/architecture.jpg',
        alt: 'Architecture Review',
        title: 'Architecture Review',
        description: 'Technical deep-dive and recommendations',
        priceRange: 'From $2,500',
        size: 'sm',
        link: '/services/architecture',
    },
];

// Individual Service Packages (like products)
export const servicePackages: ServicePackage[] = [
    // AI/ML Strategy
    {
        id: 1,
        slug: 'ai-discovery',
        title: 'AI Discovery Sprint',
        subtitle: 'Find your highest-impact AI opportunities',
        description: 'A focused 2-week engagement to identify AI/ML opportunities, assess feasibility, and create a prioritized roadmap.',
        price: '$5,000',
        priceUnit: 'fixed',
        features: [
            'Stakeholder interviews',
            'Data landscape assessment',
            'Opportunity identification',
            'Feasibility analysis',
            'ROI estimation',
        ],
        deliverables: [
            'AI Opportunity Map',
            'Prioritized roadmap',
            'Executive presentation',
            'Technical requirements doc',
        ],
        timeline: '2 weeks',
        image: '/assets/img/services/ai-discovery.jpg',
        category: 'strategy',
        popular: true,
    },
    {
        id: 2,
        slug: 'ai-roadmap',
        title: 'AI Roadmap & Strategy',
        subtitle: '90-day actionable AI implementation plan',
        description: 'Comprehensive strategic planning including vendor selection, build vs buy analysis, and implementation timeline.',
        price: '$12,000',
        priceUnit: 'fixed',
        features: [
            'Everything in Discovery Sprint',
            'Vendor landscape analysis',
            'Build vs buy recommendations',
            'Team structure planning',
            'Risk assessment',
        ],
        deliverables: [
            '90-day implementation plan',
            'Vendor comparison matrix',
            'Budget projections',
            'Hiring recommendations',
            'Monthly check-ins (3 months)',
        ],
        timeline: '4 weeks',
        image: '/assets/img/services/ai-roadmap.jpg',
        category: 'strategy',
    },
    // Rapid Prototyping
    {
        id: 3,
        slug: 'mvp-sprint',
        title: 'MVP Sprint',
        subtitle: 'Working prototype in 4 weeks',
        description: 'Rapid development of a functional AI/ML prototype to validate your concept with real users.',
        price: '$15,000',
        priceUnit: 'fixed',
        features: [
            'Requirements workshop',
            'Architecture design',
            'Core feature development',
            'Model training/fine-tuning',
            'Basic UI/UX',
        ],
        deliverables: [
            'Working prototype',
            'Source code',
            'Documentation',
            'Deployment guide',
            'Demo video',
        ],
        timeline: '4 weeks',
        image: '/assets/img/services/mvp-sprint.jpg',
        category: 'prototyping',
        popular: true,
    },
    {
        id: 4,
        slug: 'production-build',
        title: 'Production Build',
        subtitle: 'Enterprise-ready AI solution',
        description: 'Full development of a production-grade AI/ML solution with monitoring, testing, and deployment.',
        price: '$40,000',
        priceUnit: 'starting',
        features: [
            'Everything in MVP Sprint',
            'Production architecture',
            'CI/CD pipeline',
            'Monitoring & alerting',
            'Security hardening',
            'Load testing',
        ],
        deliverables: [
            'Production-ready solution',
            'Infrastructure as code',
            'Runbooks',
            'Training session',
            '30-day support',
        ],
        timeline: '8-12 weeks',
        image: '/assets/img/services/production-build.jpg',
        category: 'prototyping',
    },
    // Embedded Engineering
    {
        id: 5,
        slug: 'fractional-fde-20',
        title: 'Fractional FDE (20hrs/wk)',
        subtitle: 'Part-time embedded AI engineer',
        description: 'A dedicated AI/ML engineer embedded with your team 20 hours per week. Perfect for ongoing projects needing consistent expertise.',
        price: '$12,000',
        priceUnit: '/month',
        features: [
            '20 hours/week dedicated',
            'Slack/Teams integration',
            'Sprint participation',
            'Code reviews',
            'Pair programming',
            'Architecture guidance',
        ],
        deliverables: [
            'Weekly status updates',
            'Monthly retrospectives',
            'Knowledge transfer sessions',
            'Documentation',
        ],
        timeline: '3 month minimum',
        image: '/assets/img/services/fractional-20.jpg',
        category: 'embedded',
    },
    {
        id: 6,
        slug: 'fractional-fde-40',
        title: 'Fractional FDE (Full-time)',
        subtitle: 'Full-time embedded AI engineer',
        description: 'Full-time AI/ML engineering capacity without the overhead of a full-time hire. Ideal for critical initiatives.',
        price: '$22,000',
        priceUnit: '/month',
        features: [
            '40 hours/week dedicated',
            'Team lead capabilities',
            'Hiring support',
            'Vendor management',
            'Executive reporting',
            'On-site available',
        ],
        deliverables: [
            'Daily standups',
            'Sprint leadership',
            'Team mentorship',
            'Process improvement',
        ],
        timeline: '3 month minimum',
        image: '/assets/img/services/fractional-40.jpg',
        category: 'embedded',
        popular: true,
    },
    // Team Enablement
    {
        id: 7,
        slug: 'ai-workshop',
        title: 'AI/ML Workshop',
        subtitle: 'Half-day hands-on training',
        description: 'Interactive workshop covering AI/ML fundamentals, prompt engineering, and practical applications for your team.',
        price: '$3,000',
        priceUnit: 'fixed',
        features: [
            'Customized curriculum',
            'Hands-on exercises',
            'Real-world examples',
            'Q&A session',
            'Up to 20 participants',
        ],
        deliverables: [
            'Workshop materials',
            'Recording',
            'Resource library',
            'Follow-up office hours',
        ],
        timeline: '4 hours',
        image: '/assets/img/services/workshop.jpg',
        category: 'training',
    },
    {
        id: 8,
        slug: 'team-bootcamp',
        title: 'AI Team Bootcamp',
        subtitle: '2-week intensive training program',
        description: 'Comprehensive training program to upskill your engineering team on AI/ML development best practices.',
        price: '$15,000',
        priceUnit: 'fixed',
        features: [
            '10 sessions over 2 weeks',
            'Project-based learning',
            'Individual assessments',
            'Mentorship pairing',
            'Certification',
        ],
        deliverables: [
            'Capstone project',
            'Skills assessment',
            'Learning paths',
            '3 months Slack support',
        ],
        timeline: '2 weeks',
        image: '/assets/img/services/bootcamp.jpg',
        category: 'training',
    },
    // Architecture Review
    {
        id: 9,
        slug: 'arch-review',
        title: 'Architecture Review',
        subtitle: 'Technical deep-dive assessment',
        description: 'Comprehensive review of your existing AI/ML architecture with actionable recommendations.',
        price: '$2,500',
        priceUnit: 'fixed',
        features: [
            'Codebase review',
            'Infrastructure assessment',
            'Performance analysis',
            'Security audit',
            'Cost optimization',
        ],
        deliverables: [
            'Assessment report',
            'Recommendations',
            'Priority fixes',
            'Follow-up call',
        ],
        timeline: '1 week',
        image: '/assets/img/services/arch-review.jpg',
        category: 'architecture',
    },
    {
        id: 10,
        slug: 'tech-due-diligence',
        title: 'Technical Due Diligence',
        subtitle: 'For investors & acquirers',
        description: 'In-depth technical assessment of AI/ML capabilities for M&A, investment, or partnership decisions.',
        price: '$8,000',
        priceUnit: 'fixed',
        features: [
            'Team interviews',
            'Technology assessment',
            'IP evaluation',
            'Scalability analysis',
            'Risk identification',
        ],
        deliverables: [
            'Due diligence report',
            'Executive summary',
            'Risk matrix',
            'Recommendations',
        ],
        timeline: '2 weeks',
        image: '/assets/img/services/due-diligence.jpg',
        category: 'architecture',
    },
];

// Helper functions
export const getServicesByCategory = (category: string) => 
    servicePackages.filter(s => s.category === category);

export const getPopularServices = () => 
    servicePackages.filter(s => s.popular);

export const getServiceBySlug = (slug: string) => 
    servicePackages.find(s => s.slug === slug);
