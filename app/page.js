'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import {
  GraduationCap, Users, Trophy, Rocket, Star, Clock, PlayCircle, CheckCircle2,
  Search, ChevronRight, ArrowRight, MapPin, Mail, Phone, Calendar,
  Video, Boxes, BadgeCheck, TrendingUp, UserCheck, Award as AwardIcon,
} from 'lucide-react'
import { PROGRAMS, MENTORS, PLACEMENTS, TESTIMONIALS, GALLERY, useCountdown, Navbar, RegisterDialog } from '@/components/site/shared'

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

function Programs() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const filtered = PROGRAMS.filter((p) => {
    const byCat = filter === 'all' || p.category === filter
    const byQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tagline.toLowerCase().includes(query.toLowerCase())
    return byCat && byQ
  })
  return (
    <section id="programs" className="scroll-mt-20 bg-slate-50 py-20">
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
            <Link href={`/programs/${p.id}`} key={p.id} className="group block">
              <Card className="overflow-hidden border-slate-200 transition-all group-hover:-translate-y-1 group-hover:border-[#1e3a8a]/30 group-hover:shadow-2xl group-hover:shadow-[#1e3a8a]/10">
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
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#1e3a8a] px-3 py-2 text-sm font-medium text-white transition group-hover:bg-[#1e40af]">
                    More Details <ChevronRight className="h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-10 text-center text-slate-500">No programs match your search.</div>
        )}
      </div>
    </section>
  )
}

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

function Categories() {
  const college = PROGRAMS.filter((p) => p.category === 'college').slice(0, 6)
  const school = PROGRAMS.filter((p) => p.category === 'school')
  return (
    <section className="bg-slate-50 py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] hover:bg-[#1e3a8a]/10">Program Domains</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1e3a8a] sm:text-4xl">For College & School students</h2>
          <p className="mt-3 text-slate-600">Click any program below to open its full details & curriculum.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-[#1e3a8a] p-8 text-white shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f59e0b]/30 blur-3xl" />
            <GraduationCap className="h-10 w-10 text-[#f59e0b]" />
            <h3 className="mt-4 text-2xl font-extrabold">For College Students</h3>
            <p className="mt-2 max-w-sm text-white/85">Internship-grade programs in AI, Data Science, Full-Stack, Cybersecurity, IoT & more.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {college.map((p) => (
                <Link key={p.id} href={`/programs/${p.id}`}>
                  <Badge className="cursor-pointer bg-white/10 text-white backdrop-blur hover:bg-white/20">{p.title}</Badge>
                </Link>
              ))}
            </div>
            <a href="#programs">
              <Button variant="secondary" className="mt-6 bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">Explore College Programs <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </a>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[#0f766e] p-8 text-white shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <Boxes className="h-10 w-10 text-[#f59e0b]" />
            <h3 className="mt-4 text-2xl font-extrabold">For School Students</h3>
            <p className="mt-2 max-w-sm text-white/85">Fun intros to Python, Web Dev, AI & robotics — designed for curious school kids.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {school.map((p) => (
                <Link key={p.id} href={`/programs/${p.id}`}>
                  <Badge className="cursor-pointer bg-white/10 text-white backdrop-blur hover:bg-white/20">{p.title}</Badge>
                </Link>
              ))}
            </div>
            <a href="#programs">
              <Button variant="secondary" className="mt-6 bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">Explore School Programs <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Mentors() {
  return (
    <section id="mentors" className="scroll-mt-20 bg-white py-20">
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
    <section id="highlights" className="scroll-mt-20 bg-slate-50 py-20">
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
    <section id="testimonials" className="scroll-mt-20 bg-white py-20">
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
    <section id="faq" className="scroll-mt-20 bg-slate-50 py-20">
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

// ---------- MAIN ----------
const App = () => {
  const [open, setOpen] = useState(false)
  const [program, setProgram] = useState(null)

  // When we land on home with a hash, smoothly scroll to it (handles nav from detail page)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120)
    }
  }, [])

  const openRegister = (p) => {
    setProgram(p || PROGRAMS[0])
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onRegister={() => openRegister(null)} currentPath="/" />
      <main>
        <Hero
          onRegister={() => openRegister(null)}
          onExplore={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <ValueProps />
        <Programs />
        <Placements />
        <Categories />
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
