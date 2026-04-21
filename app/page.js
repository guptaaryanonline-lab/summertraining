'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  GraduationCap, Award, Users, Trophy, Rocket, Star, Clock, PlayCircle, CheckCircle2,
  Search, Menu, ChevronRight, Sparkles, BrainCircuit, Code2, Shield, Cpu, Palette,
  LineChart, Boxes, Bitcoin, Hammer, ArrowRight, MapPin, Mail, Phone, Calendar,
  ArrowLeft, BookOpen, Target, Briefcase, Globe, Award as AwardIcon, Zap, FileText,
  Laptop, Video, MessageCircle, BadgeCheck, TrendingUp, UserCheck
} from 'lucide-react'

// ---------- DATA ----------
const makeCurriculum = (weeks) => weeks.map((w, i) => ({ week: i + 1, ...w }))

const PROGRAMS = [
  {
    id: 'ai-agents',
    title: 'AI Agents & Automation',
    category: 'college',
    icon: BrainCircuit,
    image: 'https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=1400',
    tagline: 'Build autonomous AI agents that think, plan & act.',
    level: 'Intermediate',
    duration: '6 weeks',
    hours: '80+ hrs',
    rating: 4.9,
    learners: 2340,
    priceEarly: 4999,
    price: 7999,
    mode: 'Live Online + Capstone',
    startDate: 'June 2, 2026',
    tags: ['Hands-on', 'GenAI', 'Certificate'],
    overview: 'Master the complete stack of modern AI agent development. From prompt engineering to multi-agent orchestration with LangGraph, you will build and deploy production-grade autonomous agents that can reason, use tools, and collaborate.',
    whatYouLearn: [
      'Design & build autonomous AI agents from scratch',
      'Master LangChain, LangGraph & OpenAI function calling',
      'Build retrieval-augmented generation (RAG) pipelines',
      'Implement multi-agent orchestration and planning',
      'Deploy agents to production with monitoring',
      'Integrate tools, APIs and external knowledge bases',
    ],
    tools: ['Python', 'OpenAI', 'LangChain', 'LangGraph', 'Pinecone', 'FastAPI'],
    prerequisites: ['Basic Python knowledge', 'Familiarity with APIs'],
    projects: ['Customer-support multi-agent system', 'Autonomous research agent with web browsing', 'Code-review assistant with GitHub integration'],
    curriculum: makeCurriculum([
      { title: 'Foundations of LLMs & Prompt Engineering', topics: ['Transformer intuition', 'Prompt patterns', 'Few-shot & CoT', 'Evaluating outputs'] },
      { title: 'Tool Use & Function Calling', topics: ['OpenAI tools API', 'Structured outputs', 'JSON schemas', 'Error handling'] },
      { title: 'RAG Systems', topics: ['Embeddings', 'Vector DBs (Pinecone)', 'Chunking strategies', 'Reranking'] },
      { title: 'Single-Agent Architectures', topics: ['ReAct pattern', 'Memory', 'Planner-executor', 'Guardrails'] },
      { title: 'Multi-Agent Orchestration', topics: ['LangGraph state machines', 'Agent-to-agent comms', 'Supervisor pattern', 'Human-in-the-loop'] },
      { title: 'Production & Capstone', topics: ['Deployment (FastAPI)', 'Observability', 'Cost optimization', 'Capstone demo day'] },
    ]),
  },
  {
    id: 'data-science',
    title: 'Data Science & AI',
    category: 'college',
    icon: LineChart,
    image: 'https://images.unsplash.com/photo-1753613648137-602c669cbe07?w=1400',
    tagline: 'From Python to ML models deployed in production.',
    level: 'Beginner → Advanced',
    duration: '8 weeks',
    hours: '120+ hrs',
    rating: 4.8,
    learners: 5120,
    priceEarly: 4999,
    price: 7999,
    mode: 'Live Online + Capstone',
    startDate: 'June 2, 2026',
    tags: ['Bestseller', 'Project-based'],
    overview: 'A comprehensive journey from Python fundamentals to deploying machine learning models. Perfect for students who want an industry-ready data science skill set backed by real Kaggle-level projects.',
    whatYouLearn: [
      'Python, NumPy, Pandas for data analysis',
      'Statistics and EDA on real datasets',
      'Machine Learning with scikit-learn',
      'Deep Learning with PyTorch',
      'Model evaluation, tuning and MLOps',
      'Deploy ML models with FastAPI + Docker',
    ],
    tools: ['Python', 'Pandas', 'scikit-learn', 'PyTorch', 'Kaggle', 'Docker'],
    prerequisites: ['High-school mathematics', 'Curiosity for data'],
    projects: ['House price predictor', 'Customer churn classification', 'Image classifier deployed on cloud'],
    curriculum: makeCurriculum([
      { title: 'Python for Data Science', topics: ['Syntax refresher', 'NumPy arrays', 'Pandas DataFrames', 'Visualization'] },
      { title: 'Statistics & EDA', topics: ['Descriptive stats', 'Distributions', 'Hypothesis testing', 'Feature engineering'] },
      { title: 'Supervised Learning', topics: ['Regression', 'Classification', 'Decision trees', 'Model evaluation'] },
      { title: 'Advanced ML', topics: ['Ensembles', 'XGBoost', 'Hyper-param tuning', 'Cross-validation'] },
      { title: 'Unsupervised & NLP', topics: ['Clustering', 'PCA', 'Text processing', 'Embeddings'] },
      { title: 'Deep Learning Basics', topics: ['Neural nets', 'PyTorch tensors', 'CNN intro', 'Training loops'] },
      { title: 'Deployment & MLOps', topics: ['FastAPI', 'Docker', 'CI/CD basics', 'Monitoring'] },
      { title: 'Capstone Project', topics: ['Problem framing', 'End-to-end build', 'Demo', 'Portfolio polish'] },
    ]),
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Web Development',
    category: 'college',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=1400',
    tagline: 'Next.js, React, Node, MongoDB — ship real apps.',
    level: 'Beginner friendly',
    duration: '8 weeks',
    hours: '110+ hrs',
    rating: 4.9,
    learners: 4280,
    priceEarly: 4999,
    price: 7999,
    mode: 'Live Online + Capstone',
    startDate: 'June 2, 2026',
    tags: ['Trending', 'Internship'],
    overview: 'Become a job-ready full-stack developer. Build, test, and deploy real-world apps with React, Next.js, Node, and MongoDB — the same stack used by modern product teams.',
    whatYouLearn: [
      'HTML, CSS, modern JavaScript (ES2024)',
      'React 18+ with hooks and context',
      'Next.js 14 App Router & server components',
      'REST APIs and authentication with JWT',
      'MongoDB data modeling and aggregation',
      'Deployment to Vercel & cloud',
    ],
    tools: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind', 'Git'],
    prerequisites: ['No prior experience needed'],
    projects: ['Instagram-style social feed', 'E-commerce store', 'Full SaaS with auth + dashboard'],
    curriculum: makeCurriculum([
      { title: 'Web Foundations', topics: ['HTML5', 'CSS & Flex/Grid', 'JavaScript basics', 'Git/GitHub'] },
      { title: 'Modern JS & React', topics: ['ES modules', 'React components', 'Hooks', 'State management'] },
      { title: 'Next.js & Routing', topics: ['App router', 'Server components', 'Data fetching', 'Layouts'] },
      { title: 'Styling & UI', topics: ['Tailwind CSS', 'shadcn/ui', 'Responsive design', 'Accessibility'] },
      { title: 'APIs & Auth', topics: ['REST design', 'JWT/sessions', 'Validation', 'Rate limiting'] },
      { title: 'Databases', topics: ['MongoDB', 'Schema design', 'Aggregations', 'Indexes'] },
      { title: 'DevOps Basics', topics: ['Vercel deploy', 'Env vars', 'Domains', 'Monitoring'] },
      { title: 'Capstone + Portfolio', topics: ['Full-stack app', 'Testing', 'Polish', 'Demo'] },
    ]),
  },
  {
    id: 'cybersecurity',
    title: 'Ethical Hacking & Cybersecurity',
    category: 'college',
    icon: Shield,
    image: 'https://images.pexels.com/photos/10638082/pexels-photo-10638082.jpeg?w=1400',
    tagline: 'Break things ethically. Protect systems at scale.',
    level: 'Intermediate',
    duration: '6 weeks',
    hours: '80+ hrs',
    rating: 4.7,
    learners: 1820,
    priceEarly: 4999,
    price: 7999,
    mode: 'Live Online + Labs',
    startDate: 'June 2, 2026',
    tags: ['Hands-on Labs'],
    overview: 'Hands-on journey into offensive and defensive security. Use Kali Linux, perform pen-tests, and participate in CTF challenges — learning how real attackers think and how to defend.',
    whatYouLearn: [
      'Network fundamentals and recon',
      'Web application security (OWASP Top 10)',
      'Pen-testing with Kali Linux & Burp Suite',
      'Cryptography essentials',
      'Social engineering & defenses',
      'CTF challenge strategies',
    ],
    tools: ['Kali Linux', 'Nmap', 'Burp Suite', 'Metasploit', 'Wireshark'],
    prerequisites: ['Basic networking', 'Linux comfort'],
    projects: ['File encryption tool', 'Vulnerability scanner', 'CTF write-ups'],
    curriculum: makeCurriculum([
      { title: 'Security Foundations', topics: ['CIA triad', 'TCP/IP', 'Linux CLI', 'Setting up Kali'] },
      { title: 'Reconnaissance', topics: ['OSINT', 'Nmap scans', 'Enumeration', 'Fingerprinting'] },
      { title: 'Web App Security', topics: ['OWASP Top 10', 'SQLi', 'XSS', 'Burp Suite'] },
      { title: 'Exploitation', topics: ['Metasploit', 'Payloads', 'Privilege escalation', 'Post-exploit'] },
      { title: 'Cryptography', topics: ['Symmetric/asymmetric', 'Hashes', 'TLS', 'Building an encryptor'] },
      { title: 'CTFs & Capstone', topics: ['CTF challenges', 'Report writing', 'Bug bounty intro', 'Capstone'] },
    ]),
  },
  {
    id: 'iot',
    title: 'Internet of Things & Drones',
    category: 'college',
    icon: Cpu,
    image: 'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=1400',
    tagline: 'Build connected devices, sensors and smart drones.',
    level: 'Beginner',
    duration: '6 weeks',
    hours: '80+ hrs',
    rating: 4.6,
    learners: 1240,
    priceEarly: 5499,
    price: 8499,
    mode: 'Online + Hardware Kit',
    startDate: 'June 2, 2026',
    tags: ['Hardware Kit'],
    overview: 'Build smart, connected devices from scratch. You receive a hardware kit (Arduino + ESP32 + sensors) and will create IoT dashboards and control a quadcopter drone by the end.',
    whatYouLearn: [
      'Microcontroller programming (Arduino, ESP32)',
      'Sensor integration & signal processing',
      'MQTT & cloud IoT',
      'Drone hardware and control systems',
      'Real-time dashboards',
      'Capstone smart device',
    ],
    tools: ['Arduino', 'ESP32', 'MQTT', 'Node-RED', 'ThingSpeak'],
    prerequisites: ['Curiosity. No hardware experience needed.'],
    projects: ['Smart home dashboard', 'Weather station', 'Mini drone control'],
    curriculum: makeCurriculum([
      { title: 'Electronics Basics', topics: ['Circuits', 'Breadboarding', 'Arduino IDE', 'Blink & beyond'] },
      { title: 'Sensors & Actuators', topics: ['Temperature', 'Ultrasonic', 'Motors', 'Servos'] },
      { title: 'ESP32 & Wi-Fi', topics: ['MCU intro', 'Wi-Fi setup', 'HTTP requests', 'JSON'] },
      { title: 'Cloud & MQTT', topics: ['MQTT basics', 'Brokers', 'Dashboards', 'Alerts'] },
      { title: 'Drones', topics: ['Quadcopter anatomy', 'Flight controllers', 'Safety', 'Simple flights'] },
      { title: 'Capstone', topics: ['Pick a use case', 'Build end-to-end', 'Demo', 'Documentation'] },
    ]),
  },
  {
    id: 'uiux',
    title: 'UI/UX & Digital Marketing',
    category: 'college',
    icon: Palette,
    image: 'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=1400',
    tagline: 'Design beautifully. Market effectively.',
    level: 'Beginner',
    duration: '5 weeks',
    hours: '60+ hrs',
    rating: 4.7,
    learners: 980,
    priceEarly: 3999,
    price: 6499,
    mode: 'Live Online',
    startDate: 'June 2, 2026',
    tags: ['Portfolio'],
    overview: 'Learn the full product design loop — from user research to polished Figma prototypes — and pair it with real digital marketing skills for brands and startups.',
    whatYouLearn: [
      'User research and personas',
      'Wireframing & Figma prototyping',
      'Design systems & accessibility',
      'SEO, ads and content strategy',
      'Brand identity basics',
      'Case-study portfolio',
    ],
    tools: ['Figma', 'Notion', 'Google Ads', 'Meta Ads', 'Canva'],
    prerequisites: ['No prior design experience'],
    projects: ['Redesign a real app', 'Brand identity kit', 'Paid-ads campaign plan'],
    curriculum: makeCurriculum([
      { title: 'Design Thinking & Research', topics: ['Empathy maps', 'Personas', 'User journeys', 'Interviews'] },
      { title: 'Wireframes & Prototyping', topics: ['Figma basics', 'Components', 'Auto-layout', 'Prototyping'] },
      { title: 'Design Systems & UI', topics: ['Typography', 'Colour', 'Grids', 'Accessibility'] },
      { title: 'Digital Marketing', topics: ['SEO', 'Content', 'Google/Meta ads', 'Analytics'] },
      { title: 'Capstone', topics: ['Redesign case study', 'Pitch deck', 'Portfolio polish', 'Demo'] },
    ]),
  },
  {
    id: 'genai',
    title: 'LLMs, GenAI & Agentic AI',
    category: 'college',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=1400',
    tagline: 'Master OpenAI, Claude, Gemini & build agents.',
    level: 'Intermediate',
    duration: '6 weeks',
    hours: '80+ hrs',
    rating: 4.9,
    learners: 3650,
    priceEarly: 5499,
    price: 8499,
    mode: 'Live Online + Capstone',
    startDate: 'June 2, 2026',
    tags: ['New', 'Hot'],
    overview: 'Go deep into generative AI. Work with leading frontier models, fine-tune for specific tasks, and orchestrate production agentic systems for real use-cases.',
    whatYouLearn: [
      'Prompt engineering at scale',
      'Fine-tuning open-source LLMs',
      'RAG and hybrid retrieval',
      'Agentic workflows & tools',
      'Evaluation & safety',
      'Real deployments',
    ],
    tools: ['OpenAI', 'Anthropic', 'Gemini', 'HuggingFace', 'LangGraph'],
    prerequisites: ['Python', 'Basic ML intuition'],
    projects: ['Domain chatbot with RAG', 'Fine-tuned summarizer', 'Agentic research assistant'],
    curriculum: makeCurriculum([
      { title: 'LLM Landscape', topics: ['Tokenization', 'Transformers', 'Frontier models', 'APIs'] },
      { title: 'Prompt Engineering', topics: ['Patterns', 'Structured outputs', 'Evaluation', 'Guardrails'] },
      { title: 'RAG Deep Dive', topics: ['Embeddings', 'Vector DBs', 'Chunking', 'Reranking'] },
      { title: 'Fine-tuning', topics: ['Datasets', 'LoRA', 'Evaluation', 'Deployment'] },
      { title: 'Agents', topics: ['ReAct', 'Tools', 'LangGraph', 'Multi-agent'] },
      { title: 'Capstone & Demo', topics: ['Production ready app', 'Observability', 'Safety review', 'Demo day'] },
    ]),
  },
  {
    id: 'cad-ansys',
    title: 'CAD, ANSYS & Additive Manufacturing',
    category: 'college',
    icon: Hammer,
    image: 'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=1400',
    tagline: 'Design, simulate, and 3D-print with pros.',
    level: 'Beginner',
    duration: '6 weeks',
    hours: '80+ hrs',
    rating: 4.6,
    learners: 720,
    priceEarly: 4999,
    price: 7999,
    mode: 'Live Online + Lab sessions',
    startDate: 'June 2, 2026',
    tags: ['Engineering'],
    overview: 'An integrated mechanical-engineering program covering CAD modelling, FEA/CFD simulation in ANSYS, and additive manufacturing (3D printing) workflows.',
    whatYouLearn: [
      '3D parametric modelling in SolidWorks',
      'Assemblies and drawings',
      'FEA simulations in ANSYS',
      'Additive manufacturing workflows',
      'DfM (design for manufacturing)',
      'Capstone component design',
    ],
    tools: ['SolidWorks', 'ANSYS', 'Cura', 'Ultimaker'],
    prerequisites: ['Basic engineering drawing'],
    projects: ['Designed part with simulation', 'Printed 3D model', 'Optimization case study'],
    curriculum: makeCurriculum([
      { title: 'CAD Modelling', topics: ['Sketching', 'Features', 'Assemblies', 'Drawings'] },
      { title: 'Advanced CAD', topics: ['Surfaces', 'Sheet metal', 'Mechanism', 'Motion'] },
      { title: 'ANSYS Basics', topics: ['FEA theory', 'Meshing', 'Boundary conditions', 'Solving'] },
      { title: 'Simulations', topics: ['Structural', 'Thermal', 'Modal', 'Optimization'] },
      { title: '3D Printing', topics: ['FDM basics', 'Slicing', 'Material choice', 'Post-processing'] },
      { title: 'Capstone', topics: ['Design + simulate + print', 'Report', 'Demo'] },
    ]),
  },
  {
    id: 'python-school',
    title: 'Programming with Python',
    category: 'school',
    icon: Code2,
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=1400',
    tagline: 'Start coding from zero — built for school students.',
    level: 'Beginner',
    duration: '4 weeks',
    hours: '40+ hrs',
    rating: 4.8,
    learners: 3210,
    priceEarly: 2999,
    price: 4999,
    mode: 'Live Online',
    startDate: 'June 2, 2026',
    tags: ['School', 'Starter'],
    overview: 'A gentle, fun introduction to coding designed for school students. Finish with 3 mini-games and a certificate.',
    whatYouLearn: [
      'Variables, loops, functions',
      'Lists, dictionaries and files',
      'Mini-games with Python',
      'Simple automations',
      'Intro to libraries',
      'Certificate project',
    ],
    tools: ['Python', 'Replit', 'VS Code'],
    prerequisites: ['Class 8 and above'],
    projects: ['Number guessing game', 'Rock-paper-scissors', 'Quiz app'],
    curriculum: makeCurriculum([
      { title: 'Hello Python', topics: ['Install', 'Variables', 'Input/output', 'Math'] },
      { title: 'Control Flow', topics: ['If/else', 'Loops', 'Functions', 'Debugging'] },
      { title: 'Data & Files', topics: ['Lists', 'Dicts', 'Files', 'Mini-project'] },
      { title: 'Projects', topics: ['Games', 'Automation', 'Certificate', 'Showcase'] },
    ]),
  },
  {
    id: 'web3',
    title: 'Blockchain & Web 3.0',
    category: 'college',
    icon: Bitcoin,
    image: 'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=1400',
    tagline: 'Build dApps, smart contracts & own the next web.',
    level: 'Intermediate',
    duration: '6 weeks',
    hours: '80+ hrs',
    rating: 4.5,
    learners: 640,
    priceEarly: 5499,
    price: 8499,
    mode: 'Live Online + Capstone',
    startDate: 'June 2, 2026',
    tags: ['Emerging'],
    overview: 'Understand how blockchains work, build smart contracts in Solidity, and ship a full decentralized app to a testnet. Perfect entry to Web 3.0.',
    whatYouLearn: [
      'Blockchain internals',
      'Solidity smart contracts',
      'Ethereum & EVM',
      'dApp frontends with ethers.js',
      'NFTs and tokens',
      'Testnet deployment',
    ],
    tools: ['Solidity', 'Hardhat', 'ethers.js', 'Metamask', 'Remix'],
    prerequisites: ['JS basics helpful'],
    projects: ['NFT minting dApp', 'Voting DAO', 'Token exchange UI'],
    curriculum: makeCurriculum([
      { title: 'Blockchain 101', topics: ['Cryptography', 'Consensus', 'Wallets', 'Ethereum'] },
      { title: 'Solidity', topics: ['Types', 'Contracts', 'Events', 'Security'] },
      { title: 'Hardhat & Testing', topics: ['Local node', 'Tests', 'Gas', 'Deploy'] },
      { title: 'Front-end dApps', topics: ['ethers.js', 'React UI', 'Metamask', 'Flows'] },
      { title: 'NFTs & DAOs', topics: ['ERC-721', 'ERC-20', 'Voting', 'Governance'] },
      { title: 'Capstone', topics: ['Ship a dApp', 'Testnet', 'Demo', 'Write-up'] },
    ]),
  },
  {
    id: 'ai-school',
    title: 'AI & Robotics for Schools',
    category: 'school',
    icon: Boxes,
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=1400',
    tagline: 'Fun intro to AI, vision & basic robotics.',
    level: 'Beginner',
    duration: '4 weeks',
    hours: '40+ hrs',
    rating: 4.9,
    learners: 1420,
    priceEarly: 3499,
    price: 5499,
    mode: 'Live Online',
    startDate: 'June 2, 2026',
    tags: ['School', 'Fun'],
    overview: 'School-friendly introduction to artificial intelligence, computer vision, and hands-on robotics concepts. Exciting demos each week.',
    whatYouLearn: [
      'Scratch and Python basics',
      'Computer vision demos',
      'Simple ML models',
      'Basic robotics concepts',
      'Fun AI projects',
      'Final showcase',
    ],
    tools: ['Scratch', 'Python', 'Teachable Machine'],
    prerequisites: ['Class 6 and above'],
    projects: ['Face filter', 'Chatbot', 'Virtual robot'],
    curriculum: makeCurriculum([
      { title: 'AI Basics', topics: ['What is AI?', 'Scratch intro', 'First model', 'Demo'] },
      { title: 'Vision', topics: ['Teachable Machine', 'Classify objects', 'Filters', 'Mini-project'] },
      { title: 'Python + AI', topics: ['Python basics', 'Simple libs', 'Chatbot', 'Showcase prep'] },
      { title: 'Capstone', topics: ['Build + show', 'Certificate', 'Feedback', 'Demo'] },
    ]),
  },
  {
    id: 'web-school',
    title: 'Web Dev Starter (Schools)',
    category: 'school',
    icon: Code2,
    image: 'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=1400',
    tagline: 'HTML, CSS, JS — build your first websites.',
    level: 'Beginner',
    duration: '4 weeks',
    hours: '40+ hrs',
    rating: 4.7,
    learners: 890,
    priceEarly: 2999,
    price: 4999,
    mode: 'Live Online',
    startDate: 'June 2, 2026',
    tags: ['School'],
    overview: 'Learn to build your own websites from scratch. Perfect for school students curious about how the web works.',
    whatYouLearn: [
      'HTML5 structure',
      'CSS styling and layouts',
      'Basic JavaScript',
      'Responsive design',
      '3 mini projects',
      'Certificate',
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'VS Code'],
    prerequisites: ['Class 8 and above'],
    projects: ['Personal portfolio', 'Interactive quiz', 'Landing page'],
    curriculum: makeCurriculum([
      { title: 'HTML Basics', topics: ['Tags', 'Structure', 'Forms', 'Media'] },
      { title: 'CSS Magic', topics: ['Selectors', 'Flex/grid', 'Animations', 'Responsive'] },
      { title: 'JavaScript', topics: ['Variables', 'DOM', 'Events', 'Mini-game'] },
      { title: 'Projects + Certificate', topics: ['Portfolio', 'Quiz', 'Landing', 'Demo day'] },
    ]),
  },
]

