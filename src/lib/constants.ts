import {
  Navigation, Shield, Stethoscope, Users, Accessibility, Languages,
  Settings, Leaf, MapPin, Mic, Armchair, UtensilsCrossed, Droplets,
  Baby, AlertTriangle, Flame, Eye, Bus, Car, Recycle, Heart, Gamepad2,
  Star, Sparkles, Brain, Database, Cloud, Radio, BarChart3,
  Smartphone, Globe, Server, Lock, Zap, MessageSquare,
  HandHelping, Headphones, ScanFace,
} from 'lucide-react';

// ===== FEATURES =====
export const features = [
  { icon: MapPin, title: 'AI Stadium Guide', description: 'Intelligent venue navigation with real-time directions, POI discovery, and personalized route optimization.' },
  { icon: Navigation, title: 'Indoor Navigation', description: 'Turn-by-turn AR navigation inside stadiums with sub-meter accuracy using BLE beacons.' },
  { icon: Mic, title: 'Voice Assistant', description: 'Multilingual AI voice companion supporting 40+ languages for hands-free stadium interaction.' },
  { icon: Armchair, title: 'Seat Finder', description: 'AI-powered seat recommendations based on view quality, proximity, and personal preferences.' },
  { icon: UtensilsCrossed, title: 'Food Queue Prediction', description: 'Real-time wait time estimation and smart ordering with crowd flow optimization.' },
  { icon: Droplets, title: 'Smart Washroom', description: 'Live occupancy tracking with predictive availability and accessibility-first routing.' },
  { icon: Baby, title: 'Lost Child Detection', description: 'Computer vision-powered child identification and rapid family reunification system.' },
  { icon: AlertTriangle, title: 'Emergency Response', description: 'AI-coordinated emergency protocols with automated dispatch and crowd evacuation routing.' },
  { icon: Flame, title: 'Crowd Heatmaps', description: 'Real-time density visualization using IoT sensors and computer vision analytics.' },
  { icon: HandHelping, title: 'Volunteer Copilot', description: 'AI task assignment and coordination for 20,000+ volunteers across venue operations.' },
  { icon: Stethoscope, title: 'Medical Dispatch', description: 'Automated medical incident detection with optimal responder routing and hospital coordination.' },
  { icon: Accessibility, title: 'Accessibility Assistant', description: 'Comprehensive accessibility tools including wheelchair navigation and sensory accommodations.' },
  { icon: Languages, title: 'AI Translator', description: 'Real-time speech and text translation across 40+ languages with cultural context awareness.' },
  { icon: Bus, title: 'Transport Planner', description: 'Multimodal transit optimization with real-time schedules, ride-sharing, and crowd-aware routing.' },
  { icon: Car, title: 'Parking Assistant', description: 'Smart parking allocation with automated guidance, EV charging slots, and accessibility spots.' },
  { icon: Leaf, title: 'Sustainability Dashboard', description: 'Real-time environmental impact tracking with carbon footprint and waste reduction metrics.' },
  { icon: Recycle, title: 'Waste Management', description: 'AI-powered waste sorting guidance with smart bin monitoring and recycling optimization.' },
  { icon: Heart, title: 'Fan Engagement', description: 'Interactive experiences including AR overlays, live polls, and social media integration.' },
  { icon: Star, title: 'Personalized Recommendations', description: 'ML-driven suggestions for food, merchandise, events, and activities based on fan profiles.' },
  { icon: Gamepad2, title: 'Live Match Companion', description: 'Real-time stats, instant replays, tactical analysis, and interactive match commentary.' },
];

