import type {
  User,
  Customer,
  Project,
  Story,
  FileAttachment,
  Comment,
  CalendarEvent,
} from './types';

// Current User
export const CURRENT_USER: User = {
  id: '1',
  name: 'Max Mueller',
  email: 'max@company.de',
  role: 'ceo',
  avatar: '/avatars/ceo.png',
};

// Team Members
export const TEAM_MEMBERS: User[] = [
  CURRENT_USER,
  {
    id: '2',
    name: 'Sarah Schmidt',
    email: 'sarah@company.de',
    role: 'customer_manager',
    avatar: '/avatars/sarah.png',
  },
  {
    id: '3',
    name: 'Tom Weber',
    email: 'tom@company.de',
    role: 'developer',
    avatar: '/avatars/tom.png',
  },
  {
    id: '4',
    name: 'Lisa Fischer',
    email: 'lisa@company.de',
    role: 'marketing',
    avatar: '/avatars/lisa.png',
  },
];

// Mock Customers
export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Müller GmbH',
    email: 'info@mueller-gmbh.de',
    phone: '+49 123 456789',
    status: 'active',
    notes: 'Wichtiger Kunde, regelmäßige Projekte',
    createdAt: '2024-03-15',
    lastContact: '2025-10-15',
  },
  {
    id: '2',
    name: 'Schmidt Automotive AG',
    email: 'kontakt@schmidt-auto.de',
    phone: '+49 234 567890',
    status: 'active',
    notes: 'Spezialisiert auf Automotive-Lösungen',
    createdAt: '2024-05-20',
    lastContact: '2025-10-20',
  },
  {
    id: '3',
    name: 'Weber Consulting',
    email: 'office@weber-consulting.de',
    phone: '+49 345 678901',
    status: 'on_hold',
    notes: 'Projekt pausiert bis Q1 2026',
    createdAt: '2024-01-10',
    lastContact: '2025-09-30',
  },
  {
    id: '4',
    name: 'Fischer Tech Solutions',
    email: 'tech@fischer.de',
    phone: '+49 456 789012',
    status: 'active',
    notes: 'Startup, agile Zusammenarbeit',
    createdAt: '2024-07-01',
    lastContact: '2025-10-18',
  },
  {
    id: '5',
    name: 'Becker Industries',
    email: 'info@becker-industries.de',
    status: 'active',
    createdAt: '2024-08-15',
    lastContact: '2025-10-22',
  },
  {
    id: '6',
    name: 'Hoffmann Digital',
    email: 'hello@hoffmann-digital.de',
    phone: '+49 567 890123',
    status: 'active',
    createdAt: '2024-06-10',
    lastContact: '2025-10-19',
  },
  {
    id: '7',
    name: 'Klein Marketing GmbH',
    email: 'marketing@klein.de',
    status: 'completed',
    notes: 'Projekt erfolgreich abgeschlossen',
    createdAt: '2023-11-01',
    lastContact: '2025-08-15',
  },
  {
    id: '8',
    name: 'Schulz E-Commerce',
    email: 'shop@schulz-ecommerce.de',
    phone: '+49 678 901234',
    status: 'active',
    notes: 'E-Commerce Plattform Entwicklung',
    createdAt: '2024-09-01',
    lastContact: '2025-10-21',
  },
  {
    id: '9',
    name: 'Wagner Immobilien',
    email: 'info@wagner-immo.de',
    status: 'active',
    createdAt: '2024-04-20',
    lastContact: '2025-10-10',
  },
  {
    id: '10',
    name: 'Koch Software',
    email: 'dev@koch-software.de',
    phone: '+49 789 012345',
    status: 'active',
    createdAt: '2024-02-28',
    lastContact: '2025-10-17',
  },
];

