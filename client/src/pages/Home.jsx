
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Brain,
  BookOpen,
  Building2,
  Trophy,
  Sparkles,
  CheckCircle2,
  Menu,
  X,
  Target,
  Terminal,
  ChevronRight,
  Zap,
} from "lucide-react";

const categories = [
  {
    icon: Code2,
    number: "01",
    tag: "CODING",
    title: "Data Structures & Algorithms",
    description:
      "Master DSA from basics to advanced with topic-wise roadmaps and company-tagged problems.",
    link: "/dsa",
    action: "Explore DSA",
  },
  {
    icon: BookOpen,
    number: "02",
    tag: "CORE CS",
    title: "Technical Preparation",
    description:
      "Strengthen DBMS, Operating Systems, Computer Networks, OOP and SQL fundamentals.",
    link: "/technical",
    action: "Learn Technical",
  },
  {
    icon: Brain,
    number: "03",
    tag: "APTITUDE",
    title: "Aptitude & Reasoning",
    description:
      "Improve your speed and accuracy with quantitative, logical and verbal practice.",
    link: "/aptitude",
    action: "Start Practicing",
  },
  {
    icon: Building2,
    number: "04",
    tag: "CAREER",
    title: "Company Preparation",
    description:
      "Explore company-wise questions, hiring patterns and interview preparation topics.",
    link: "/companies",
    action: "Explore Companies",
  },
];