const MENTORS = [
  { name: 'Nishita Philip', role: 'Meta (Facebook) • UC Berkeley', img: 'https://i.pravatar.cc/160?img=47' },
  { name: 'Prince Mishra', role: 'R&D ABB • Ex SFO, WD, Optum', img: 'https://i.pravatar.cc/160?img=12' },
  { name: 'Shreyas Chatterjee', role: 'SWE, Meta • Columbia University', img: 'https://i.pravatar.cc/160?img=15' },
  { name: 'Dr. Ankit Dubey', role: 'Faculty, IIT Campus', img: 'https://i.pravatar.cc/160?img=33' },
  { name: 'Mukul Yadav', role: 'SDE, Amazon', img: 'https://i.pravatar.cc/160?img=22' },
  { name: 'Prof. MT Arvind', role: 'Chief Innovation Officer', img: 'https://i.pravatar.cc/160?img=60' },
  { name: 'Aviral Sharma', role: 'Sr. Business Analyst, Eversana', img: 'https://i.pravatar.cc/160?img=11' },
  { name: 'Yash Katiyar', role: 'NTU Singapore • Ex Amazon', img: 'https://i.pravatar.cc/160?img=14' },
  { name: 'Aayush Goyal', role: 'ICICI Pru • IIM Udaipur', img: 'https://i.pravatar.cc/160?img=52' },
  { name: 'Dr. Amitash Ojha', role: 'Faculty, IIT Campus', img: 'https://i.pravatar.cc/160?img=59' },
  { name: 'Kuldeep Kumar', role: 'Software Engineer, Rudderstack', img: 'https://i.pravatar.cc/160?img=8' },
  { name: 'Dr. Navneet Kumar', role: 'Program Advisor', img: 'https://i.pravatar.cc/160?img=53' },
]