// Mock Projects
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    customerId: '1',
    title: 'Müller Website Redesign',
    description: 'Komplettes Redesign der Unternehmenswebsite mit modernem Look',
    type: 'website',
    status: 'in_development',
    progress: 65,
    deadline: '2025-11-15',
    assignee: 'Tom Weber',
    createdAt: '2025-09-01',
    updatedAt: '2025-10-22',
  },
  {
    id: '2',
    customerId: '1',
    title: 'Müller Mobile App',
    description: 'Native App für iOS und Android',
    type: 'app',
    status: 'planning',
    progress: 15,
    deadline: '2025-12-01',
    assignee: 'Tom Weber',
    createdAt: '2025-10-01',
    updatedAt: '2025-10-20',
  },
  {
    id: '3',
    customerId: '2',
    title: 'Schmidt CRM System',
    description: 'Individuelles CRM für Automotive-Kunden',
    type: 'software',
    status: 'in_development',
    progress: 45,
    deadline: '2025-11-30',
    assignee: 'Tom Weber',
    createdAt: '2025-08-15',
    updatedAt: '2025-10-21',
  },
  {
    id: '4',
    customerId: '3',
    title: 'Weber Marketing Campaign',
    description: 'Q4 Marketing Kampagne',
    type: 'marketing',
    status: 'on_hold',
    progress: 30,
    assignee: 'Lisa Fischer',
    createdAt: '2025-09-10',
    updatedAt: '2025-09-30',
  },
  {
    id: '5',
    customerId: '4',
    title: 'Fischer Tech Website',
    description: 'Landing Page für Startup',
    type: 'website',
    status: 'review',
    progress: 90,
    deadline: '2025-10-31',
    assignee: 'Tom Weber',
    createdAt: '2025-09-20',
    updatedAt: '2025-10-22',
  },
  {
    id: '6',
    customerId: '5',
    title: 'Becker Dashboard',
    description: 'Analytics Dashboard für interne Nutzung',
    type: 'software',
    status: 'planning',
    progress: 10,
    deadline: '2026-01-15',
    assignee: 'Tom Weber',
    createdAt: '2025-10-10',
    updatedAt: '2025-10-20',
  },
  {
    id: '7',
    customerId: '6',
    title: 'Hoffmann Social Media',
    description: 'Social Media Management Kampagne',
    type: 'marketing',
    status: 'in_development',
    progress: 55,
    deadline: '2025-11-10',
    assignee: 'Lisa Fischer',
    createdAt: '2025-09-05',
    updatedAt: '2025-10-21',
  },
  {
    id: '8',
    customerId: '7',
    title: 'Klein Branding',
    description: 'Rebranding Projekt',
    type: 'marketing',
    status: 'completed',
    progress: 100,
    assignee: 'Lisa Fischer',
    createdAt: '2025-06-01',
    updatedAt: '2025-08-15',
  },
  {
    id: '9',
    customerId: '8',
    title: 'Schulz E-Shop',
    description: 'Shopify E-Commerce Platform',
    type: 'website',
    status: 'in_development',
    progress: 70,
    deadline: '2025-11-20',
    assignee: 'Tom Weber',
    createdAt: '2025-09-15',
    updatedAt: '2025-10-22',
  },
  {
    id: '10',
    customerId: '9',
    title: 'Wagner Property Portal',
    description: 'Immobilien-Portal mit Suchfunktion',
    type: 'website',
    status: 'planning',
    progress: 20,
    deadline: '2025-12-15',
    assignee: 'Tom Weber',
    createdAt: '2025-10-05',
    updatedAt: '2025-10-18',
  },
];

