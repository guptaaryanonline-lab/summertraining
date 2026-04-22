'use client'

// Shared data + components used across pages
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { toast } from 'sonner'
import {
  GraduationCap, BrainCircuit, Code2, Shield, Cpu, Palette, LineChart, Boxes, Bitcoin,
  Hammer, Sparkles, ArrowRight, Menu, CheckCircle2,
} from 'lucide-react'

const mk = (weeks) => weeks.map((w, i) => ({ week: i + 1, ...w }))

export const PROGRAMS = [
  { id: 'ai-agents', title: 'AI Agents & Automation', category: 'college', icon: BrainCircuit,
    image: 'https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=1400',
    tagline: 'Build autonomous AI agents that think, plan & act.',
    level: 'Intermediate', duration: '6 weeks', hours: '80+ hrs', rating: 4.9, learners: 2340,
    priceEarly: 4999, price: 7999, mode: 'Live Online + Capstone', startDate: 'June 2, 2026',
    tags: ['Hands-on', 'GenAI', 'Certificate'],
    overview: 'Master the complete stack of modern AI agent development. From prompt engineering to multi-agent orchestration with LangGraph, you will build and deploy production-grade autonomous agents that can reason, use tools, and collaborate.',
    whatYouLearn: ['Design & build autonomous AI agents from scratch','Master LangChain, LangGraph & OpenAI function calling','Build retrieval-augmented generation (RAG) pipelines','Implement multi-agent orchestration and planning','Deploy agents to production with monitoring','Integrate tools, APIs and external knowledge bases'],
    tools: ['Python','OpenAI','LangChain','LangGraph','Pinecone','FastAPI'],
    prerequisites: ['Basic Python knowledge','Familiarity with APIs'],
    projects: ['Customer-support multi-agent system','Autonomous research agent with web browsing','Code-review assistant with GitHub integration'],
    curriculum: mk([
      { title: 'Foundations of LLMs & Prompt Engineering', topics: ['Transformer intuition','Prompt patterns','Few-shot & CoT','Evaluating outputs'] },
      { title: 'Tool Use & Function Calling', topics: ['OpenAI tools API','Structured outputs','JSON schemas','Error handling'] },
      { title: 'RAG Systems', topics: ['Embeddings','Vector DBs (Pinecone)','Chunking strategies','Reranking'] },
      { title: 'Single-Agent Architectures', topics: ['ReAct pattern','Memory','Planner-executor','Guardrails'] },
      { title: 'Multi-Agent Orchestration', topics: ['LangGraph state machines','Agent-to-agent comms','Supervisor pattern','Human-in-the-loop'] },
      { title: 'Production & Capstone', topics: ['Deployment (FastAPI)','Observability','Cost optimization','Capstone demo day'] },
    ]),
  },
  { id: 'data-science', title: 'Data Science & AI', category: 'college', icon: LineChart,
    image: 'https://images.unsplash.com/photo-1753613648137-602c669cbe07?w=1400',
    tagline: 'From Python to ML models deployed in production.',
    level: 'Beginner → Advanced', duration: '8 weeks', hours: '120+ hrs', rating: 4.8, learners: 5120,
    priceEarly: 4999, price: 7999, mode: 'Live Online + Capstone', startDate: 'June 2, 2026',
    tags: ['Bestseller','Project-based'],
    overview: 'A comprehensive journey from Python fundamentals to deploying machine learning models. Perfect for students who want an industry-ready data science skill set backed by real Kaggle-level projects.',
    whatYouLearn: ['Python, NumPy, Pandas for data analysis','Statistics and EDA on real datasets','Machine Learning with scikit-learn','Deep Learning with PyTorch','Model evaluation, tuning and MLOps','Deploy ML models with FastAPI + Docker'],
    tools: ['Python','Pandas','scikit-learn','PyTorch','Kaggle','Docker'],
    prerequisites: ['High-school mathematics','Curiosity for data'],
    projects: ['House price predictor','Customer churn classification','Image classifier deployed on cloud'],
    curriculum: mk([
      { title: 'Python for Data Science', topics: ['Syntax refresher','NumPy arrays','Pandas DataFrames','Visualization'] },
      { title: 'Statistics & EDA', topics: ['Descriptive stats','Distributions','Hypothesis testing','Feature engineering'] },
      { title: 'Supervised Learning', topics: ['Regression','Classification','Decision trees','Model evaluation'] },
      { title: 'Advanced ML', topics: ['Ensembles','XGBoost','Hyper-param tuning','Cross-validation'] },
      { title: 'Unsupervised & NLP', topics: ['Clustering','PCA','Text processing','Embeddings'] },
      { title: 'Deep Learning Basics', topics: ['Neural nets','PyTorch tensors','CNN intro','Training loops'] },
      { title: 'Deployment & MLOps', topics: ['FastAPI','Docker','CI/CD basics','Monitoring'] },
      { title: 'Capstone Project', topics: ['Problem framing','End-to-end build','Demo','Portfolio polish'] },
    ]),
  },
  { id: 'full-stack', title: 'Full-Stack Web Development', category: 'college', icon: Code2,
    image: 'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=1400',
    tagline: 'Next.js, React, Node, MongoDB — ship real apps.',
    level: 'Beginner friendly', duration: '8 weeks', hours: '110+ hrs', rating: 4.9, learners: 4280,
    priceEarly: 4999, price: 7999, mode: 'Live Online + Capstone', startDate: 'June 2, 2026',
    tags: ['Trending','Internship'],
    overview: 'Become a job-ready full-stack developer. Build, test, and deploy real-world apps with React, Next.js, Node, and MongoDB — the same stack used by modern product teams.',
    whatYouLearn: ['HTML, CSS, modern JavaScript (ES2024)','React 18+ with hooks and context','Next.js 14 App Router & server components','REST APIs and authentication with JWT','MongoDB data modeling and aggregation','Deployment to Vercel & cloud'],
    tools: ['React','Next.js','Node.js','MongoDB','Tailwind','Git'],
    prerequisites: ['No prior experience needed'],
    projects: ['Instagram-style social feed','E-commerce store','Full SaaS with auth + dashboard'],
    curriculum: mk([
      { title: 'Web Foundations', topics: ['HTML5','CSS & Flex/Grid','JavaScript basics','Git/GitHub'] },
      { title: 'Modern JS & React', topics: ['ES modules','React components','Hooks','State management'] },
      { title: 'Next.js & Routing', topics: ['App router','Server components','Data fetching','Layouts'] },
      { title: 'Styling & UI', topics: ['Tailwind CSS','shadcn/ui','Responsive design','Accessibility'] },
      { title: 'APIs & Auth', topics: ['REST design','JWT/sessions','Validation','Rate limiting'] },
      { title: 'Databases', topics: ['MongoDB','Schema design','Aggregations','Indexes'] },
      { title: 'DevOps Basics', topics: ['Vercel deploy','Env vars','Domains','Monitoring'] },
      { title: 'Capstone + Portfolio', topics: ['Full-stack app','Testing','Polish','Demo'] },
    ]),
  },
  { id: 'cybersecurity', title: 'Ethical Hacking & Cybersecurity', category: 'college', icon: Shield,
    image: 'https://images.pexels.com/photos/10638082/pexels-photo-10638082.jpeg?w=1400',
    tagline: 'Break things ethically. Protect systems at scale.',
    level: 'Intermediate', duration: '6 weeks', hours: '80+ hrs', rating: 4.7, learners: 1820,
    priceEarly: 4999, price: 7999, mode: 'Live Online + Labs', startDate: 'June 2, 2026',
    tags: ['Hands-on Labs'],
    overview: 'Hands-on journey into offensive and defensive security. Use Kali Linux, perform pen-tests, and participate in CTF challenges — learning how real attackers think and how to defend.',
    whatYouLearn: ['Network fundamentals and recon','Web application security (OWASP Top 10)','Pen-testing with Kali Linux & Burp Suite','Cryptography essentials','Social engineering & defenses','CTF challenge strategies'],
    tools: ['Kali Linux','Nmap','Burp Suite','Metasploit','Wireshark'],
    prerequisites: ['Basic networking','Linux comfort'],
    projects: ['File encryption tool','Vulnerability scanner','CTF write-ups'],
    curriculum: mk([
      { title: 'Security Foundations', topics: ['CIA triad','TCP/IP','Linux CLI','Setting up Kali'] },
      { title: 'Reconnaissance', topics: ['OSINT','Nmap scans','Enumeration','Fingerprinting'] },
      { title: 'Web App Security', topics: ['OWASP Top 10','SQLi','XSS','Burp Suite'] },
      { title: 'Exploitation', topics: ['Metasploit','Payloads','Privilege escalation','Post-exploit'] },
      { title: 'Cryptography', topics: ['Symmetric/asymmetric','Hashes','TLS','Building an encryptor'] },
      { title: 'CTFs & Capstone', topics: ['CTF challenges','Report writing','Bug bounty intro','Capstone'] },
    ]),
  },
  { id: 'iot', title: 'Internet of Things & Drones', category: 'college', icon: Cpu,
    image: 'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=1400',
    tagline: 'Build connected devices, sensors and smart drones.',
    level: 'Beginner', duration: '6 weeks', hours: '80+ hrs', rating: 4.6, learners: 1240,
    priceEarly: 5499, price: 8499, mode: 'Online + Hardware Kit', startDate: 'June 2, 2026',
    tags: ['Hardware Kit'],
    overview: 'Build smart, connected devices from scratch. You receive a hardware kit (Arduino + ESP32 + sensors) and will create IoT dashboards and control a quadcopter drone by the end.',
    whatYouLearn: ['Microcontroller programming (Arduino, ESP32)','Sensor integration & signal processing','MQTT & cloud IoT','Drone hardware and control systems','Real-time dashboards','Capstone smart device'],
    tools: ['Arduino','ESP32','MQTT','Node-RED','ThingSpeak'],
    prerequisites: ['Curiosity. No hardware experience needed.'],
    projects: ['Smart home dashboard','Weather station','Mini drone control'],
    curriculum: mk([
      { title: 'Electronics Basics', topics: ['Circuits','Breadboarding','Arduino IDE','Blink & beyond'] },
      { title: 'Sensors & Actuators', topics: ['Temperature','Ultrasonic','Motors','Servos'] },
      { title: 'ESP32 & Wi-Fi', topics: ['MCU intro','Wi-Fi setup','HTTP requests','JSON'] },
      { title: 'Cloud & MQTT', topics: ['MQTT basics','Brokers','Dashboards','Alerts'] },
      { title: 'Drones', topics: ['Quadcopter anatomy','Flight controllers','Safety','Simple flights'] },
      { title: 'Capstone', topics: ['Pick a use case','Build end-to-end','Demo','Documentation'] },
    ]),
  },
  { id: 'uiux', title: 'UI/UX & Digital Marketing', category: 'college', icon: Palette,
    image: 'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=1400',
    tagline: 'Design beautifully. Market effectively.',
    level: 'Beginner', duration: '5 weeks', hours: '60+ hrs', rating: 4.7, learners: 980,
    priceEarly: 3999, price: 6499, mode: 'Live Online', startDate: 'June 2, 2026',
    tags: ['Portfolio'],
    overview: 'Learn the full product design loop — from user research to polished Figma prototypes — and pair it with real digital marketing skills for brands and startups.',
    whatYouLearn: ['User research and personas','Wireframing & Figma prototyping','Design systems & accessibility','SEO, ads and content strategy','Brand identity basics','Case-study portfolio'],
    tools: ['Figma','Notion','Google Ads','Meta Ads','Canva'],
    prerequisites: ['No prior design experience'],
    projects: ['Redesign a real app','Brand identity kit','Paid-ads campaign plan'],
    curriculum: mk([
      { title: 'Design Thinking & Research', topics: ['Empathy maps','Personas','User journeys','Interviews'] },
      { title: 'Wireframes & Prototyping', topics: ['Figma basics','Components','Auto-layout','Prototyping'] },
      { title: 'Design Systems & UI', topics: ['Typography','Colour','Grids','Accessibility'] },
      { title: 'Digital Marketing', topics: ['SEO','Content','Google/Meta ads','Analytics'] },
      { title: 'Capstone', topics: ['Redesign case study','Pitch deck','Portfolio polish','Demo'] },
    ]),
  },
  { id: 'genai', title: 'LLMs, GenAI & Agentic AI', category: 'college', icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=1400',
    tagline: 'Master OpenAI, Claude, Gemini & build agents.',
    level: 'Intermediate', duration: '6 weeks', hours: '80+ hrs', rating: 4.9, learners: 3650,
    priceEarly: 5499, price: 8499, mode: 'Live Online + Capstone', startDate: 'June 2, 2026',
    tags: ['New','Hot'],
    overview: 'Go deep into generative AI. Work with leading frontier models, fine-tune for specific tasks, and orchestrate production agentic systems for real use-cases.',
    whatYouLearn: ['Prompt engineering at scale','Fine-tuning open-source LLMs','RAG and hybrid retrieval','Agentic workflows & tools','Evaluation & safety','Real deployments'],
    tools: ['OpenAI','Anthropic','Gemini','HuggingFace','LangGraph'],
    prerequisites: ['Python','Basic ML intuition'],
    projects: ['Domain chatbot with RAG','Fine-tuned summarizer','Agentic research assistant'],
    curriculum: mk([
      { title: 'LLM Landscape', topics: ['Tokenization','Transformers','Frontier models','APIs'] },
      { title: 'Prompt Engineering', topics: ['Patterns','Structured outputs','Evaluation','Guardrails'] },
      { title: 'RAG Deep Dive', topics: ['Embeddings','Vector DBs','Chunking','Reranking'] },
      { title: 'Fine-tuning', topics: ['Datasets','LoRA','Evaluation','Deployment'] },
      { title: 'Agents', topics: ['ReAct','Tools','LangGraph','Multi-agent'] },
      { title: 'Capstone & Demo', topics: ['Production ready app','Observability','Safety review','Demo day'] },
    ]),
  },
  { id: 'cad-ansys', title: 'CAD, ANSYS & Additive Manufacturing', category: 'college', icon: Hammer,
    image: 'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=1400',
    tagline: 'Design, simulate, and 3D-print with pros.',
    level: 'Beginner', duration: '6 weeks', hours: '80+ hrs', rating: 4.6, learners: 720,
    priceEarly: 4999, price: 7999, mode: 'Live Online + Lab sessions', startDate: 'June 2, 2026',
    tags: ['Engineering'],
    overview: 'An integrated mechanical-engineering program covering CAD modelling, FEA/CFD simulation in ANSYS, and additive manufacturing (3D printing) workflows.',
    whatYouLearn: ['3D parametric modelling in SolidWorks','Assemblies and drawings','FEA simulations in ANSYS','Additive manufacturing workflows','DfM (design for manufacturing)','Capstone component design'],
    tools: ['SolidWorks','ANSYS','Cura','Ultimaker'],
    prerequisites: ['Basic engineering drawing'],
    projects: ['Designed part with simulation','Printed 3D model','Optimization case study'],
    curriculum: mk([
      { title: 'CAD Modelling', topics: ['Sketching','Features','Assemblies','Drawings'] },
      { title: 'Advanced CAD', topics: ['Surfaces','Sheet metal','Mechanism','Motion'] },
      { title: 'ANSYS Basics', topics: ['FEA theory','Meshing','Boundary conditions','Solving'] },
      { title: 'Simulations', topics: ['Structural','Thermal','Modal','Optimization'] },
      { title: '3D Printing', topics: ['FDM basics','Slicing','Material choice','Post-processing'] },
      { title: 'Capstone', topics: ['Design + simulate + print','Report','Demo'] },
    ]),
  },
  { id: 'python-school', title: 'Programming with Python', category: 'school', icon: Code2,
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=1400',
    tagline: 'Start coding from zero — built for school students.',
    level: 'Beginner', duration: '4 weeks', hours: '40+ hrs', rating: 4.8, learners: 3210,
    priceEarly: 2999, price: 4999, mode: 'Live Online', startDate: 'June 2, 2026',
    tags: ['School','Starter'],
    overview: 'A gentle, fun introduction to coding designed for school students. Finish with 3 mini-games and a certificate.',
    whatYouLearn: ['Variables, loops, functions','Lists, dictionaries and files','Mini-games with Python','Simple automations','Intro to libraries','Certificate project'],
    tools: ['Python','Replit','VS Code'],
    prerequisites: ['Class 8 and above'],
    projects: ['Number guessing game','Rock-paper-scissors','Quiz app'],
    curriculum: mk([
      { title: 'Hello Python', topics: ['Install','Variables','Input/output','Math'] },
      { title: 'Control Flow', topics: ['If/else','Loops','Functions','Debugging'] },
      { title: 'Data & Files', topics: ['Lists','Dicts','Files','Mini-project'] },
      { title: 'Projects', topics: ['Games','Automation','Certificate','Showcase'] },
    ]),
  },
  { id: 'web3', title: 'Blockchain & Web 3.0', category: 'college', icon: Bitcoin,
    image: 'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=1400',
    tagline: 'Build dApps, smart contracts & own the next web.',
    level: 'Intermediate', duration: '6 weeks', hours: '80+ hrs', rating: 4.5, learners: 640,
    priceEarly: 5499, price: 8499, mode: 'Live Online + Capstone', startDate: 'June 2, 2026',
    tags: ['Emerging'],
    overview: 'Understand how blockchains work, build smart contracts in Solidity, and ship a full decentralized app to a testnet. Perfect entry to Web 3.0.',
    whatYouLearn: ['Blockchain internals','Solidity smart contracts','Ethereum & EVM','dApp frontends with ethers.js','NFTs and tokens','Testnet deployment'],
    tools: ['Solidity','Hardhat','ethers.js','Metamask','Remix'],
    prerequisites: ['JS basics helpful'],
    projects: ['NFT minting dApp','Voting DAO','Token exchange UI'],
    curriculum: mk([
      { title: 'Blockchain 101', topics: ['Cryptography','Consensus','Wallets','Ethereum'] },
      { title: 'Solidity', topics: ['Types','Contracts','Events','Security'] },
      { title: 'Hardhat & Testing', topics: ['Local node','Tests','Gas','Deploy'] },
      { title: 'Front-end dApps', topics: ['ethers.js','React UI','Metamask','Flows'] },
      { title: 'NFTs & DAOs', topics: ['ERC-721','ERC-20','Voting','Governance'] },
      { title: 'Capstone', topics: ['Ship a dApp','Testnet','Demo','Write-up'] },
    ]),
  },
  { id: 'ai-school', title: 'AI & Robotics for Schools', category: 'school', icon: Boxes,
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=1400',
    tagline: 'Fun intro to AI, vision & basic robotics.',
    level: 'Beginner', duration: '4 weeks', hours: '40+ hrs', rating: 4.9, learners: 1420,
    priceEarly: 3499, price: 5499, mode: 'Live Online', startDate: 'June 2, 2026',
    tags: ['School','Fun'],
    overview: 'School-friendly introduction to artificial intelligence, computer vision, and hands-on robotics concepts. Exciting demos each week.',
    whatYouLearn: ['Scratch and Python basics','Computer vision demos','Simple ML models','Basic robotics concepts','Fun AI projects','Final showcase'],
    tools: ['Scratch','Python','Teachable Machine'],
    prerequisites: ['Class 6 and above'],
    projects: ['Face filter','Chatbot','Virtual robot'],
    curriculum: mk([
      { title: 'AI Basics', topics: ['What is AI?','Scratch intro','First model','Demo'] },
      { title: 'Vision', topics: ['Teachable Machine','Classify objects','Filters','Mini-project'] },
      { title: 'Python + AI', topics: ['Python basics','Simple libs','Chatbot','Showcase prep'] },
      { title: 'Capstone', topics: ['Build + show','Certificate','Feedback','Demo'] },
    ]),
  },
  { id: 'web-school', title: 'Web Dev Starter (Schools)', category: 'school', icon: Code2,
    image: 'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=1400',
    tagline: 'HTML, CSS, JS — build your first websites.',
    level: 'Beginner', duration: '4 weeks', hours: '40+ hrs', rating: 4.7, learners: 890,
    priceEarly: 2999, price: 4999, mode: 'Live Online', startDate: 'June 2, 2026',
    tags: ['School'],
    overview: 'Learn to build your own websites from scratch. Perfect for school students curious about how the web works.',
    whatYouLearn: ['HTML5 structure','CSS styling and layouts','Basic JavaScript','Responsive design','3 mini projects','Certificate'],
    tools: ['HTML','CSS','JavaScript','VS Code'],
    prerequisites: ['Class 8 and above'],
    projects: ['Personal portfolio','Interactive quiz','Landing page'],
    curriculum: mk([
      { title: 'HTML Basics', topics: ['Tags','Structure','Forms','Media'] },
      { title: 'CSS Magic', topics: ['Selectors','Flex/grid','Animations','Responsive'] },
      { title: 'JavaScript', topics: ['Variables','DOM','Events','Mini-game'] },
      { title: 'Projects + Certificate', topics: ['Portfolio','Quiz','Landing','Demo day'] },
    ]),
  },
]