// ===== AI AGENTS =====
export const agents = [
  {
    icon: Navigation,
    title: 'Navigation Agent',
    description: 'Guides fans through complex stadium environments with real-time pathfinding.',
    model: 'Gemini Pro + RAG',
    responsibilities: ['Indoor navigation', 'POI discovery', 'Route optimization', 'AR wayfinding'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Safety Agent',
    description: 'Monitors crowd safety through computer vision and IoT sensor fusion.',
    model: 'GPT-4o + YOLO v8',
    responsibilities: ['Crowd monitoring', 'Threat detection', 'Evacuation routing', 'Incident alerts'],
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Stethoscope,
    title: 'Medical Agent',
    description: 'Coordinates medical response with predictive health incident detection.',
    model: 'Gemini Pro + LangGraph',
    responsibilities: ['Incident detection', 'Responder dispatch', 'Hospital coordination', 'First aid guidance'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Volunteer Agent',
    description: 'AI copilot for volunteer coordination and task management at scale.',
    model: 'GPT-4o + LangChain',
    responsibilities: ['Task assignment', 'Shift management', 'Real-time guidance', 'Performance tracking'],
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Accessibility,
    title: 'Accessibility Agent',
    description: 'Ensures inclusive experience for all fans with adaptive assistance.',
    model: 'Gemini Pro + TTS/STT',
    responsibilities: ['Voice navigation', 'Sign language', 'Wheelchair routing', 'Sensory support'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Languages,
    title: 'Translation Agent',
    description: 'Real-time multilingual communication bridge for global fans.',
    model: 'GPT-4o + Whisper',
    responsibilities: ['Speech translation', 'Text translation', 'Cultural context', 'Sign language'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Settings,
    title: 'Operations Agent',
    description: 'Optimizes stadium operations through predictive analytics and automation.',
    model: 'Gemini Pro + AutoGen',
    responsibilities: ['Queue management', 'Resource allocation', 'Predictive maintenance', 'Staff coordination'],
    color: 'from-slate-400 to-zinc-500',
  },
  {
    icon: Leaf,
    title: 'Sustainability Agent',
    description: 'Tracks and optimizes environmental impact in real-time.',
    model: 'GPT-4o + IoT Analytics',
    responsibilities: ['Carbon tracking', 'Waste optimization', 'Energy management', 'Water conservation'],
    color: 'from-green-400 to-teal-500',
  },
];

// ===== ARCHITECTURE NODES =====
export const architectureNodes = [
  { id: 'users', label: 'Users', sublabel: '100K+ Fans', icon: Users },
  { id: 'mobile', label: 'Mobile App', sublabel: 'React Native + PWA', icon: Smartphone },
  { id: 'gateway', label: 'API Gateway', sublabel: 'FastAPI + WebSocket', icon: Globe },
  { id: 'agents', label: 'AI Agents', sublabel: 'LangGraph Orchestration', icon: Brain },
  { id: 'llm', label: 'LLM Layer', sublabel: 'GPT-4o + Gemini Pro', icon: Sparkles },
  { id: 'rag', label: 'RAG Pipeline', sublabel: 'LangChain + Embeddings', icon: Database },
  { id: 'vector', label: 'Vector Database', sublabel: 'Pinecone + pgvector', icon: Server },
  { id: 'vision', label: 'Computer Vision', sublabel: 'YOLO v8 + OpenCV', icon: Eye },
  { id: 'iot', label: 'IoT Sensors', sublabel: '10K+ Devices', icon: Radio },
  { id: 'analytics', label: 'Analytics Dashboard', sublabel: 'Real-time Insights', icon: BarChart3 },
];

// ===== COMPUTER VISION DETECTIONS =====
export const cvDetections = [
  { title: 'Crowd Detection', confidence: 97.8, count: 2847, color: '#10B981', description: 'Real-time crowd density analysis' },
  { title: 'Fire Detection', confidence: 99.2, count: 0, color: '#F59E0B', description: 'Thermal + visual fire detection' },
  { title: 'Queue Detection', confidence: 94.5, count: 12, color: '#10B981', description: 'Queue length and wait time estimation' },
  { title: 'Suspicious Package', confidence: 89.3, count: 1, color: '#F59E0B', description: 'Unattended object detection' },
  { title: 'Fall Detection', confidence: 96.1, count: 3, color: '#F59E0B', description: 'Automated fall incident detection' },
];

// ===== ACCESSIBILITY FEATURES =====
export const accessibilityFeatures = [
  { icon: Mic, title: 'Voice Navigation', description: 'Hands-free navigation with natural language voice commands and audio feedback.' },
  { icon: HandHelping, title: 'Sign Language Avatar', description: '3D avatar providing real-time sign language interpretation for announcements.' },
  { icon: Headphones, title: 'Speech-to-Text', description: 'Live captioning of announcements, commentary, and conversations.' },
  { icon: MessageSquare, title: 'Text-to-Speech', description: 'Natural voice synthesis for screen readers and audio descriptions.' },
  { icon: Accessibility, title: 'Wheelchair Navigation', description: 'Barrier-free routes with elevator locations, ramp access, and accessible seating.' },
  { icon: Eye, title: 'Color Blind Mode', description: 'Adaptive color schemes optimized for all types of color vision deficiency.' },
  { icon: ScanFace, title: 'Easy Language Mode', description: 'Simplified interface with clear iconography and plain language instructions.' },
];

// ===== SUSTAINABILITY STATS =====
export const sustainabilityStats = [
  { label: 'Carbon Saved', value: 45200, unit: 'tons CO₂', icon: Cloud, color: '#10B981' },
  { label: 'Water Saved', value: 12800000, unit: 'liters', icon: Droplets, color: '#10B981' },
  { label: 'Energy Saved', value: 8900, unit: 'MWh', icon: Zap, color: '#10B981' },
  { label: 'Food Waste Reduced', value: 67, unit: '%', icon: Recycle, color: '#10B981' },
  { label: 'Plastic Eliminated', value: 2300, unit: 'tons', icon: Leaf, color: '#10B981' },
];

// ===== TECH STACK =====
export const techStack = {
  'Frontend': ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['FastAPI', 'Python', 'Node.js', 'WebSocket'],
  'AI/ML': ['OpenAI GPT-4o', 'Google Gemini', 'LangChain', 'LangGraph'],
  'Data': ['PostgreSQL', 'Redis', 'Pinecone', 'Apache Kafka'],
  'Vision': ['OpenCV', 'YOLO v8', 'TensorFlow', 'MediaPipe'],
  'Cloud': ['AWS', 'Azure', 'Docker', 'Kubernetes'],
};

// ===== TIMELINE =====
export const timeline = [
  {
    year: '2026',
    title: 'FIFA World Cup Launch',
    description: 'Deploy StadiumGPT across all 16 FIFA World Cup 2026 venues in USA, Mexico, and Canada.',
    milestones: ['16 stadiums equipped', '100K+ daily users', '8 AI agents active', '40+ languages supported'],
  },
  {
    year: '2027',
    title: 'Global Sports Expansion',
    description: 'Expand to major sports leagues, Olympic venues, and international sporting events worldwide.',
    milestones: ['50+ venues', 'UEFA Champions League', 'Olympics 2028 prep', 'Custom AI models'],
  },
  {
    year: '2028',
    title: 'Smart Venue Platform',
    description: 'Transform into a full smart venue OS for concerts, conferences, airports, and public spaces.',
    milestones: ['200+ venues', 'Airport deployments', 'Concert venues', 'Conference centers'],
  },
  {
    year: 'Future',
    title: 'Autonomous Venue Intelligence',
    description: 'Fully autonomous venue management with predictive operations and zero-latency response.',
    milestones: ['Autonomous operations', 'Predictive everything', 'Digital twin', 'AGI integration'],
  },
];

// ===== PRICING TIERS =====
export const pricingTiers = [
  {
    name: 'FIFA',
    price: 'Custom',
    description: 'Full-scale deployment for FIFA World Cup and international tournaments.',
    features: ['All 8 AI Agents', 'Computer Vision Suite', 'Unlimited users', '24/7 dedicated support', 'Custom AI models', 'On-premise deployment'],
    popular: true,
    icon: '⚽',
  },
  {
    name: 'Sports Clubs',
    price: '$25K',
    period: '/month',
    description: 'For professional sports clubs and league venues.',
    features: ['6 AI Agents', 'Basic CV analytics', 'Up to 80K users', 'Priority support', 'Cloud deployment', 'Analytics dashboard'],
    popular: false,
    icon: '🏟️',
  },
  {
    name: 'Airports',
    price: '$35K',
    period: '/month',
    description: 'Smart terminal management for international airports.',
    features: ['All 8 AI Agents', 'Full CV suite', 'Unlimited passengers', '24/7 support', 'Hybrid deployment', 'Custom integrations'],
    popular: false,
    icon: '✈️',
  },
  {
    name: 'Smart Cities',
    price: '$50K',
    period: '/month',
    description: 'City-wide venue management and public safety platform.',
    features: ['All AI Agents', 'City-wide CV', 'Unlimited scale', 'Dedicated team', 'Multi-venue', 'Government compliance'],
    popular: false,
    icon: '🏙️',
  },
  {
    name: 'Concerts',
    price: '$15K',
    period: '/event',
    description: 'Event-based deployment for concerts and festivals.',
    features: ['4 AI Agents', 'Crowd analytics', 'Up to 50K users', 'Event support', 'Cloud deployment', 'Post-event reports'],
    popular: false,
    icon: '🎵',
  },
];

// ===== TESTIMONIALS =====
export const testimonials = [
  {
    quote: 'StadiumGPT revolutionized how we manage World Cup operations. The AI agents reduced incident response time by 73% and transformed the fan experience.',
    name: 'Dr. Sarah Chen',
    role: 'Head of Technology, FIFA Operations',
    avatar: '👩‍💼',
  },
  {
    quote: 'The crowd analytics and computer vision capabilities gave us unprecedented visibility. We could predict and prevent issues before they became problems.',
    name: 'James Rodriguez',
    role: 'Stadium Operations Director, MetLife Stadium',
    avatar: '👨‍💻',
  },
  {
    quote: 'As a fan with mobility challenges, the accessibility features were game-changing. Voice navigation and wheelchair routing made my World Cup dream come true.',
    name: 'Amira Hassan',
    role: 'Fan & Accessibility Advocate',
    avatar: '👩‍🦽',
  },
  {
    quote: 'The Volunteer Copilot was incredible. It coordinated 20,000 of us seamlessly — real-time task assignments, translations, and emergency protocols all in one app.',
    name: 'Marcus Johnson',
    role: 'Lead Volunteer Coordinator',
    avatar: '🧑‍🤝‍🧑',
  },
];

// ===== FAQ =====
export const faqItems = [
  {
    question: 'What is StadiumGPT?',
    answer: 'StadiumGPT is an AI Operating System designed for smart stadiums. It combines multiple AI agents, computer vision, IoT sensors, and large language models to create intelligent, safe, and sustainable venue experiences for fans, staff, and operations teams.',
  },
  {
    question: 'How does StadiumGPT handle 100K+ concurrent users?',
    answer: 'Our architecture uses a distributed microservices approach with auto-scaling on Kubernetes. The system handles real-time requests through WebSocket connections, with Redis caching and Kafka event streaming ensuring sub-100ms response times even at peak load.',
  },
  {
    question: 'What AI models does StadiumGPT use?',
    answer: 'StadiumGPT leverages a multi-model approach including OpenAI GPT-4o for conversational AI, Google Gemini Pro for multimodal understanding, YOLO v8 for computer vision, and custom fine-tuned models for domain-specific tasks like crowd prediction and emergency response.',
  },
  {
    question: 'Is StadiumGPT accessible for people with disabilities?',
    answer: 'Absolutely. Accessibility is a core design principle. StadiumGPT includes voice navigation, sign language avatars, speech-to-text captioning, wheelchair-optimized routing, color blind modes, and simplified interfaces — all meeting WCAG 2.2 AA standards.',
  },
  {
    question: 'How does the computer vision system ensure privacy?',
    answer: 'All computer vision processing happens on-premise with edge computing. We use anonymized crowd analytics without facial recognition for general monitoring. Personal identification is only used for opt-in safety features like lost child detection, with full GDPR compliance.',
  },
  {
    question: 'Can StadiumGPT be deployed outside sports venues?',
    answer: 'Yes. While designed for FIFA World Cup 2026, StadiumGPT\'s modular architecture adapts to airports, concert venues, conference centers, smart cities, and any large-scale public venue requiring intelligent crowd management.',
  },
  {
    question: 'What is the deployment timeline?',
    answer: 'A typical deployment takes 8-12 weeks including hardware installation, AI model customization, staff training, and load testing. For FIFA-scale deployments, we recommend a 6-month lead time with phased rollout.',
  },
  {
    question: 'How does StadiumGPT contribute to sustainability?',
    answer: 'The Sustainability Agent actively monitors and optimizes energy consumption, waste management, water usage, and carbon emissions. AI-driven optimization has shown 40% energy reduction and 67% food waste reduction in pilot deployments.',
  },
];

// ===== DASHBOARD NAV ITEMS =====
export const dashboardNavItems = [
  { icon: BarChart3, label: 'Command Center', href: '/dashboard' },
  { icon: Flame, label: 'Crowd Analytics', href: '/dashboard/crowd-analytics' },
  { icon: AlertTriangle, label: 'Emergency', href: '/dashboard/emergency' },
  { icon: Lock, label: 'Incidents', href: '/dashboard/incidents' },
  { icon: Users, label: 'Volunteers', href: '/dashboard/volunteers' },
  { icon: Heart, label: 'Fan Experience', href: '/dashboard/fan-experience' },
  { icon: Accessibility, label: 'Accessibility', href: '/dashboard/accessibility' },
  { icon: Leaf, label: 'Sustainability', href: '/dashboard/sustainability' },
  { icon: Bus, label: 'Transportation', href: '/dashboard/transportation' },
  { icon: Settings, label: 'Operations', href: '/dashboard/operations' },
  { icon: MapPin, label: 'Stadium Map', href: '/dashboard/stadium-map' },
  { icon: MessageSquare, label: 'AI Chat', href: '/dashboard/ai-chat' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: ScanFace, label: 'Profile', href: '/dashboard/profile' },
];