// Mock Stories
export const MOCK_STORIES: Story[] = [
  // Project 1: Müller Website
  {
    id: '1.1',
    projectId: '1',
    title: 'Landing Page Design & Implementation',
    description: 'Moderne Landing Page mit Hero Section, Features und CTA',
    status: 'done',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-10-25',
    acceptanceCriteria: [
      'Hero section with compelling headline and CTA',
      'Features section with icons',
      'Responsive design (mobile, tablet, desktop)',
      'Loading time < 2 seconds',
      'SEO optimized',
    ],
    devNotes: 'Used Next.js Image optimization. Tailwind for styling.',
    createdAt: '2025-09-01',
    updatedAt: '2025-10-23',
  },
  {
    id: '1.2',
    projectId: '1',
    title: 'Contact Form Integration',
    description: 'Kontaktformular mit Validierung und E-Mail-Versand',
    status: 'in_development',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-10-28',
    acceptanceCriteria: [
      'Name, Email, Message fields',
      'Client-side validation',
      'Email sent to info@mueller-gmbh.de',
      'Success/Error messages',
      'GDPR checkbox',
    ],
    createdAt: '2025-09-05',
    updatedAt: '2025-10-22',
  },
  {
    id: '1.3',
    projectId: '1',
    title: 'Blog Section Setup',
    description: 'Blog mit CMS Integration',
    status: 'review',
    priority: 'medium',
    assignee: 'Tom Weber',
    deadline: '2025-11-01',
    acceptanceCriteria: [
      'Blog overview page',
      'Single blog post page',
      'CMS integration (Contentful)',
      'Categories and tags',
      'Related posts',
    ],
    devNotes: 'Using Contentful as headless CMS',
    createdAt: '2025-09-10',
    updatedAt: '2025-10-21',
  },
  {
    id: '1.4',
    projectId: '1',
    title: 'Navigation & Footer',
    description: 'Responsive Navigation und Footer',
    status: 'done',
    priority: 'high',
    assignee: 'Tom Weber',
    acceptanceCriteria: [
      'Desktop navigation',
      'Mobile hamburger menu',
      'Footer with links and social media',
      'Smooth scroll to sections',
    ],
    createdAt: '2025-09-02',
    updatedAt: '2025-10-20',
  },
  {
    id: '1.5',
    projectId: '1',
    title: 'SEO Optimization',
    description: 'Suchmaschinen-Optimierung',
    status: 'ready',
    priority: 'medium',
    assignee: 'Tom Weber',
    deadline: '2025-11-05',
    acceptanceCriteria: [
      'Meta tags for all pages',
      'Open Graph tags',
      'Sitemap.xml',
      'Robots.txt',
      'Google Analytics integration',
    ],
    createdAt: '2025-09-15',
    updatedAt: '2025-10-15',
  },
  {
    id: '1.6',
    projectId: '1',
    title: 'Performance Optimization',
    description: 'Ladezeit und Performance optimieren',
    status: 'backlog',
    priority: 'medium',
    assignee: 'Tom Weber',
    acceptanceCriteria: [
      'Lighthouse score > 90',
      'Image optimization',
      'Code splitting',
      'Lazy loading',
    ],
    createdAt: '2025-09-20',
    updatedAt: '2025-10-10',
  },

  // Project 2: Müller Mobile App
  {
    id: '2.1',
    projectId: '2',
    title: 'App Architecture Planning',
    description: 'Tech-Stack und Architektur definieren',
    status: 'done',
    priority: 'high',
    assignee: 'Tom Weber',
    acceptanceCriteria: [
      'Tech stack decided (React Native)',
      'Architecture diagram created',
      'API endpoints defined',
      'State management strategy',
    ],
    createdAt: '2025-10-01',
    updatedAt: '2025-10-10',
  },
  {
    id: '2.2',
    projectId: '2',
    title: 'User Authentication',
    description: 'Login und Registration',
    status: 'ready',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-11-05',
    acceptanceCriteria: [
      'Login screen',
      'Registration flow',
      'Password reset',
      'JWT authentication',
      'Biometric login support',
    ],
    createdAt: '2025-10-05',
    updatedAt: '2025-10-15',
  },
  {
    id: '2.3',
    projectId: '2',
    title: 'Home Screen Design',
    description: 'Main Dashboard der App',
    status: 'ready',
    priority: 'high',
    assignee: 'Tom Weber',
    acceptanceCriteria: [
      'Dashboard layout',
      'Quick actions',
      'Recent activity',
      'Navigation',
    ],
    createdAt: '2025-10-08',
    updatedAt: '2025-10-18',
  },

  // Project 3: Schmidt CRM
  {
    id: '3.1',
    projectId: '3',
    title: 'Customer Database Schema',
    description: 'Datenbank-Schema für Kunden',
    status: 'done',
    priority: 'high',
    assignee: 'Tom Weber',
    acceptanceCriteria: [
      'Tables defined',
      'Relations set up',
      'Indexes created',
      'Migrations ready',
    ],
    createdAt: '2025-08-15',
    updatedAt: '2025-09-01',
  },
  {
    id: '3.2',
    projectId: '3',
    title: 'Customer CRUD Operations',
    description: 'Create, Read, Update, Delete für Kunden',
    status: 'in_development',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-10-30',
    acceptanceCriteria: [
      'Create customer',
      'View customer list',
      'Edit customer',
      'Delete customer',
      'Search customers',
    ],
    createdAt: '2025-09-01',
    updatedAt: '2025-10-22',
  },
  {
    id: '3.3',
    projectId: '3',
    title: 'Sales Pipeline View',
    description: 'Kanban-Style Sales Pipeline',
    status: 'ready',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-11-10',
    acceptanceCriteria: [
      'Kanban board',
      'Drag & drop deals',
      'Deal value calculation',
      'Pipeline stages',
    ],
    createdAt: '2025-09-10',
    updatedAt: '2025-10-15',
  },

  // Project 5: Fischer Tech Website
  {
    id: '5.1',
    projectId: '5',
    title: 'Hero Section with Animation',
    description: 'Animated Hero Section für Startup',
    status: 'done',
    priority: 'high',
    assignee: 'Tom Weber',
    acceptanceCriteria: [
      'Eye-catching animation',
      'Clear value proposition',
      'CTA buttons',
      'Mobile responsive',
    ],
    createdAt: '2025-09-20',
    updatedAt: '2025-10-15',
  },
  {
    id: '5.2',
    projectId: '5',
    title: 'Features Section',
    description: 'Produkt-Features darstellen',
    status: 'review',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-10-29',
    acceptanceCriteria: [
      'Feature cards with icons',
      'Hover effects',
      'Benefits highlighted',
      'Call-to-action',
    ],
    devNotes: 'Client wants subtle animations on scroll',
    createdAt: '2025-09-25',
    updatedAt: '2025-10-20',
  },
  {
    id: '5.3',
    projectId: '5',
    title: 'Contact & Demo Request',
    description: 'Kontakt und Demo-Anfrage Formular',
    status: 'review',
    priority: 'medium',
    assignee: 'Tom Weber',
    deadline: '2025-10-30',
    acceptanceCriteria: [
      'Demo request form',
      'Calendar integration',
      'Email notifications',
      'Thank you page',
    ],
    createdAt: '2025-09-28',
    updatedAt: '2025-10-21',
  },

  // Project 9: Schulz E-Shop
  {
    id: '9.1',
    projectId: '9',
    title: 'Product Catalog',
    description: 'Produktkatalog mit Filter',
    status: 'in_development',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-11-01',
    acceptanceCriteria: [
      'Product grid',
      'Filter by category',
      'Search products',
      'Sort options',
      'Pagination',
    ],
    createdAt: '2025-09-15',
    updatedAt: '2025-10-22',
  },
  {
    id: '9.2',
    projectId: '9',
    title: 'Shopping Cart',
    description: 'Warenkorb-Funktionalität',
    status: 'ready',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-11-05',
    acceptanceCriteria: [
      'Add to cart',
      'Update quantities',
      'Remove items',
      'Cart summary',
      'Persistent cart',
    ],
    createdAt: '2025-09-20',
    updatedAt: '2025-10-18',
  },
  {
    id: '9.3',
    projectId: '9',
    title: 'Checkout Process',
    description: 'Checkout und Bezahlung',
    status: 'ready',
    priority: 'high',
    assignee: 'Tom Weber',
    deadline: '2025-11-15',
    acceptanceCriteria: [
      'Multi-step checkout',
      'Address form',
      'Payment integration (Stripe)',
      'Order confirmation',
      'Email receipt',
    ],
    createdAt: '2025-09-25',
    updatedAt: '2025-10-20',
  },
];

