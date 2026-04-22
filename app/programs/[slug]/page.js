'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter, notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  ArrowLeft, ArrowRight, BookOpen, Briefcase, Calendar, CheckCircle2, Clock, FileText,
  Laptop, MessageCircle, Share2, Star, Target, TrendingUp, UserCheck, Video, Zap,
  Award as AwardIcon,
} from 'lucide-react'
import { PROGRAMS, Navbar, RegisterDialog } from '@/components/site/shared'

export default function ProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug
  const program = PROGRAMS.find((p) => p.id === slug)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!program) {
    // Graceful fallback
    return (
      <div className="min-h-screen bg-white">
        <Navbar onRegister={() => {}} currentPath={`/programs/${slug}`} />
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-extrabold text-[#1e3a8a]">Program not found</h1>
          <p className="mt-3 text-slate-600">The program you are looking for doesn't exist or has been moved.</p>
          <Link href="/#programs">
            <Button className="mt-6 bg-[#1e3a8a] text-white">Browse all programs <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    )
  }

  const related = PROGRAMS.filter((p) => p.id !== program.id && p.category === program.category).slice(0, 3)

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: program.title, text: program.tagline, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      }
    } catch (e) {
      // user cancelled
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onRegister={() => setOpen(true)} currentPath={`/programs/${program.id}`} />

      {/* sub-header */}
      <div className="sticky top-[4.25rem] z-30 border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-3">
          <Link href="/#programs" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#1e3a8a]">
            <ArrowLeft className="h-4 w-4" /> Back to Programs
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" size="sm" onClick={share} className="border-[#1e3a8a]/20 text-[#1e3a8a]">
              <Share2 className="mr-1 h-4 w-4" /> Share
            </Button>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 line-through">₹{program.price.toLocaleString()}</div>
              <div className="text-sm font-extrabold text-[#1e3a8a]">₹{program.priceEarly.toLocaleString()} <span className="text-[10px] text-[#f59e0b]">EARLY BIRD</span></div>
            </div>
            <Button onClick={() => setOpen(true)} className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">Enroll Now <ArrowRight className="ml-1 h-4 w-4" /></Button>
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
              <Button size="lg" onClick={() => setOpen(true)} className="bg-[#f59e0b] text-[#1e3a8a] shadow-xl shadow-amber-500/20 hover:bg-[#fbbf24]">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })} className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <BookOpen className="mr-2 h-4 w-4" /> View Curriculum
              </Button>
              <Button size="lg" variant="outline" onClick={share} className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <Share2 className="mr-2 h-4 w-4" /> Share
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

      {/* stats strip */}
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

      {/* body */}
      <section className="py-14">
        <div className="container grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#1e3a8a]">
                <FileText className="h-5 w-5" />
                <h2 className="text-2xl font-extrabold">Program Overview</h2>
              </div>
              <p className="text-base leading-relaxed text-slate-700">{program.overview}</p>
            </div>

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

            <div id="curriculum" className="scroll-mt-28">
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

            {/* Related programs */}
            {related.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2 text-[#1e3a8a]">
                  <TrendingUp className="h-5 w-5" />
                  <h2 className="text-2xl font-extrabold">You might also like</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/programs/${r.id}`} className="group block">
                      <Card className="overflow-hidden border-slate-200 transition group-hover:-translate-y-1 group-hover:shadow-lg">
                        <div className="relative h-28 overflow-hidden">
                          <img src={r.image} alt={r.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b4a]/80 to-transparent" />
                        </div>
                        <CardContent className="p-4">
                          <div className="text-sm font-bold text-[#1e3a8a]">{r.title}</div>
                          <div className="mt-1 text-xs text-slate-500">{r.duration} · {r.level}</div>
                          <div className="mt-2 flex items-center gap-1 text-xs">
                            <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" /> <b className="text-[#1e3a8a]">{r.rating}</b>
                            <span className="ml-auto font-bold text-[#1e3a8a]">₹{r.priceEarly.toLocaleString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* sticky sidebar */}
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
                <Button onClick={() => setOpen(true)} size="lg" className="w-full bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={share} className="w-full border-[#1e3a8a]/20 text-[#1e3a8a]">
                  <Share2 className="mr-2 h-4 w-4" /> Share this program
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

      {/* footer CTA */}
      <section className="bg-white py-12">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-[#1e3a8a] p-10 text-white shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#f59e0b]/30 blur-3xl" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <Badge className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#f59e0b]">Limited Seats</Badge>
                <h3 className="mt-3 text-3xl font-extrabold">Ready to join {program.title}?</h3>
                <p className="mt-2 max-w-xl text-white/85">Secure your seat today and lock the Early Bird price.</p>
              </div>
              <Button size="lg" onClick={() => setOpen(true)} className="bg-[#f59e0b] text-[#1e3a8a] hover:bg-[#fbbf24]">Enroll Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <RegisterDialog open={open} onOpenChange={setOpen} program={program} />
    </div>
  )
}