const PLACEMENTS = [
  { name: 'Abhishek', at: 'Oracle', img: 'https://i.pravatar.cc/80?img=3' },
  { name: 'Riya', at: 'Deloitte', img: 'https://i.pravatar.cc/80?img=5' },
  { name: 'Abhi', at: 'ProcDNA', img: 'https://i.pravatar.cc/80?img=7' },
  { name: 'Kartik', at: 'Amazon', img: 'https://i.pravatar.cc/80?img=13' },
  { name: 'Suhani', at: 'Microsoft', img: 'https://i.pravatar.cc/80?img=16' },
  { name: 'Mitahi', at: 'Accenture', img: 'https://i.pravatar.cc/80?img=20' },
]

const TESTIMONIALS = [
  { name: 'Abhinav Agarwal', college: 'Mohanlal Sukhadia University', text: 'The practical approach of the sessions was amazing. Instructor explained clearly and gave real-life examples.' },
  { name: 'Siddharth Pandey', college: 'IIT Kanpur', text: 'All in all, one of my best experiences in terms of learning.' },
  { name: 'Asmi Gupta', college: 'Shoolini University', text: 'Hands-on projects like the Online Course Builder and Code Debugging Assistant gave me real exposure to Generative AI.' },
  { name: 'Kashish Sharma', college: 'HPTU, Hamirpur', text: 'Started with zero knowledge of web dev, ended with a solid grasp. Masterclasses were super industry-focused.' },
  { name: 'Suhani Sharma', college: 'MCM DAV Chandigarh', text: 'I can now work with OpenAI APIs, build autonomous agents and fine-tune LLMs. Transformative course.' },
  { name: 'Amoolya Harish', college: 'SRM Chennai', text: 'IoT + Drones was perfect blend of theory and hands-on. Worked with real hardware and drones.' },
]