// Mock Files
export const MOCK_FILES: FileAttachment[] = [
  {
    id: '1',
    projectId: '1',
    storyId: '1.1',
    filename: 'landing-design-v2.fig',
    fileSize: 2400000,
    mimeType: 'application/figma',
    uploadedBy: 'Sarah Schmidt',
    uploadedAt: '2025-10-20',
  },
  {
    id: '2',
    projectId: '1',
    storyId: '1.2',
    filename: 'form-validation-rules.md',
    fileSize: 15000,
    mimeType: 'text/markdown',
    uploadedBy: 'Tom Weber',
    uploadedAt: '2025-10-21',
  },
  {
    id: '3',
    projectId: '1',
    filename: 'brand-guidelines.pdf',
    fileSize: 1800000,
    mimeType: 'application/pdf',
    uploadedBy: 'Sarah Schmidt',
    uploadedAt: '2025-09-15',
  },
  {
    id: '4',
    projectId: '2',
    storyId: '2.2',
    filename: 'app-wireframes.sketch',
    fileSize: 3200000,
    mimeType: 'application/sketch',
    uploadedBy: 'Lisa Fischer',
    uploadedAt: '2025-10-10',
  },
  {
    id: '5',
    projectId: '5',
    storyId: '5.1',
    filename: 'hero-animation.mp4',
    fileSize: 8500000,
    mimeType: 'video/mp4',
    uploadedBy: 'Tom Weber',
    uploadedAt: '2025-10-18',
  },
];

