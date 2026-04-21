'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { toast } from 'sonner'
import {
  GraduationCap, Award, Users, Trophy, Rocket, Star, Clock, PlayCircle, CheckCircle2,
  Search, Menu, ChevronRight, Sparkles, BrainCircuit, Code2, Shield, Cpu, Palette,
  LineChart, Boxes, Bitcoin, Hammer, Heart, ArrowRight, MapPin, Mail, Phone, Calendar
} from 'lucide-react'

// ---------- DATA ----------
const PROGRAMS = [
  {
    id: 'ai-agents',
    title: 'AI Agents & Automation',
    category: 'college',
    icon: BrainCircuit,
    image: 'https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=800',
    tagline: 'Build autonomous AI agents that think, plan & act.',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.9,
    learners: 2340,
    priceEarly: 4999,
    price: 7999,
    highlights: ['LangChain & LangGraph', 'Multi-agent systems', 'Tool calling & RAG', 'Deploy real agents'],
    tags: ['Hands-on', 'GenAI', 'Certificate'],
  },
  {
    id: 'data-science',
    title: 'Data Science & AI',
    category: 'college',
    icon: LineChart,
    image: 'https://images.unsplash.com/photo-1753613648137-602c669cbe07?w=800',
    tagline: 'From Python to ML models deployed in production.',
    level: 'Beginner → Advanced',
    duration: '8 weeks',
    rating: 4.8,
    learners: 5120,
    priceEarly: 4999,
    price: 7999,
    highlights: ['Python, Pandas, NumPy', 'Machine Learning', 'Deep Learning', 'Kaggle project'],
    tags: ['Bestseller', 'Project-based'],
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Web Development',
    category: 'college',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=800',
    tagline: 'Next.js, React, Node, MongoDB — ship real apps.',
    level: 'Beginner friendly',
    duration: '8 weeks',
    rating: 4.9,
    learners: 4280,
    priceEarly: 4999,
    price: 7999,
    highlights: ['React + Next.js 14', 'REST & Auth', 'Databases', 'Deploy to cloud'],
    tags: ['Trending', 'Internship'],
  },
  {
    id: 'cybersecurity',
    title: 'Ethical Hacking & Cybersecurity',
    category: 'college',
    icon: Shield,
    image: 'https://images.pexels.com/photos/10638082/pexels-photo-10638082.jpeg?w=800',
    tagline: 'Break things ethically. Protect systems at scale.',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.7,
    learners: 1820,
    priceEarly: 4999,
    price: 7999,
    highlights: ['Kali Linux', 'Pen-testing', 'Web & network security', 'CTF challenges'],
    tags: ['Hands-on Labs'],
  },
  {
    id: 'iot',
    title: 'Internet of Things & Drones',
    category: 'college',
    icon: Cpu,
    image: 'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=800',
    tagline: 'Build connected devices, sensors and smart drones.',
    level: 'Beginner',
    duration: '6 weeks',
    rating: 4.6,
    learners: 1240,
    priceEarly: 5499,
    price: 8499,
    highlights: ['Arduino & ESP32', 'MQTT & Cloud', 'Drone fundamentals', 'Capstone project'],
    tags: ['Hardware Kit'],
  },
  {
    id: 'uiux',
    title: 'UI/UX & Digital Marketing',
    category: 'college',
    icon: Palette,
    image: 'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=800',
    tagline: 'Design beautifully. Market effectively.',
    level: 'Beginner',
    duration: '5 weeks',
    rating: 4.7,
    learners: 980,
    priceEarly: 3999,
    price: 6499,
    highlights: ['Figma & prototyping', 'SEO & ads', 'Brand strategy', 'Portfolio project'],
    tags: ['Portfolio'],
  },
  {
    id: 'genai',
    title: 'LLMs, GenAI & Agentic AI',
    category: 'college',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=800',
    tagline: 'Master OpenAI, Claude, Gemini & build agents.',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.9,
    learners: 3650,
    priceEarly: 5499,
    price: 8499,
    highlights: ['Prompt engineering', 'Fine-tuning', 'RAG systems', 'Agent orchestration'],
    tags: ['New', 'Hot'],
  },
  {
    id: 'cad-ansys',
    title: 'CAD, ANSYS & Additive Manufacturing',
    category: 'college',
    icon: Hammer,
    image: 'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=800',
    tagline: 'Design, simulate, and 3D-print with pros.',
    level: 'Beginner',
    duration: '6 weeks',
    rating: 4.6,
    learners: 720,
    priceEarly: 4999,
    price: 7999,
    highlights: ['SolidWorks', 'ANSYS simulations', '3D printing', 'Industry project'],
    tags: ['Engineering'],
  },
  {
    id: 'python-school',
    title: 'Programming with Python',
    category: 'school',
    icon: Code2,
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=800',
    tagline: 'Start coding from zero — built for school students.',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.8,
    learners: 3210,
    priceEarly: 2999,
    price: 4999,
    highlights: ['Python basics', 'Mini games', 'Automate with Python', 'Certificate'],
    tags: ['School', 'Starter'],
  },
  {
    id: 'web3',
    title: 'Blockchain & Web 3.0',
    category: 'college',
    icon: Bitcoin,
    image: 'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=800',
    tagline: 'Build dApps, smart contracts & own the next web.',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: 4.5,
    learners: 640,
    priceEarly: 5499,
    price: 8499,
    highlights: ['Solidity & EVM', 'Smart contracts', 'NFT dApp', 'Deploy on testnet'],
    tags: ['Emerging'],
  },
  {
    id: 'ai-school',
    title: 'AI & Robotics for Schools',
    category: 'school',
    icon: Boxes,
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=800',
    tagline: 'Fun intro to AI, vision & basic robotics.',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.9,
    learners: 1420,
    priceEarly: 3499,
    price: 5499,
    highlights: ['Scratch & Python', 'Vision models', 'Build a bot', 'Showcase demo'],
    tags: ['School', 'Fun'],
  },
  {
    id: 'web-school',
    title: 'Web Dev Starter (Schools)',
    category: 'school',
    icon: Code2,
    image: 'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=800',
    tagline: 'HTML, CSS, JS — build your first websites.',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.7,
    learners: 890,
    priceEarly: 2999,
    price: 4999,
    highlights: ['HTML/CSS/JS', 'Responsive design', '3 mini projects', 'Certificate'],
    tags: ['School'],
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
  { name: 'Dr. Navneet Kumar', role: 'Program Advisor, Summer School', img: 'https://i.pravatar.cc/160?img=53' },
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
  { name: 'Abhinav Agarwal', college: 'Mohanlal Sukhadia University', text: 'The practical approach of the sessions was amazing. Instructor explained clearly and gave real-life examples. Super supportive learning environment.' },
  { name: 'Siddharth Pandey', college: 'IIT Kanpur', text: 'All in all, one of my best experiences in terms of learning.' },
  { name: 'Asmi Gupta', college: 'Shoolini University', text: 'Hands-on projects like Online Course Builder, Code Debugging Assistant and Smart Study Scheduler gave me real exposure to Generative AI.' },
  { name: 'Kashish Sharma', college: 'HPTU, Hamirpur', text: 'Started with zero knowledge of web dev, ended with a solid grasp. Masterclasses were insightful and industry-focused.' },
  { name: 'Suhani Sharma', college: 'MCM DAV Chandigarh', text: 'I can now work with OpenAI APIs, build autonomous agents and fine-tune LLMs. Transformative course.' },
  { name: 'Amoolya Harish', college: 'SRM Chennai', text: 'IoT + Drones program was perfect blend of theory and hands-on. Worked with real hardware and drones.' },
]

const GALLERY = [
  'https://images.pexels.com/photos/8423016/pexels-photo-8423016.jpeg?w=700',
  'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?w=700',
  'https://images.pexels.com/photos/10638082/pexels-photo-10638082.jpeg?w=700',
  'https://images.pexels.com/photos/7743256/pexels-photo-7743256.jpeg?w=700',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700',
  'https://images.unsplash.com/photo-1526253038957-bce54e05968e?w=700',
]

// ---------- HELPERS ----------
const useCountdown = (target) => {
  const [now, setNow] = useState(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  if (now == null) return { d: 9, h: 16, m: 0, s: 0, ready: false }
  const diff = Math.max(0, target - now)
  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const m = Math.floor((diff / (1000 * 60)) % 60)
  const s = Math.floor((diff / 1000) % 60)
  return { d, h, m, s, ready: true }
}

// ---------- COMPONENTS ----------
function Navbar({ onRegister }) {
  const links = [
    { href: '#programs', label: 'Programs' },
    { href: '#mentors', label: 'Mentors' },
    { href: '#highlights', label: 'Highlights' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#faq', label: 'FAQ' },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight">Summer School <span className="text-violet-600">'26</span></div>
            <div className="text-[11px] text-muted-foreground">Project-based tech internships</div>
          </div>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={onRegister} className="hidden bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:opacity-95 md:inline-flex">
            Register Now <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-4">
                {links.map((l) => (
                  <a key={l.href} href={l.href} className="text-base font-medium">{l.label}</a>
                ))}
                <Button onClick={onRegister} className="mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white">Register Now</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Hero({ onRegister, onExplore }) {
  // Target: May 15, 2026 for final close; early-bird ends in ~9 days from "today" dynamic
  const earlyBird = useMemo(() => Date.now() + 9 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000, [])
  const c = useCountdown(earlyBird)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-background to-background">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-400/30 via-fuchsia-300/20 to-transparent blur-3xl" />
      <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <Badge className="w-fit bg-violet-100 text-violet-700 hover:bg-violet-100">🎓 Summer School 2026 · IIT Campus</Badge>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Launch your tech career this <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">summer</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Project-based internships in <b>GenAI, Data Science, Full-Stack, Cybersecurity, IoT &amp; more</b>. Learn from IIT faculty and mentors at Meta, Amazon, Oracle — and ship real projects.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" onClick={onRegister} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-xl shadow-violet-500/25">
              Register Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={onExplore}>
              <PlayCircle className="mr-2 h-4 w-4" /> Explore Programs
            </Button>
          </div>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-4 text-center">
            {[{ n: '25K+', l: 'Learners' }, { n: '50+', l: 'Mentors' }, { n: '12', l: 'Programs' }].map((s, i) => (
              <div key={i} className="rounded-lg border border-border/60 bg-card p-3">
                <div className="text-xl font-bold text-violet-700">{s.n}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-2xl shadow-violet-500/10">
            <img src="https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?w=1200" alt="Students learning" className="h-[380px] w-full object-cover lg:h-[460px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 via-violet-900/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider text-violet-700">Early Bird closes in</div>
                  <div className="text-sm text-muted-foreground">Subsidized fee · limited seats</div>
                </div>
                <Calendar className="h-5 w-5 text-violet-600" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                {[{ v: c.d, l: 'Days' }, { v: c.h, l: 'Hours' }, { v: c.m, l: 'Min' }, { v: c.s, l: 'Sec' }].map((t, i) => (
                  <div key={i} className="rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 py-2 text-white">
                    <div className="text-lg font-bold leading-none">{String(t.v).padStart(2, '0')}</div>
                    <div className="text-[10px] opacity-90">{t.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 hidden rounded-xl border border-border/60 bg-card p-3 shadow-lg lg:block">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600"><Trophy className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-semibold">Placed at Top Cos.</div>
                <div className="text-xs text-muted-foreground">Meta · Amazon · Oracle</div>
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
    { icon: Rocket, title: 'Project-Based Hands-On Learning', desc: 'Real-world exposure to in-demand skills.' },
    { icon: Users, title: 'Expert Mentorship', desc: 'IIT faculty + mentors from top companies.' },
    { icon: Award, title: 'Internship Certificate', desc: 'Earn a verifiable certificate on completion.' },
    { icon: Trophy, title: 'Competitions & Hackathons', desc: 'National-level showcase for your projects.' },
  ]
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="container grid gap-6 py-10 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-background">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-muted-foreground">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Programs({ onEnroll }) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = PROGRAMS.filter((p) => {
    const byCat = filter === 'all' || p.category === filter
    const byQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tagline.toLowerCase().includes(query.toLowerCase())
    return byCat && byQ
  })

  return (
    <section id="programs" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">Programs at a Glance</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Pick your path for Summer '26</h2>
          <p className="mt-3 text-muted-foreground">10+ industry-grade programs for college and school students. Every program ends with a capstone project.</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="college">For College</TabsTrigger>
              <TabsTrigger value="school">For School</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search programs, e.g. AI, Python…" className="pl-9" />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.id} className="group overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10">
              <div className="relative h-44 overflow-hidden">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-3 top-3 flex gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="bg-white/90 text-violet-700 hover:bg-white">{t}</Badge>
                  ))}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur"><p.icon className="h-5 w-5" /></div>
                  <div className="text-sm font-semibold capitalize">{p.category} Program</div>
                </div>
              </div>
              <CardHeader className="space-y-2 pb-3">
                <div className="text-lg font-bold leading-snug">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.tagline}</div>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> <b className="text-foreground">{p.rating}</b></span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {p.learners.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {p.duration}</span>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" /> {h}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t bg-muted/30 pt-4">
                <div>
                  <div className="text-xs text-muted-foreground line-through">₹{p.price.toLocaleString()}</div>
                  <div className="text-lg font-bold text-violet-700">₹{p.priceEarly.toLocaleString()}<span className="ml-1 text-xs font-normal text-muted-foreground">early bird</span></div>
                </div>
                <Button onClick={() => onEnroll(p)} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white">Enroll <ChevronRight className="ml-1 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground">No programs match your search.</div>
        )}
      </div>
    </section>
  )
}

function Placements() {
  return (
    <section className="bg-gradient-to-b from-background to-violet-50/50 py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Placements</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Where our students landed</h2>
          <p className="mt-3 text-muted-foreground">Past cohort students joined top product & consulting companies.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {PLACEMENTS.map((s, i) => (
            <Card key={i} className="border-border/60 text-center">
              <CardContent className="flex flex-col items-center gap-2 p-5">
                <Avatar className="h-14 w-14 ring-2 ring-violet-200">
                  <AvatarImage src={s.img} />
                  <AvatarFallback>{s.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm font-semibold">{s.name}</div>
                <Badge variant="secondary" className="bg-violet-100 text-violet-700">Placed at {s.at}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Categories({ onEnroll }) {
  const college = PROGRAMS.filter((p) => p.category === 'college').slice(0, 6)
  const school = PROGRAMS.filter((p) => p.category === 'school')
  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-100">Program Domains</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">For College & School students</h2>
          <p className="mt-3 text-muted-foreground">Follow the steps specified in each program to register.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-violet-600 to-fuchsia-500 p-8 text-white shadow-xl">
            <GraduationCap className="h-10 w-10 opacity-80" />
            <h3 className="mt-4 text-2xl font-bold">For College Students</h3>
            <p className="mt-2 max-w-sm text-white/85">Internship-grade programs in AI, Data Science, Full-Stack, Cybersecurity, IoT and more.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {college.map((p) => (
                <Badge key={p.id} onClick={() => onEnroll(p)} className="cursor-pointer bg-white/15 text-white backdrop-blur hover:bg-white/25">{p.title}</Badge>
              ))}
            </div>
            <Button variant="secondary" className="mt-6 bg-white text-violet-700 hover:bg-white/90" onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}>Explore College Programs <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-500 to-teal-500 p-8 text-white shadow-xl">
            <Boxes className="h-10 w-10 opacity-80" />
            <h3 className="mt-4 text-2xl font-bold">For School Students</h3>
            <p className="mt-2 max-w-sm text-white/85">Gentle, fun intros to Python, Web Dev, AI & robotics — designed for curious school kids.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {school.map((p) => (
                <Badge key={p.id} onClick={() => onEnroll(p)} className="cursor-pointer bg-white/15 text-white backdrop-blur hover:bg-white/25">{p.title}</Badge>
              ))}
            </div>
            <Button variant="secondary" className="mt-6 bg-white text-emerald-700 hover:bg-white/90" onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}>Explore School Programs <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Mentors() {
  return (
    <section id="mentors" className="bg-card/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">Program Mentors</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Learn from the best in industry & academia</h2>
          <p className="mt-3 text-muted-foreground">Interact with mentors for better exposure and career insights.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {MENTORS.map((m, i) => (
            <Card key={i} className="border-border/60 transition hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Avatar className="h-20 w-20 ring-4 ring-violet-100">
                  <AvatarImage src={m.img} />
                  <AvatarFallback>{m.name[0]}</AvatarFallback>
                </Avatar>
                <div className="mt-3 text-base font-semibold">{m.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{m.role}</div>
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
    <section id="highlights" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Program Highlights</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Glimpses from earlier editions</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-xl ${i % 5 === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img src={g} alt="highlight" className="h-60 w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Advisor() {
  return (
    <section className="bg-gradient-to-r from-violet-600 to-fuchsia-500 py-20 text-white">
      <div className="container grid items-center gap-10 md:grid-cols-[240px_1fr]">
        <div className="flex justify-center md:justify-start">
          <Avatar className="h-48 w-48 ring-4 ring-white/40">
            <AvatarImage src="https://i.pravatar.cc/240?img=53" />
            <AvatarFallback>NK</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <Badge className="bg-white/15 text-white hover:bg-white/20">Message from Program Advisor</Badge>
          <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Project-based learning, IIT faculty, real mentors.</h3>
          <p className="mt-4 max-w-2xl text-white/85">
            Our Summer School 2026 is a project-based internship and job-training program designed to equip students with future-ready skills in GenAI, AI Agents, Data Science, Cybersecurity, CAD, IoT and more. We aim to empower and up-skill students across India through hands-on learning and expert mentorship — bridging the gap between academic knowledge and industry readiness.
          </p>
          <div className="mt-5">
            <div className="font-semibold">Prof. Navneet Kumar</div>
            <div className="text-sm text-white/80">Program Advisor, Summer School 2026 · IIT Campus</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">Student Feedbacks</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Loved by 25,000+ students</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} className="border-border/60">
              <CardContent className="space-y-3 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">“{t.text}”</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-violet-100 text-violet-700">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.college}</div>
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
    { q: 'Who can apply for Summer School 2026?', a: 'Both college and school students across India can apply. Specific programs mention their eligibility on the program card.' },
    { q: 'Is this program online or offline?', a: 'Most programs are delivered live online with hands-on labs. Select cohorts may include on-campus capstone week.' },
    { q: 'Do I get a certificate?', a: 'Yes. On successful completion of assignments and capstone project, you receive an internship/training certificate.' },
    { q: 'When are the last dates?', a: 'Early Bird (subsidized fee) closes April 30, 2026. Final registration closes May 15, 2026. Seats are limited.' },
    { q: 'What is the refund policy?', a: 'You may request a refund within the first 3 days of the program start, minus a small processing fee.' },
  ]
  return (
    <section id="faq" className="bg-card/30 py-20">
      <div className="container max-w-3xl">
        <div className="text-center">
          <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">FAQ</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Common Questions</h2>
        </div>
        <Accordion type="single" collapsible className="mt-8">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-left">{it.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
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
      <section className="py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-rose-500 p-10 text-white shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <Badge className="bg-white/15 text-white hover:bg-white/20">Limited Seats</Badge>
                <h3 className="mt-3 text-3xl font-bold">Reserve your seat for Summer School '26</h3>
                <p className="mt-2 max-w-xl text-white/90">Early Bird closes April 30, 2026. Final registration closes May 15, 2026.</p>
              </div>
              <Button size="lg" onClick={onRegister} className="bg-white text-violet-700 hover:bg-white/90">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-card/30 py-10">
        <div className="container grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="font-bold">Summer School '26</div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Project-based tech internships for college & school students, powered by IIT faculty and industry mentors.</p>
          </div>
          <div>
            <div className="font-semibold">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#programs" className="hover:text-foreground">Programs</a></li>
              <li><a href="#mentors" className="hover:text-foreground">Mentors</a></li>
              <li><a href="#testimonials" className="hover:text-foreground">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> summerschool@example.edu</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> IIT Campus, India</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Built with</div>
            <p className="mt-3 text-sm text-muted-foreground">❤ for learners. Inspired by the IIT Jammu Summer School experience.</p>
          </div>
        </div>
        <div className="container mt-8 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Summer School. All rights reserved.
        </div>
      </footer>
    </>
  )
}

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
      toast.success('Registered! We\u2019ll email you the next steps.')
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
          <DialogTitle>{done ? 'You\u2019re in! 🎉' : 'Register for Summer School \'26'}</DialogTitle>
          <DialogDescription>
            {done
              ? 'Check your inbox for confirmation and payment details within 24 hours.'
              : (program
                  ? <>Enrolling for <b>{program.title}</b> · <span className="text-violet-700 font-semibold">₹{program.priceEarly.toLocaleString()}</span> early bird</>
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
              <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white">
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
            <p className="mt-4 text-muted-foreground">Seat reserved for <b>{program?.title}</b>. Our team will reach out shortly.</p>
            <Button className="mt-6" onClick={() => onOpenChange(false)}>Done</Button>
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

  const openRegister = (p) => {
    setProgram(p || PROGRAMS[0])
    setOpen(true)
  }
  const scrollToPrograms = () => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onRegister={() => openRegister(null)} />
      <main>
        <Hero onRegister={() => openRegister(null)} onExplore={scrollToPrograms} />
        <ValueProps />
        <Programs onEnroll={openRegister} />
        <Placements />
        <Categories onEnroll={openRegister} />
        <Mentors />
        <Highlights />
        <Advisor />
        <Testimonials />
        <FAQ />
        <CTAFooter onRegister={() => openRegister(null)} />
      </main>
      <RegisterDialog open={open} onOpenChange={setOpen} program={program} />
    </div>
  )
}

export default App