export const MENTORS = [
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

export const PLACEMENTS = [
  { name: 'Abhishek', at: 'Oracle', img: 'https://i.pravatar.cc/80?img=3' },
  { name: 'Riya', at: 'Deloitte', img: 'https://i.pravatar.cc/80?img=5' },
  { name: 'Abhi', at: 'ProcDNA', img: 'https://i.pravatar.cc/80?img=7' },
  { name: 'Kartik', at: 'Amazon', img: 'https://i.pravatar.cc/80?img=13' },
  { name: 'Suhani', at: 'Microsoft', img: 'https://i.pravatar.cc/80?img=16' },
  { name: 'Mitahi', at: 'Accenture', img: 'https://i.pravatar.cc/80?img=20' },
]

export const TESTIMONIALS = [
  { name: 'Abhinav Agarwal', college: 'Mohanlal Sukhadia University', text: 'The practical approach of the sessions was amazing. Instructor explained clearly and gave real-life examples.' },
  { name: 'Siddharth Pandey', college: 'IIT Kanpur', text: 'All in all, one of my best experiences in terms of learning.' },
  { name: 'Asmi Gupta', college: 'Shoolini University', text: 'Hands-on projects like the Online Course Builder and Code Debugging Assistant gave me real exposure to Generative AI.' },
  { name: 'Kashish Sharma', college: 'HPTU, Hamirpur', text: 'Started with zero knowledge of web dev, ended with a solid grasp. Masterclasses were super industry-focused.' },
  { name: 'Suhani Sharma', college: 'MCM DAV Chandigarh', text: 'I can now work with OpenAI APIs, build autonomous agents and fine-tune LLMs. Transformative course.' },
  { name: 'Amoolya Harish', college: 'SRM Chennai', text: 'IoT + Drones was perfect blend of theory and hands-on. Worked with real hardware and drones.' },
]

export const GALLERY = [
  'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=800',
  'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=800',
  'https://images.pexels.com/photos/10638082/pexels-photo-10638082.jpeg?w=800',
  'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=800',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
  'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=800',
]

// ---------- COUNTDOWN ----------
export const useCountdown = (target) => {
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
export function Navbar({ onRegister, currentPath }) {
  // From detail page or home, links use /#section so they always work
  const isHome = currentPath === '/' || !currentPath
  const links = [
    { href: isHome ? '#programs' : '/#programs', label: 'Programs' },
    { href: isHome ? '#mentors'  : '/#mentors',  label: 'Mentors' },
    { href: isHome ? '#highlights': '/#highlights', label: 'Highlights' },
    { href: isHome ? '#testimonials': '/#testimonials', label: 'Reviews' },
    { href: isHome ? '#faq' : '/#faq', label: 'FAQ' },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e3a8a]/10 bg-white/95 backdrop-blur-xl">
      <div className="h-1 w-full bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#f59e0b]" />
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e3a8a] text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="text-left leading-tight">
            <div className="text-[15px] font-extrabold tracking-tight text-[#1e3a8a]">Summer School <span className="text-[#f59e0b]">'26</span></div>
            <div className="text-[11px] text-slate-500">Project-based tech internships</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-[#1e3a8a]">
              {l.label}
            </Link>
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
                  <Link key={l.label} href={l.href} className="text-base font-medium">{l.label}</Link>
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

// ---------- REGISTER DIALOG ----------
export function RegisterDialog({ open, onOpenChange, program }) {
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
    // Pure frontend — simulate a brief submit delay for UX, no backend call
    await new Promise((r) => setTimeout(r, 600))
    setSubmitting(false)
    setDone(true)
    toast.success('Registered! We\u2019ll email you next steps.')
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