// Mock Comments
export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    storyId: '1.1',
    userId: '2',
    userName: 'Sarah Schmidt',
    userAvatar: '/avatars/sarah.png',
    content: 'Kunde ist sehr zufrieden mit dem Design! 🎉',
    createdAt: '2025-10-23T14:30:00Z',
  },
  {
    id: '2',
    storyId: '1.1',
    userId: '3',
    userName: 'Tom Weber',
    userAvatar: '/avatars/tom.png',
    content: 'Super! Habe noch die Performance optimiert.',
    createdAt: '2025-10-23T15:00:00Z',
  },
  {
    id: '3',
    storyId: '1.2',
    userId: '2',
    userName: 'Sarah Schmidt',
    userAvatar: '/avatars/sarah.png',
    content: 'Kunde möchte auch ein Telefon-Feld im Formular',
    createdAt: '2025-10-22T10:15:00Z',
  },
  {
    id: '4',
    storyId: '1.2',
    userId: '3',
    userName: 'Tom Weber',
    userAvatar: '/avatars/tom.png',
    content: 'Verstanden, füge ich hinzu!',
    createdAt: '2025-10-22T11:00:00Z',
  },
  {
    id: '5',
    storyId: '5.2',
    userId: '1',
    userName: 'Max Mueller',
    userAvatar: '/avatars/ceo.png',
    content: 'Können wir die Animationen etwas subtiler machen?',
    createdAt: '2025-10-21T16:20:00Z',
  },
];

// Mock Calendar Events
export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Müller Website Launch',
    date: '2025-11-15',
    type: 'deadline',
    projectId: '1',
    description: 'Go-Live der neuen Website',
  },
  {
    id: '2',
    title: 'Client Call - Schmidt',
    date: '2025-10-24',
    type: 'meeting',
    description: 'CRM Demo und Feedback',
  },
  {
    id: '3',
    title: 'Fischer Website Launch',
    date: '2025-10-31',
    type: 'deadline',
    projectId: '5',
  },
  {
    id: '4',
    title: 'Team Sprint Planning',
    date: '2025-10-25',
    type: 'meeting',
    description: 'Sprint planning für nächste 2 Wochen',
  },
  {
    id: '5',
    title: 'Schulz E-Shop Launch',
    date: '2025-11-20',
    type: 'deadline',
    projectId: '9',
  },
  {
    id: '6',
    title: 'Hoffmann Campaign Start',
    date: '2025-11-10',
    type: 'milestone',
    projectId: '7',
  },
];

// Combined Mock Data Object
export const MOCK_DATA = {
  currentUser: CURRENT_USER,
  teamMembers: TEAM_MEMBERS,
  customers: MOCK_CUSTOMERS,
  projects: MOCK_PROJECTS,
  stories: MOCK_STORIES,
  files: MOCK_FILES,
  comments: MOCK_COMMENTS,
  events: MOCK_EVENTS,
};

// Helper Functions
export function getCustomerById(id: string): Customer | undefined {
  return MOCK_CUSTOMERS.find((c) => c.id === id);
}

export function getProjectsByCustomerId(customerId: string): Project[] {
  return MOCK_PROJECTS.filter((p) => p.customerId === customerId);
}

export function getStoriesByProjectId(projectId: string): Story[] {
  return MOCK_STORIES.filter((s) => s.projectId === projectId);
}

export function getCommentsByStoryId(storyId: string): Comment[] {
  return MOCK_COMMENTS.filter((c) => c.storyId === storyId);
}

export function getFilesByProjectId(projectId: string): FileAttachment[] {
  return MOCK_FILES.filter((f) => f.projectId === projectId);
}

export function getFilesByStoryId(storyId: string): FileAttachment[] {
  return MOCK_FILES.filter((f) => f.storyId === storyId);
}

export function searchCustomers(query: string): Customer[] {
  const q = query.toLowerCase();
  return MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.notes?.toLowerCase().includes(q)
  );
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return MOCK_PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
  );
}

export function searchStories(query: string): Story[] {
  const q = query.toLowerCase();
  return MOCK_STORIES.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
  );
}

export function getCustomerProjectCount(customerId: string): number {
  return MOCK_PROJECTS.filter((p) => p.customerId === customerId).length;
}

export function getProjectStoryCount(projectId: string): number {
  return MOCK_STORIES.filter((s) => s.projectId === projectId).length;
}

export function getUpcomingDeadlines(limit: number = 5): Story[] {
  const now = new Date();
  return MOCK_STORIES
    .filter((s) => s.deadline && new Date(s.deadline) > now && s.status !== 'done')
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, limit);
}

export function getOverdueStories(): Story[] {
  const now = new Date();
  return MOCK_STORIES.filter(
    (s) => s.deadline && new Date(s.deadline) < now && s.status !== 'done'
  );
}
