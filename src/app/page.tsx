import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Sparkles,
  Users,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090A] text-white selection:bg-purple-500/30">
      {/* Navigation */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#08090A]/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              TutorLink
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
              <Link
                href="#features"
                className="transition-colors hover:text-white"
              >
                Features
              </Link>
              <Link
                href="#stats"
                className="transition-colors hover:text-white"
              >
                Stats
              </Link>
              <Link
                href="#join-us"
                className="transition-colors hover:text-white"
              >
                Join Us
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Added standout Dashboard CTA for logged-in users */}
            <Link href="/dashboard">
              <Button
                size="sm"
                className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 font-medium text-blue-400 transition-colors hover:bg-blue-500/20 hover:text-blue-300 md:flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            <Link
              href="#"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:block"
            >
              Log in
            </Link>
            <Button
              size="sm"
              className="rounded-full bg-white px-4 font-medium text-black hover:bg-zinc-200"
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-48 md:pb-32">
          {/* Background Glows */}
          <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 opacity-30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mix-blend-screen blur-[100px]" />
          </div>

          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-blue-300 duration-1000">
              <span>New: AI-Powered Study Notes</span>
              <ChevronRight className="h-3 w-3" />
            </div>

            <h1 className="animate-in fade-in slide-in-from-bottom-8 mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-semibold tracking-tighter text-transparent delay-100 duration-1000 md:text-7xl">
              Master your studies with <br className="hidden md:block" />
              purpose-built tutoring.
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-8 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 delay-200 duration-1000 md:text-xl">
              Struggling with homework or exam prep? TutorLink matches you with
              verified tutors in seconds and provides AI-powered study notes to
              keep you ahead.
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-8 flex flex-col items-center justify-center gap-4 delay-300 duration-1000 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-zinc-200"
              >
                Find Tutors
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group h-12 rounded-full border-white/10 bg-transparent px-8 text-base text-white hover:bg-white/5"
              >
                How It Works
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Hero Image / Dashboard Preview */}
            <div className="group relative mt-20 perspective-[2000px]">
              <div className="relative mx-auto aspect-[16/9] max-w-4xl rotate-x-12 transform overflow-hidden rounded-xl border border-white/10 bg-[#0F1115] shadow-2xl transition-transform duration-700 ease-out group-hover:rotate-x-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-50" />

                {/* Fake UI Elements mimicking the app */}
                <div className="flex h-full flex-col p-6">
                  {/* Header UI */}
                  <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20" />
                      <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20" />
                      <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20" />
                    </div>
                    <div className="h-2 w-32 rounded-full bg-white/10" />
                  </div>

                  {/* Main Content UI */}
                  <div className="flex h-full gap-6">
                    <div className="hidden w-64 flex-col gap-3 border-r border-white/5 pr-6 md:flex">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-10 w-full animate-pulse rounded-lg bg-white/5"
                          style={{ opacity: 1 - i * 0.2 }}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-8 w-48 items-center rounded-lg border border-blue-500/30 bg-blue-500/20 px-3 text-xs text-blue-300">
                          Upcoming Session: Calculus I
                        </div>
                        <div className="h-8 w-8 rounded-full bg-white/10" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 rounded-xl border border-white/5 bg-white/5 p-4">
                          <div className="mb-2 h-4 w-24 rounded bg-white/20" />
                          <div className="mb-1 h-2 w-full rounded bg-white/10" />
                          <div className="h-2 w-2/3 rounded bg-white/10" />
                        </div>
                        <div className="h-32 rounded-xl border border-white/5 bg-white/5 p-4">
                          <div className="mb-2 h-4 w-24 rounded bg-white/20" />
                          <div className="mb-1 h-2 w-full rounded bg-white/10" />
                          <div className="h-2 w-2/3 rounded bg-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Reflection/Shadow */}
              <div className="absolute inset-x-0 -bottom-20 z-20 h-40 bg-gradient-to-t from-[#08090A] to-transparent" />
            </div>
          </div>
        </section>

        {/* Features Grid (Bento Style) */}
        <section className="bg-[#08090A] px-6 py-24" id="features">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Made for modern education
              </h2>
              <p className="mx-auto max-w-xl text-zinc-400">
                TutorLink is shaped by the needs of students and tutors alike:
                relentless focus, fast connections, and a commitment to quality.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Card 1: For Students (Large) */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F1115] p-8 transition-colors hover:border-white/20 md:col-span-2 md:p-12">
                <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] transition-colors group-hover:bg-blue-500/20" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4 text-2xl font-medium text-white">
                    For Students
                  </h3>
                  <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 font-medium text-zinc-200">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">
                          1
                        </span>
                        Create Your Profile
                      </div>
                      <p className="pl-9 text-sm text-zinc-500">
                        Set up your academic goals and preferences in seconds.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 font-medium text-zinc-200">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">
                          2
                        </span>
                        Get Matched Instantly
                      </div>
                      <p className="pl-9 text-sm text-zinc-500">
                        Our algorithm finds the perfect verified tutor for you.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 font-medium text-zinc-200">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">
                          3
                        </span>
                        Start a Live Session
                      </div>
                      <p className="pl-9 text-sm text-zinc-500">
                        Connect via high-quality video and collaborative
                        whiteboard.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 font-medium text-zinc-200">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-xs text-purple-400">
                          4
                        </span>
                        Review with AI
                      </div>
                      <p className="pl-9 text-sm text-zinc-500">
                        Get automated summaries and study notes after every
                        class.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: For Tutors (Tall) */}
              <div className="group relative row-span-1 flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F1115] p-8 transition-colors hover:border-white/20 md:col-span-1 md:row-span-2">
                <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-purple-500/10 to-transparent" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4 text-2xl font-medium text-white">
                    For Tutors
                  </h3>
                  <p className="mb-8 text-zinc-400">
                    Share your knowledge and earn on your schedule.
                  </p>

                  <div className="flex-1 space-y-6">
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <h4 className="mb-1 font-medium text-zinc-200">
                        Add Expertise
                      </h4>
                      <p className="text-xs text-zinc-500">
                        List your subjects and verify credentials.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <h4 className="mb-1 font-medium text-zinc-200">
                        Share Knowledge
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Teach students globally with our tools.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <h4 className="mb-1 font-medium text-zinc-200">
                        Connect & Earn
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Get paid securely and build your reputation.
                      </p>
                    </div>
                  </div>

                  <Button className="mt-8 w-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
                    Apply as Tutor
                  </Button>
                </div>
              </div>

              {/* Card 3: Feature Highlight (Small) */}
              <div className="group flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F1115] p-8 transition-colors hover:border-white/20 sm:flex-row md:col-span-2 md:p-10">
                <div className="flex-1 space-y-4">
                  <div className="mb-2 flex items-center gap-2 text-purple-400">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-medium tracking-wider uppercase">
                      AI Powered
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    Study Smarter, Not Harder
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Our AI analyzes your sessions to create personalized quizzes
                    and flashcards automatically.
                  </p>
                </div>
                <div className="relative flex h-32 w-full items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 sm:w-48">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">A+</div>
                    <div className="text-[10px] tracking-wider text-white/60 uppercase">
                      Grade Goal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="border-t border-white/5 py-20" id="stats">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div>
                <div className="mb-1 text-3xl font-bold text-white">10k+</div>
                <div className="text-sm text-zinc-500">Active Students</div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-zinc-500">Verified Tutors</div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-zinc-500">Satisfaction Rate</div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-zinc-500">Live Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden px-6 py-32" id="join-us">
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090A] via-[#0F1115] to-[#08090A]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="relative z-10 container mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-semibold tracking-tighter text-white md:text-5xl">
              Ready to transform your grades?
            </h2>
            <p className="mb-10 text-lg text-zinc-400">
              Join thousands of students who are mastering their subjects with
              TutorLink.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full bg-white px-8 text-black hover:bg-zinc-200"
              >
                Get Started for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/10 bg-transparent px-8 text-white hover:bg-white/5"
              >
                View Tutor Profiles
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#08090A] px-6 py-12 text-sm">
          <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-zinc-500 md:flex-row">
            <div className="flex items-center gap-2 text-zinc-300">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <span className="font-medium">TutorLink</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                GitHub
              </Link>
            </div>
            <div>© 2025 TutorLink Inc.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