const companies = [
  "TCS",
  "Infosys",
  "Wipro",
  "Accenture",
  "Cognizant",
  "HCLTech",
  "Amazon",
  "Microsoft",
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "DSA", to: "/dsa" },
    { label: "Technical", to: "/technical" },
    { label: "Aptitude", to: "/aptitude" },
    { label: "Companies", to: "/companies" },
    { label: "TCS NQT", to: "/tcs-nqt" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090b10] text-[#f5f7fa] selection:bg-lime-400 selection:text-black">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-[-180px] top-[350px] -z-0 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-150px] top-[100px] -z-0 h-[400px] w-[400px] rounded-full bg-lime-400/10 blur-[130px]" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090b10]/85 backdrop-blur-2xl">
        <div className="flex w-full min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-10 w-15 place-items-center rounded-xl bg-lime-400 text-black shadow-lg shadow-lime-400/20">
              <Code2 size={23} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Placement<span className="text-lime-400">Platform</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {navLinks.map((item, index) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm font-medium transition-colors duration-200 hover:text-lime-400 ${
                  index === 0 ? "text-lime-400" : "text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:text-lime-400"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-lime-400/10 transition duration-200 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-lime-400/20"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white transition hover:border-lime-400/50 hover:text-lime-400 xl:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav className="border-t border-white/[0.08] bg-[#0d1017] p-4 xl:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-lime-400/10 hover:text-lime-400"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 py-3 text-center text-sm font-semibold"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-lime-400 py-3 text-center text-sm font-bold text-black"
                >
                  Register
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
<section className="relative z-10 grid w-full grid-cols-1 items-center gap-14 px-4 pb-24 pt-16 sm:px-6 md:pt-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-3200">
        <div className="animate-[fadeUp_.7s_ease-out_both]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.07] px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-lime-300 sm:text-xs">
            <Sparkles size={20} />
            YOUR PLACEMENT JOURNEY STARTS HERE
          </div>

          <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
  Stop searching.
  <br />
  <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
    Start preparing.
  </span>
</h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            Your journey to the dream job starts here. Practice coding,
            master technical concepts and prepare for company interviews
            — all in one place.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-lime-400 px-7 text-sm font-extrabold text-black shadow-xl shadow-lime-400/10 transition duration-300 hover:-translate-y-1 hover:bg-lime-300 hover:shadow-lime-400/20"
            >
              Start Preparing
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>

            <Link
              to="/dsa"
              className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.025] px-7 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-lime-400/50 hover:bg-lime-400/[0.06]"
            >
              <Code2 size={18} className="text-lime-400" />
              Explore DSA
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-400 sm:text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-lime-400" />
              Topic-wise learning
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-lime-400" />
              Company-focused practice
            </span>
          </div>
        </div>

        {/* Coding visual */}
        <div className="relative mx-auto w-full max-w-[540px] animate-[fadeUp_.9s_ease-out_both]">
          <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-lime-400/10 via-transparent to-emerald-400/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#11151d] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />
              </div>
              <span className="font-mono text-xs text-zinc-400">
                placement.cpp
              </span>
              <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-violet-300">
                C++
              </span>
            </div>

            <div className="overflow-x-auto px-4 py-7 font-mono text-xs leading-[2.5] sm:px-7 sm:text-sm">
              <div><span className="mr-5 text-zinc-600">01</span><span className="text-purple-300">class</span> <span className="text-lime-300">FutureDeveloper</span> {"{"}</div>
              <div><span className="mr-5 text-zinc-600">02</span>  <span className="text-purple-300">public:</span></div>
              <div><span className="mr-5 text-zinc-600">03</span>  <span className="text-sky-300">void</span> <span className="text-amber-200">prepare</span>() {"{"}</div>
              <div><span className="mr-5 text-zinc-600">04</span>    learnDSA();</div>
              <div><span className="mr-5 text-zinc-600">05</span>    solveProblems();</div>
              <div><span className="mr-5 text-zinc-600">06</span>    crackInterview();</div>
              <div><span className="mr-5 text-zinc-600">07</span>  {"}"}</div>
              <div><span className="mr-5 text-zinc-600">08</span>{"};"}</div>
            </div>

            <div className="flex items-center gap-3 border-t border-white/[0.08] bg-black/20 px-5 py-4">
              <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_#a3e635]" />
              <span className="text-xs text-zinc-400">
                Output: <strong className="font-semibold text-lime-300">Future ready</strong>
              </span>
              <Trophy size={17} className="ml-auto text-lime-400" />
            </div>
          </div>

          <div className="absolute -right-2 top-[-25px] flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171c23] p-3 shadow-xl sm:-right-5 sm:p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime-400/10 text-lime-400">
              <Target size={21} />
            </span>
            <div>
              <p className="text-xs font-bold text-white sm:text-sm">Practice with purpose</p>
              <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs">One problem at a time</p>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171c23] p-3 shadow-xl sm:-left-5 sm:p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <Trophy size={21} />
            </span>
            <div>
              <p className="text-xs font-bold text-white sm:text-sm">Your dream job</p>
              <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs">Learn. Practice. Succeed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning categories */}
<section className="relative z-10 w-full px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-xs font-extrabold tracking-[0.2em] text-lime-400">
            YOUR LEARNING TOOLKIT
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Everything you need to{" "}
            <span className="text-lime-400">succeed.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
            A focused preparation path for every stage of your placement journey.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                to={category.link}
                key={category.number}
                className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#151923] to-[#0f1117] p-6 transition duration-300 hover:-translate-y-2 hover:border-lime-400/50 hover:shadow-[0_20px_60px_-25px_rgba(163,230,53,0.22)]"
              >
                <span className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-lime-400/0 blur-3xl transition duration-500 group-hover:bg-lime-400/10" />

                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-lime-400/20 bg-lime-400/[0.07] text-lime-400 transition duration-300 group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-black">
                    <Icon size={23} />
                  </span>
                  <span className="font-mono text-xs text-zinc-600">
                    {category.number}
                  </span>
                </div>

                <span className="mt-7 text-[10px] font-extrabold tracking-[0.17em] text-lime-400">
                  {category.tag}
                </span>

                <h3 className="mt-3 text-lg font-bold leading-snug text-white">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {category.description}
                </p>

                <span className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-5 text-sm font-bold text-lime-400">
                  {category.action}
                  <ArrowRight size={18} className="transition duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Companies */}
      <section className="relative z-10 w-full px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-extrabold tracking-[0.2em] text-lime-400">
            YOUR DREAM COMPANY
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Aim high. <span className="text-lime-400">Prepare smarter.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Build your preparation around the companies you want to join.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {companies.map((company) => (
            <Link
              to="/companies"
              key={company}
              className="group flex min-h-[82px] items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4 transition duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:bg-lime-400/[0.04] sm:gap-4 sm:p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#171b22] text-base font-extrabold text-lime-400 transition group-hover:border-lime-400/30 group-hover:bg-lime-400/10">
                {company.charAt(0)}
              </span>
              <span className="text-xs font-bold text-zinc-200 transition group-hover:text-white sm:text-sm">
                {company}
              </span>
              <ChevronRight size={17} className="ml-auto shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-lime-400" />
            </Link>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold transition hover:border-lime-400/50 hover:text-lime-400"
          >
            View all companies <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* TCS NQT banner */}
<section className="relative z-10 w-full px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-lime-300/20 bg-gradient-to-br from-[#1b2516] via-[#111a15] to-[#10151d] p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-lime-400/10" />
          <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border border-lime-400/10" />
          <div className="pointer-events-none absolute bottom-[-120px] right-[20%] h-60 w-60 rounded-full bg-lime-400/[0.07] blur-[90px]" />

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-50xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.08] px-3 py-2 text-[10px] font-extrabold tracking-[0.17em] text-lime-300 sm:text-xs">
                <Zap size={15} /> EXAM PREPARATION
              </span>

              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Make your next attempt
                <span className="block text-lime-400">your best one.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
                Prepare for TCS NQT with focused practice in aptitude,
                reasoning, verbal ability, coding and technical concepts.
              </p>

              <Link
                to="/tcs-nqt"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-lime-400 px-6 py-4 text-sm font-extrabold text-black transition hover:-translate-y-1 hover:bg-lime-300"
              >
                Explore TCS NQT <ArrowRight size={18} />
              </Link>
            </div>

            <div className="hidden h-36 w-36 shrink-0 rotate-6 items-center justify-center rounded-[30px] border border-lime-300/20 bg-lime-400/[0.06] text-lime-400 lg:flex">
              <Trophy size={76} strokeWidth={1.3} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-400 text-black">
              <Terminal size={20} />
            </span>
            <span className="font-extrabold">
              Placement<span className="text-lime-400">Platform</span>
            </span>
          </Link>

          <p className="text-sm text-zinc-500">
            One platform. One goal. Your dream placement.
          </p>

          <span className="text-xs text-zinc-600">
            © 2026 Placement Platform
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

export default Home;
