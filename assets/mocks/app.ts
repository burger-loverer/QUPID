interface App {
    id: string;
    name: string;
    developer: string;
    description: string;
    rating: number;
    downloads: string;
    icon: string;
    screenshots: string[];
    category: string;
    size: string;
    tags: string[];
  }

export const apps: App[] = [
  {
    id: '1',
    name: 'PhotoEdit Pro',
    developer: 'Creative Apps Inc.',
    description: 'Professional photo editing with powerful tools and filters. Perfect for both beginners and professionals. Includes advanced retouching, layers, and AI-powered enhancements.',
    rating: 4.8,
    downloads: '10M+',
    icon: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    screenshots: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1611162616475-b1a91bd5c39b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    category: 'Photo & Video',
    size: '156 MB',
    tags: ['Editor', 'Creative', 'Professional']
  },
  {
    id: '2',
    name: 'FitTrack',
    developer: 'Health Solutions',
    description: 'Track your fitness journey with personalized workout plans, nutrition guidance, and progress tracking. Connect with friends and join challenges to stay motivated.',
    rating: 4.6,
    downloads: '5M+',
    icon: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    screenshots: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    category: 'Health & Fitness',
    size: '89 MB',
    tags: ['Fitness', 'Health', 'Tracking']
  },
  {
    id: '3',
    name: 'Mindful Meditation',
    developer: 'Wellness Apps',
    description: 'Find peace and reduce stress with guided meditations, breathing exercises, and sleep stories. Personalized recommendations based on your goals and preferences.',
    rating: 4.9,
    downloads: '20M+',
    icon: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    screenshots: [
      'https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    category: 'Health & Fitness',
    size: '124 MB',
    tags: ['Meditation', 'Mindfulness', 'Sleep']
  },
  {
    id: '4',
    name: 'TaskMaster',
    developer: 'Productivity Tools',
    description: 'Boost your productivity with smart task management, reminders, and project planning. Sync across all your devices and collaborate with team members seamlessly.',
    rating: 4.7,
    downloads: '15M+',
    icon: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    screenshots: [
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    category: 'Productivity',
    size: '45 MB',
    tags: ['Tasks', 'Planning', 'Organization']
  },
  {
    id: '5',
    name: 'WeatherNow',
    developer: 'Climate Data Inc.',
    description: 'Accurate weather forecasts with real-time updates, radar maps, and severe weather alerts. Plan your day with hourly and 10-day forecasts for any location worldwide.',
    rating: 4.5,
    downloads: '50M+',
    icon: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    screenshots: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    category: 'Weather',
    size: '78 MB',
    tags: ['Weather', 'Forecast', 'Maps']
  },
  {
    id: '6',
    name: 'FinTrack',
    developer: 'Financial Solutions',
    description: 'Take control of your finances with expense tracking, budgeting tools, and investment insights. Connect your accounts for a complete financial overview.',
    rating: 4.4,
    downloads: '8M+',
    icon: 'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    category: 'Finance',
    size: '67 MB',
    tags: ['Finance', 'Budget', 'Tracking']
  }
];

export const categories = [
  'Featured',
  'Games',
  'Photo & Video',
  'Health & Fitness',
  'Productivity',
  'Finance',
  'Social',
  'Entertainment',
  'Weather',
  'Education'
];