const GALLERY = [
  'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=800',
  'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=800',
  'https://images.pexels.com/photos/10638082/pexels-photo-10638082.jpeg?w=800',
  'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=800',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
  'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=800',
]

// ---------- HELPERS ----------
const useCountdown = (target) => {
  const [now, setNow] = useState(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  if (now == null) return { d: 9, h: 16, m: 0, s: 0 }
  const diff = Math.max(0, target - now)
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  }
}

// ---------- NAVBAR ----------
function Navbar({ onRegister, onHome }) {
  const links = [
    { href: '#programs', label: 'Programs' },
    { href: '#mentors', label: 'Mentors' },
    { href: '#highlights', label: 'Highlights' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#faq', label: 'FAQ' },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e3a8a]/10 bg-white/95 backdrop-blur-xl">
      <div className="h-1 w-full bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#f59e0b]" />
      <div className="container flex h-16 items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e3a8a] text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="text-left leading-tight">
            <div className="text-[15px] font-extrabold tracking-tight text-[#1e3a8a]">Summer School <span className="text-[#f59e0b]">'26</span></div>
            <div className="text-[11px] text-slate-500">Project-based tech internships</div>
          </div>
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-[#1e3a8a]">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={onRegister} className="hidden bg-[#1e3a8a] text-white shadow-md hover:bg-[#1e40af] md:inline-flex">
            Register Now <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-[#1e3a8a]/20"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-4">
                {links.map((l) => (
                  <a key={l.href} href={l.href} className="text-base font-medium">{l.label}</a>
                ))}
                <Button onClick={onRegister} className="mt-4 bg-[#1e3a8a] text-white">Register Now</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

// ---------- HERO ----------
function Hero({ onRegister, onExplore }) {
  const earlyBird = useMemo(() => Date.now() + 9 * 86400000 + 16 * 3600000, [])
  const c = useCountdown(earlyBird)

  return (
    <section className="relative overflow-hidden bg-[#0b1b4a]">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-20 h-[400px] w-[400px] rounded-full bg-[#3b82f6] blur-3xl" />
        <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-[#1e3a8a] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#f59e0b]/40 blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container relative grid gap-10 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-28">
        <div className="flex flex-col justify-center text-white">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#f59e0b]" />
            Summer School 2026 · IIT Campus · Registrations Open
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Transform your<br /> future with{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#f59e0b]">world-class</span>
              <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-[#f59e0b]/20"></span>
            </span>{' '}
            tech training.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Project-based internships in <b className="text-white">GenAI, Data Science, Full-Stack, Cybersecurity, IoT</b> and more.
            Learn from IIT faculty and industry mentors at Meta, Amazon, Oracle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={onRegister} className="bg-[#f59e0b] text-[#1e3a8a] shadow-xl shadow-amber-500/20 hover:bg-[#fbbf24]">
              Register Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={onExplore} className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <PlayCircle className="mr-2 h-4 w-4" /> Explore Programs
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
            {[{ n: '25K+', l: 'Learners trained' }, { n: '50+', l: 'Expert mentors' }, { n: '12', l: 'Programs' }, { n: '4.8★', l: 'Avg rating' }].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-extrabold text-[#f59e0b]">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=1200" alt="Students learning" className="h-[460px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b4a] via-[#0b1b4a]/50 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
              <Badge className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#f59e0b]">🔥 Limited Seats</Badge>
              <Badge className="bg-white/15 text-white backdrop-blur hover:bg-white/20">Early Bird</Badge>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white p-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#1e3a8a]">Early Bird closes in</div>
                  <div className="text-xs text-slate-500">Subsidized fee · limited seats</div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e3a8a]/5 text-[#1e3a8a]"><Calendar className="h-4 w-4" /></div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                {[{ v: c.d, l: 'Days' }, { v: c.h, l: 'Hrs' }, { v: c.m, l: 'Min' }, { v: c.s, l: 'Sec' }].map((t, i) => (
                  <div key={i} className="rounded-lg bg-[#1e3a8a] py-2 text-white">
                    <div className="text-lg font-extrabold leading-none">{String(t.v).padStart(2, '0')}</div>
                    <div className="text-[10px] opacity-85">{t.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-16 hidden rounded-xl border bg-white p-3 shadow-xl lg:block">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><BadgeCheck className="h-5 w-5" /></div>
              <div>
                <div className="text-xs font-bold text-[#1e3a8a]">Certified</div>
                <div className="text-[11px] text-slate-500">Internship certificate</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 hidden rounded-xl border bg-white p-3 shadow-xl lg:block">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600"><Trophy className="h-5 w-5" /></div>
              <div>
                <div className="text-xs font-bold text-[#1e3a8a]">Top Placements</div>
                <div className="text-[11px] text-slate-500">Meta · Amazon · Oracle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueProps() {
  const items = [
    { icon: Rocket, title: 'Project-Based Learning', desc: 'Build real products, not toy demos.' },
    { icon: UserCheck, title: 'Expert Mentorship', desc: 'IIT faculty + mentors from Meta, Amazon, Oracle.' },
    { icon: AwardIcon, title: 'Internship Certificate', desc: 'Verifiable certificate on successful completion.' },
    { icon: Trophy, title: 'Hackathons & Competitions', desc: 'National showcase for your capstone projects.' },
  ]
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container grid gap-0 divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="group flex items-start gap-4 p-6">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-[#1e3a8a]/5 text-[#1e3a8a] transition group-hover:bg-[#1e3a8a] group-hover:text-white">
              <it.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold text-[#1e3a8a]">{it.title}</div>
              <div className="mt-1 text-sm text-slate-600">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------- PROGRAMS GRID ----------
function Programs({ onOpen }) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = PROGRAMS.filter((p) => {
    const byCat = filter === 'all' || p.category === filter
    const byQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tagline.toLowerCase().includes(query.toLowerCase())
    return byCat && byQ
  })

  return (
    <section id="programs" className="bg-slate-50 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">Programs at a Glance</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">Choose your path for Summer '26</h2>
          <p className="mt-3 text-slate-600">10+ industry-grade programs for college & school students. Every program ends with a capstone project.</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 bg-white md:w-auto">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="college" className="data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white">For College</TabsTrigger>
              <TabsTrigger value="school" className="data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white">For School</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e.g. AI, Python…" className="border-slate-200 bg-white pl-9" />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.id} className="group cursor-pointer overflow-hidden border-slate-200 transition-all hover:-translate-y-1 hover:border-[#1e3a8a]/30 hover:shadow-2xl hover:shadow-[#1e3a8a]/10" onClick={() => onOpen(p)}>
              <div className="relative h-44 overflow-hidden">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b4a]/90 via-[#0b1b4a]/30 to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#f59e0b]">{t}</Badge>
                  ))}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur"><p.icon className="h-5 w-5" /></div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-white/80">{p.category === 'school' ? 'School Program' : 'College Program'}</div>
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-white/15 px-2 py-1 text-xs backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                    <b>{p.rating}</b>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="text-lg font-bold leading-snug text-[#1e3a8a]">{p.title}</div>
                <div className="text-sm text-slate-600">{p.tagline}</div>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.duration}</span>
                  <span className="flex items-center gap-1"><Video className="h-3.5 w-3.5" /> {p.hours}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {p.learners.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> {p.level}</span>
                </div>
                <Separator />
                <ul className="space-y-1.5 text-sm">
                  {p.whatYouLearn.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#1e3a8a]" /> {h}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t bg-slate-50/60 pt-4">
                <div>
                  <div className="text-[11px] text-slate-400 line-through">₹{p.price.toLocaleString()}</div>
                  <div className="text-lg font-extrabold text-[#1e3a8a]">₹{p.priceEarly.toLocaleString()}<span className="ml-1 text-[10px] font-medium uppercase text-[#f59e0b]">early bird</span></div>
                </div>
                <Button onClick={(e) => { e.stopPropagation(); onOpen(p) }} className="bg-[#1e3a8a] text-white hover:bg-[#1e40af]">
                  More Details <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-slate-500">No programs match your search.</div>
        )}
      </div>
    </section>
  )
}

// ---------- PROGRAM DETAIL PAGE ----------
function ProgramDetail({ program, onBack, onRegister }) {
  useEffect(() => { window.scrollTo(0, 0) }, [program.id])
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sub-header */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#1e3a8a]">
            <ArrowLeft className="h-4 w-4" /> Back to Programs
          </button>
          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 line-through">₹{program.price.toLocaleString()}</div>
              <div className="text-sm font-extrabold text-[#1e3a8a]">₹{program.priceEarly.toLocaleString()} <span className="text-[10px] text-[#f59e0b]">EARLY BIRD</span></div>
            </div>
            <Button onClick={onRegister} className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">Enroll Now <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1b4a] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-[#3b82f6] blur-3xl" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#f59e0b]/60 blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="container relative grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#f59e0b]">{program.category === 'school' ? 'School Program' : 'College Program'}</Badge>
              {program.tags.map((t) => (
                <Badge key={t} className="bg-white/15 text-white backdrop-blur hover:bg-white/20">{t}</Badge>
              ))}
            </div>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{program.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-white/80">{program.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" /> <b>{program.rating}</b> ({program.learners.toLocaleString()} students)</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#f59e0b]" /> {program.duration} · {program.hours}</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-[#f59e0b]" /> {program.level}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#f59e0b]" /> Starts {program.startDate}</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={onRegister} className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24] shadow-xl shadow-amber-500/20">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}>
                <BookOpen className="mr-2 h-4 w-4" /> View Curriculum
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img src={program.image} alt={program.title} className="h-[340px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container grid gap-0 divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { icon: Clock, label: 'Duration', value: program.duration },
            { icon: Video, label: 'Mode', value: program.mode },
            { icon: Calendar, label: 'Starts', value: program.startDate },
            { icon: AwardIcon, label: 'Certificate', value: 'Yes, verifiable' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#1e3a8a]/5 text-[#1e3a8a]">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</div>
                <div className="text-sm font-semibold text-[#1e3a8a]">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Body: 2-column with sticky sidebar */}
      <section className="py-14">
        <div className="container grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="space-y-10">
            {/* Overview */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#1e3a8a]">
                <FileText className="h-5 w-5" />
                <h2 className="text-2xl font-extrabold">Program Overview</h2>
              </div>
              <p className="text-base leading-relaxed text-slate-700">{program.overview}</p>
            </div>

            {/* What You'll Learn */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-2 text-[#1e3a8a]">
                <Target className="h-5 w-5" />
                <h2 className="text-2xl font-extrabold">What you'll learn</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {program.whatYouLearn.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#1e3a8a]/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#1e3a8a]" />
                    </div>
                    <span className="text-sm text-slate-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#1e3a8a]">
                <Laptop className="h-5 w-5" />
                <h2 className="text-2xl font-extrabold">Tools & technologies</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {program.tools.map((t) => (
                  <div key={t} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#1e3a8a]">{t}</div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div id="curriculum">
              <div className="mb-4 flex items-center gap-2 text-[#1e3a8a]">
                <BookOpen className="h-5 w-5" />
                <h2 className="text-2xl font-extrabold">Week-by-week curriculum</h2>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white">
                <Accordion type="single" collapsible defaultValue="week-1">
                  {program.curriculum.map((w, i) => (
                    <AccordionItem key={i} value={`week-${w.week}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="px-6 py-4 text-left hover:bg-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#1e3a8a] text-sm font-bold text-white">
                            {String(w.week).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">Week {w.week}</div>
                            <div className="text-base font-bold text-[#1e3a8a]">{w.title}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5">
                        <div className="ml-14 grid gap-2 sm:grid-cols-2">
                          {w.topics.map((t) => (
                            <div key={t} className="flex items-start gap-2 text-sm text-slate-700">
                              <div className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#f59e0b]" /> {t}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Projects */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] p-6 text-white">
              <div className="mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <h2 className="text-2xl font-extrabold">Projects you'll build</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {program.projects.map((pr, i) => (
                  <div key={i} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">Project {i + 1}</div>
                    <div className="mt-1 text-sm font-semibold">{pr}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#1e3a8a]">
                <Zap className="h-5 w-5" />
                <h2 className="text-2xl font-extrabold">Prerequisites</h2>
              </div>
              <ul className="space-y-2 text-slate-700">
                {program.prerequisites.map((pr) => (
                  <li key={pr} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" /> {pr}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: sticky sidebar */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <Card className="overflow-hidden border-slate-200 shadow-lg">
              <div className="bg-[#1e3a8a] p-6 text-white">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">₹{program.priceEarly.toLocaleString()}</span>
                  <span className="text-sm text-white/70 line-through">₹{program.price.toLocaleString()}</span>
                </div>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#f59e0b] px-2 py-0.5 text-xs font-bold text-[#1e3a8a]">
                  EARLY BIRD · SAVE ₹{(program.price - program.priceEarly).toLocaleString()}
                </div>
              </div>
              <CardContent className="space-y-4 p-6">
                <Button onClick={onRegister} size="lg" className="w-full bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="w-full border-[#1e3a8a]/20 text-[#1e3a8a]">
                  <MessageCircle className="mr-2 h-4 w-4" /> Talk to a counsellor
                </Button>
                <Separator />
                <div className="text-sm font-bold text-[#1e3a8a]">This program includes</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    { i: Video, t: `${program.hours} of live training` },
                    { i: BookOpen, t: 'Structured curriculum & assignments' },
                    { i: Briefcase, t: `${program.projects.length}+ real-world projects` },
                    { i: UserCheck, t: 'Mentorship from industry experts' },
                    { i: AwardIcon, t: 'Verifiable internship certificate' },
                    { i: MessageCircle, t: 'Community & doubt support' },
                  ].map((x, i) => (
                    <li key={i} className="flex items-center gap-2"><x.i className="h-4 w-4 text-[#1e3a8a]" /> {x.t}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="mt-4 rounded-xl border border-[#f59e0b]/30 bg-[#fff7e6] p-4 text-sm text-[#78350f]">
              <b>🔥 Only limited seats.</b> Early Bird fee ends soon. Confirm your seat today to lock the subsidized price.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ---------- OTHER SECTIONS ----------
function Placements() {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Placements</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">Where our students landed</h2>
          <p className="mt-3 text-slate-600">Past cohort students joined top product & consulting companies.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {PLACEMENTS.map((s, i) => (
            <Card key={i} className="border-slate-200 text-center transition hover:-translate-y-0.5 hover:shadow-lg">
              <CardContent className="flex flex-col items-center gap-2 p-5">
                <Avatar className="h-14 w-14 ring-4 ring-[#1e3a8a]/10">
                  <AvatarImage src={s.img} />
                  <AvatarFallback>{s.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm font-semibold text-[#1e3a8a]">{s.name}</div>
                <Badge variant="secondary" className="bg-[#1e3a8a]/5 text-[#1e3a8a]">Placed at {s.at}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Categories({ onOpen }) {
  const college = PROGRAMS.filter((p) => p.category === 'college').slice(0, 6)
  const school = PROGRAMS.filter((p) => p.category === 'school')
  return (
    <section className="bg-slate-50 py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">Program Domains</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">For College & School students</h2>
          <p className="mt-3 text-slate-600">Follow the steps in each program card to register.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-[#1e3a8a] p-8 text-white shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f59e0b]/30 blur-3xl" />
            <GraduationCap className="h-10 w-10 text-[#f59e0b]" />
            <h3 className="mt-4 text-2xl font-extrabold">For College Students</h3>
            <p className="mt-2 max-w-sm text-white/85">Internship-grade programs in AI, Data Science, Full-Stack, Cybersecurity, IoT & more.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {college.map((p) => (
                <Badge key={p.id} onClick={() => onOpen(p)} className="cursor-pointer bg-white/10 text-white backdrop-blur hover:bg-white/20">{p.title}</Badge>
              ))}
            </div>
            <Button variant="secondary" className="mt-6 bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]" onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}>Explore College Programs <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[#0f766e] p-8 text-white shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <Boxes className="h-10 w-10 text-[#f59e0b]" />
            <h3 className="mt-4 text-2xl font-extrabold">For School Students</h3>
            <p className="mt-2 max-w-sm text-white/85">Fun intros to Python, Web Dev, AI & robotics — designed for curious school kids.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {school.map((p) => (
                <Badge key={p.id} onClick={() => onOpen(p)} className="cursor-pointer bg-white/10 text-white backdrop-blur hover:bg-white/20">{p.title}</Badge>
              ))}
            </div>
            <Button variant="secondary" className="mt-6 bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]" onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}>Explore School Programs <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Mentors() {
  return (
    <section id="mentors" className="bg-white py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">Program Mentors</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">Learn from the best</h2>
          <p className="mt-3 text-slate-600">Interact with mentors from industry and academia.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {MENTORS.map((m, i) => (
            <Card key={i} className="border-slate-200 transition hover:-translate-y-1 hover:border-[#1e3a8a]/20 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] p-[3px]">
                  <Avatar className="h-20 w-20 ring-4 ring-white">
                    <AvatarImage src={m.img} />
                    <AvatarFallback>{m.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-3 text-base font-bold text-[#1e3a8a]">{m.name}</div>
                <div className="mt-1 text-xs text-slate-500">{m.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section id="highlights" className="bg-slate-50 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Program Highlights</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">Glimpses from earlier editions</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-xl ${i % 5 === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img src={g} alt="highlight" className="h-60 w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b4a]/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Advisor() {
  return (
    <section className="relative overflow-hidden bg-[#0b1b4a] py-20 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-20 right-20 h-96 w-96 rounded-full bg-[#f59e0b]/30 blur-3xl" />
      </div>
      <div className="container relative grid items-center gap-10 md:grid-cols-[240px_1fr]">
        <div className="flex justify-center md:justify-start">
          <div className="rounded-full bg-gradient-to-br from-[#f59e0b] to-[#3b82f6] p-1.5">
            <Avatar className="h-48 w-48 ring-4 ring-[#0b1b4a]">
              <AvatarImage src="https://i.pravatar.cc/240?img=53" />
              <AvatarFallback>NK</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div>
          <Badge className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#f59e0b]">Message from Program Advisor</Badge>
          <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">Project-based learning. IIT faculty. Industry mentors.</h3>
          <p className="mt-4 max-w-2xl text-white/85">
            Our Summer School 2026 is a project-based internship and job-training program equipping students with future-ready skills in GenAI, AI Agents, Data Science, Cybersecurity, CAD, IoT and more. We empower and up-skill students across India through hands-on learning and expert mentorship — bridging academic knowledge and industry readiness.
          </p>
          <div className="mt-5">
            <div className="font-extrabold text-[#f59e0b]">Prof. Navneet Kumar</div>
            <div className="text-sm text-white/70">Program Advisor, Summer School 2026 · IIT Campus</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">Student Feedbacks</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">Loved by 25,000+ students</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} className="border-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="space-y-3 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-sm text-slate-600">“{t.text}”</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-[#1e3a8a]/10 text-[#1e3a8a]">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold text-[#1e3a8a]">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.college}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Who can apply for Summer School 2026?', a: 'Both college and school students across India can apply. Each program card mentions its eligibility.' },
    { q: 'Is the program online or offline?', a: 'Most programs are delivered live online with hands-on labs. Select cohorts may include an on-campus capstone week.' },
    { q: 'Do I get a certificate?', a: 'Yes. On successful completion of assignments and capstone project, you receive an internship/training certificate.' },
    { q: 'When are the last dates?', a: 'Early Bird (subsidized fee) closes April 30, 2026. Final registration closes May 15, 2026. Seats are limited.' },
    { q: 'What is the refund policy?', a: 'You may request a refund within the first 3 days of program start, minus a small processing fee.' },
  ]
  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="container max-w-3xl">
        <div className="text-center">
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">FAQ</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">Common Questions</h2>
        </div>
        <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-slate-200 bg-white">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`i-${i}`} className="border-b last:border-b-0">
              <AccordionTrigger className="px-6 py-4 text-left text-[#1e3a8a] hover:no-underline">{it.q}</AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-slate-600">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function CTAFooter({ onRegister }) {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-[#1e3a8a] p-10 text-white shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#f59e0b]/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#3b82f6]/30 blur-3xl" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <Badge className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#f59e0b]">Limited Seats</Badge>
                <h3 className="mt-3 text-3xl font-extrabold">Reserve your seat for Summer School '26</h3>
                <p className="mt-2 max-w-xl text-white/85">Early Bird closes April 30, 2026 · Final registration closes May 15, 2026.</p>
              </div>
              <Button size="lg" onClick={onRegister} className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#0b1b4a] text-white">
        <div className="container grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f59e0b] text-[#1e3a8a]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="font-extrabold">Summer School '26</div>
            </div>
            <p className="mt-3 text-sm text-white/70">Project-based tech internships for college & school students, powered by IIT faculty and industry mentors.</p>
          </div>
          <div>
            <div className="font-bold text-[#f59e0b]">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li><a href="#programs" className="hover:text-white">Programs</a></li>
              <li><a href="#mentors" className="hover:text-white">Mentors</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-[#f59e0b]">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> summerschool@example.edu</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> IIT Campus, India</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-[#f59e0b]">About</div>
            <p className="mt-3 text-sm text-white/70">Built with passion for learners. Inspired by the IIT Jammu Summer School experience.</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container py-4 text-xs text-white/60">© {new Date().getFullYear()} Summer School. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}

// ---------- REGISTER DIALOG ----------
function RegisterDialog({ open, onOpenChange, program }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', institution: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setDone(false)
      setForm({ fullName: '', email: '', phone: '', institution: '' })
    }
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    if (!program) { toast.error('Please pick a program first'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          programId: program.id,
          programTitle: program.title,
          category: program.category,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setDone(true)
      toast.success('Registered! We\u2019ll email you next steps.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#1e3a8a]">{done ? 'You\u2019re in! 🎉' : 'Register for Summer School \'26'}</DialogTitle>
          <DialogDescription>
            {done
              ? 'Check your inbox for confirmation and payment details within 24 hours.'
              : (program
                  ? <>Enrolling for <b>{program.title}</b> · <span className="font-semibold text-[#1e3a8a]">₹{program.priceEarly.toLocaleString()}</span> early bird</>
                  : 'Fill in your details to get started.')}
          </DialogDescription>
        </DialogHeader>
        {!done && (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Full Name</Label>
                <Input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Your name" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
            </div>
            <div>
              <Label>Institution / School</Label>
              <Input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} placeholder="e.g. IIT Delhi, DPS Jammu" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting} className="bg-[#1e3a8a] text-white hover:bg-[#1e40af]">
                {submitting ? 'Submitting…' : 'Confirm Registration'}
              </Button>
            </DialogFooter>
          </form>
        )}
        {done && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="mt-4 text-slate-600">Seat reserved for <b>{program?.title}</b>. Our team will reach out shortly.</p>
            <Button className="mt-6 bg-[#1e3a8a] text-white hover:bg-[#1e40af]" onClick={() => onOpenChange(false)}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ---------- MAIN APP ----------
const App = () => {
  const [open, setOpen] = useState(false)
  const [program, setProgram] = useState(null)
  const [viewId, setViewId] = useState(null) // selected program id for detail view

  const openDetails = (p) => {
    setViewId(p.id)
    window.scrollTo(0, 0)
  }
  const goHome = () => {
    setViewId(null)
    window.scrollTo(0, 0)
  }
  const openRegister = (p) => {
    setProgram(p || PROGRAMS[0])
    setOpen(true)
  }

  const selectedProgram = PROGRAMS.find((p) => p.id === viewId)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onRegister={() => openRegister(selectedProgram || null)} onHome={goHome} />
      {selectedProgram ? (
        <ProgramDetail
          program={selectedProgram}
          onBack={goHome}
          onRegister={() => openRegister(selectedProgram)}
        />
      ) : (
        <main>
          <Hero onRegister={() => openRegister(null)} onExplore={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} />
          <ValueProps />
          <Programs onOpen={openDetails} />
          <Placements />
          <Categories onOpen={openDetails} />
          <Mentors />
          <Highlights />
          <Advisor />
          <Testimonials />
          <FAQ />
          <CTAFooter onRegister={() => openRegister(null)} />
        </main>
      )}
      <RegisterDialog open={open} onOpenChange={setOpen} program={program} />
    </div>
  )
}

export default App
