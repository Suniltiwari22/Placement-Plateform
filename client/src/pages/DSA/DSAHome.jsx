
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Flame,
  Layers3,
  Search,
  Trophy,
  Zap,
  Sparkles,
  Menu,
  X,
  Target,
  Database,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import api from "../../services/api";

const difficultyStyles = {
  easy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  medium: "border-amber-400/20 bg-amber-400/10 text-amber-400",
  hard: "border-rose-400/20 bg-rose-400/10 text-rose-400",
};

export default function DSAHome() {
  const [sections, setSections] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [sectionRes, topicRes, questionRes] = await Promise.all([
          api.get("/api/dsa-sections"),
          api.get("/api/topics"),
          api.get("/api/questions?limit=100"),
        ]);

        if (!mounted) return;

        const sectionData =
          sectionRes.data.sections ?? sectionRes.data.data ?? [];
        const topicData =
          topicRes.data.topics ?? topicRes.data.data ?? [];
        const questionData =
          questionRes.data.questions ?? questionRes.data.data ?? [];

        setSections(sectionData);
        setTopics(topicData);
        setQuestions(questionData);

        if (sectionData.length) {
          setExpanded({ [sectionData[0]._id]: true });
        }
      } catch (err) {
        console.error("Failed to load DSA data:", err);
        if (mounted) {
          setError("Could not load DSA data. Please check your connection.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const dsaQuestions = useMemo(
    () =>
      questions.filter((q) => {
        const category = q.category;
        return (
          !category ||
          category.slug === "dsa" ||
          category.name?.toLowerCase() === "dsa"
        );
      }),
    [questions]
  );

  const getTopicQuestions = (topicId) =>
    dsaQuestions.filter((q) => {
      const id = q.topic?._id || q.topic;
      return String(id || "") === String(topicId);
    });

  const getSectionQuestions = (sectionId) =>
    dsaQuestions.filter((q) => {
      const id = q.section?._id || q.section;
      return String(id || "") === String(sectionId);
    });

  const easyCount = dsaQuestions.filter(
    (q) => q.difficulty?.toLowerCase() === "easy"
  ).length;

  const mediumCount = dsaQuestions.filter(
    (q) => q.difficulty?.toLowerCase() === "medium"
  ).length;

  const hardCount = dsaQuestions.filter(
    (q) => q.difficulty?.toLowerCase() === "hard"
  ).length;

  const solvedCount = dsaQuestions.filter(
    (q) => q.isSolved === true
  ).length;

  const progress = dsaQuestions.length
    ? Math.round((solvedCount / dsaQuestions.length) * 100)
    : 0;

  const filteredSections = useMemo(() => {
    const term = search.trim().toLowerCase();

    return [...sections]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((section, index) => {
        const sectionTopics = topics
          .filter((topic) => {
            const id = topic.section?._id || topic.section;
            return String(id || "") === String(section._id);
          })
          .filter((topic) => {
            const topicQuestions = dsaQuestions.filter((q) => {
              const id = q.topic?._id || q.topic;
              return String(id || "") === String(topic._id);
            });

            const matchesDifficulty =
              difficulty === "all" ||
              topicQuestions.some(
                (q) => q.difficulty?.toLowerCase() === difficulty
              );

            const matchesSearch =
              !term ||
              section.name?.toLowerCase().includes(term) ||
              topic.name?.toLowerCase().includes(term) ||
              topic.description?.toLowerCase().includes(term) ||
              topicQuestions.some((q) =>
                q.title?.toLowerCase().includes(term)
              );

            return matchesDifficulty && matchesSearch;
          })
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        return {
          ...section,
          displayOrder: section.order || index + 1,
          topics: sectionTopics,
        };
      })
      .filter(
        (section) =>
          section.topics.length > 0 ||
          (!term && difficulty === "all")
      );
  }, [sections, topics, dsaQuestions, search, difficulty]);

  const toggleSection = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const next = {};
    filteredSections.forEach((section) => {
      next[section._id] = true;
    });
    setExpanded(next);
  };

  const collapseAll = () => setExpanded({});

  const stats = [
    { label: "Questions", value: dsaQuestions.length, icon: Code2 },
    { label: "Topics", value: topics.length, icon: Layers3 },
    { label: "Sections", value: sections.length, icon: Database },
    { label: "Progress", value: `${progress}%`, icon: Trophy },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030611] text-slate-100">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/4 h-[420px] w-[420px] rounded-full bg-violet-700/20 blur-[130px]" />
        <div className="absolute right-0 top-40 h-[350px] w-[350px] rounded-full bg-blue-700/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-fuchsia-700/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.13) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 80%)",
          }}
        />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#080b19]/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 shadow-lg shadow-violet-600/25">
              <Code2 size={23} />
            </span>
            <span className="text-lg font-extrabold tracking-tight sm:text-xl">
              Placement<span className="text-violet-400">Platform</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm md:flex">
            <Link to="/" className="text-slate-400 transition hover:text-white">
              Home
            </Link>
            <Link
              to="/dsa"
              className="relative font-semibold text-white after:absolute after:-bottom-5 after:left-0 after:h-0.5 after:w-full after:bg-violet-500"
            >
              DSA
            </Link>
            <Link to="/technical" className="text-slate-400 transition hover:text-white">
              Technical
            </Link>
            <Link to="/aptitude" className="text-slate-400 transition hover:text-white">
              Aptitude
            </Link>
            <Link to="/companies" className="text-slate-400 transition hover:text-white">
              Companies
            </Link>
            <Link to="/tcs-nqt" className="text-slate-400 transition hover:text-white">
              TCS NQT
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenu((value) => !value)}
            className="rounded-xl border border-white/10 p-2 text-slate-300 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {mobileMenu && (
          <div className="grid gap-1 border-t border-white/10 bg-[#080b19] p-4 md:hidden">
            {[
              ["Home", "/"],
              ["DSA", "/dsa"],
              ["Technical", "/technical"],
              ["Aptitude", "/aptitude"],
              ["Companies", "/companies"],
              ["TCS NQT", "/tcs-nqt"],
            ].map(([label, path]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-12 pt-8 sm:px-6 lg:px-10">
        {/* Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-[#11152b]/95 via-[#090d1c]/95 to-[#101027]/95 p-6 shadow-2xl shadow-violet-950/20 sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full bg-violet-600/20 blur-[90px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-32 w-48 rounded-full bg-blue-600/10 blur-[70px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-center">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                <Sparkles size={14} />
                YOUR DSA JOURNEY STARTS HERE
              </span>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Master Data Structures
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  & Algorithms
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Solve real-world problems. Build your logic. Prepare for
                technical interviews and crack your dream job.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#dsa-roadmap"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3.5 text-sm font-bold shadow-lg shadow-violet-700/25 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-500"
                >
                  <Code2 size={18} />
                  Start Practicing
                  <ArrowRight size={17} />
                </a>
                <Link
                  to="/dsa/questions"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-violet-400/40 hover:bg-violet-500/10"
                >
                  Browse Questions
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  Structured roadmap
                </span>
                <span className="flex items-center gap-2">
                  <Target size={15} className="text-violet-400" />
                  Interview-focused practice
                </span>
              </div>
            </div>

            {/* Decorative cube / code illustration */}
            <div className="relative hidden min-h-[260px] items-center justify-center lg:flex">
              <div className="absolute h-64 w-64 rounded-full bg-violet-600/20 blur-[65px]" />
              <div className="relative flex h-48 w-48 rotate-45 items-center justify-center rounded-[30px] border border-violet-300/40 bg-gradient-to-br from-indigo-400/25 via-violet-700/20 to-[#050816]/80 shadow-[0_0_70px_rgba(124,58,237,0.22)]">
                <div className="absolute inset-5 rounded-2xl border border-blue-300/20" />
                <div className="-rotate-45 text-center">
                  <Code2 size={54} className="mx-auto text-violet-200" />
                  <p className="mt-3 text-sm font-bold tracking-widest text-white">
                    THINK. CODE.
                  </p>
                  <p className="text-xs text-violet-300">REPEAT.</p>
                </div>
              </div>
              <div className="absolute left-0 top-9 rounded-xl border border-violet-400/20 bg-[#0c1023]/90 px-3 py-2 text-xs text-violet-200 shadow-xl">
                <Zap size={14} className="mr-2 inline text-violet-400" />
                Think faster
              </div>
              <div className="absolute bottom-7 right-0 rounded-xl border border-blue-400/20 bg-[#0c1023]/90 px-3 py-2 text-xs text-blue-200 shadow-xl">
                <Database size={14} className="mr-2 inline text-blue-400" />
                Build logic
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="group rounded-2xl border border-white/[0.08] bg-[#0b1020]/80 p-4 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#10152a] sm:p-5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300 transition group-hover:bg-violet-500/20">
                <Icon size={21} />
              </div>
              <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {loading ? "—" : value}
              </p>
              <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* Difficulty cards */}
        <section className="mb-10 grid gap-3 md:grid-cols-3">
          {[
            {
              key: "easy",
              label: "Easy",
              value: easyCount,
              desc: "Build your foundation",
              icon: CheckCircle2,
              color: "text-emerald-400",
              bar: "bg-emerald-400",
            },
            {
              key: "medium",
              label: "Medium",
              value: mediumCount,
              desc: "Strengthen your logic",
              icon: Zap,
              color: "text-amber-400",
              bar: "bg-amber-400",
            },
            {
              key: "hard",
              label: "Hard",
              value: hardCount,
              desc: "Challenge yourself",
              icon: Flame,
              color: "text-rose-400",
              bar: "bg-rose-400",
            },
          ].map((item) => {
            const Icon = item.icon;
            const selected = difficulty === item.key;
            const percentage = dsaQuestions.length
              ? Math.round((item.value / dsaQuestions.length) * 100)
              : 0;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() =>
                  setDifficulty(selected ? "all" : item.key)
                }
                className={`rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${
                  selected
                    ? "border-violet-400/50 bg-violet-500/10 shadow-lg shadow-violet-950/20"
                    : "border-white/[0.08] bg-[#0b1020]/80 hover:border-violet-400/25"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={23} className={item.color} />
                  <span className="text-2xl font-extrabold">{item.value}</span>
                </div>
                <h3 className="mt-4 font-bold">{item.label} Problems</h3>
                <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full transition-all ${item.bar}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </section>

        {/* Roadmap and questions */}
        <section id="dsa-roadmap" className="scroll-mt-24">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                <Target size={15} />
                Learning path
              </p>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                DSA Roadmap
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Explore topics, filter problems, and practice one step at a time.
              </p>
            </div>
            <Link
              to="/dsa/questions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
            >
              View all questions <ArrowRight size={16} />
            </Link>
          </div>

          {/* Search and filter */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1e]/90 p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sections, topics, or questions..."
                  className="w-full rounded-xl border border-white/[0.08] bg-[#060a15] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-xl border border-white/[0.08] bg-[#060a15] px-4 py-3 text-sm text-slate-200 outline-none focus:border-violet-400/50"
              >
                <option value="all">All difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                {filteredSections.length} sections
                <span className="mx-2 text-slate-700">•</span>
                {filteredSections.reduce(
                  (sum, section) => sum + section.topics.length,
                  0
                )}{" "}
                topics
              </p>
              <div className="flex gap-4 text-xs">
                <button
                  type="button"
                  onClick={expandAll}
                  className="text-slate-400 transition hover:text-violet-300"
                >
                  Expand all
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="text-slate-400 transition hover:text-violet-300"
                >
                  Collapse all
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-300">
              {error}
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="ml-2 underline"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="mt-5 space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-2xl border border-white/[0.06] bg-[#0b1020]"
                />
              ))}
            </div>
          ) : filteredSections.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#0b1020] px-5 py-12 text-center">
              <Search size={30} className="mx-auto text-slate-500" />
              <h3 className="mt-4 font-bold">No matching topics</h3>
              <p className="mt-2 text-sm text-slate-400">
                Try a different search or difficulty level.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setDifficulty("all");
                }}
                className="mt-4 text-sm font-semibold text-violet-300"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {filteredSections.map((section, index) => {
                const isExpanded = Boolean(expanded[section._id]);
                const questionCount = getSectionQuestions(section._id).length;

                return (
                  <article
                    key={section._id}
                    className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0f1e]/90 transition hover:border-violet-400/25"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(section._id)}
                      className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xs font-extrabold text-violet-300">
                        {String(section.displayOrder || index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-slate-100">
                          {section.name}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {section.description ||
                            `${section.name} concepts and problems`}
                        </span>
                      </span>

                      <span className="hidden text-right sm:block">
                        <span className="block text-sm font-bold">
                          {questionCount}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          questions
                        </span>
                      </span>

                      {isExpanded ? (
                        <ChevronDown size={18} className="text-violet-300" />
                      ) : (
                        <ChevronRight size={18} className="text-slate-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-white/[0.07]">
                        {section.topics.length === 0 ? (
                          <p className="p-5 text-sm text-slate-500">
                            No topics match these filters.
                          </p>
                        ) : (
                          section.topics.map((topic, topicIndex) => {
                            const topicQuestions = getTopicQuestions(topic._id);
                            const counts = {
                              easy: topicQuestions.filter(
                                (q) => q.difficulty?.toLowerCase() === "easy"
                              ).length,
                              medium: topicQuestions.filter(
                                (q) => q.difficulty?.toLowerCase() === "medium"
                              ).length,
                              hard: topicQuestions.filter(
                                (q) => q.difficulty?.toLowerCase() === "hard"
                              ).length,
                            };

                            return (
                              <div
                                key={topic._id}
                                className="group flex flex-col gap-3 border-b border-white/[0.05] p-4 last:border-0 hover:bg-violet-500/[0.035] sm:flex-row sm:items-center sm:px-5"
                              >
                                <span className="hidden w-6 text-center text-xs text-slate-600 sm:block">
                                  {topic.order || topicIndex + 1}
                                </span>

                                <div className="flex min-w-0 flex-1 items-start gap-3">
                                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2 text-violet-300 transition group-hover:border-violet-400/20">
                                    <BookOpen size={17} />
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-slate-200">
                                      {topic.name}
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                      {topic.description ||
                                        `${topic.name} problems and concepts`}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                      {["easy", "medium", "hard"].map(
                                        (level) =>
                                          counts[level] > 0 && (
                                            <span
                                              key={level}
                                              className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold capitalize ${difficultyStyles[level]}`}
                                            >
                                              {level} {counts[level]}
                                            </span>
                                          )
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 sm:justify-end">
                                  <span className="text-xs text-slate-500">
                                    {topicQuestions.length}{" "}
                                    {topicQuestions.length === 1 ? "problem" : "problems"}
                                  </span>
                                  <Link
                                    to={`/dsa/questions?topic=${topic._id}`}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-bold text-violet-300 transition hover:border-violet-400/40 hover:bg-violet-500/20"
                                  >
                                    Open <ArrowRight size={14} />
                                  </Link>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* Learning tip */}
          <div className="mt-6 flex gap-4 rounded-2xl border border-violet-400/15 bg-gradient-to-r from-violet-500/[0.09] to-transparent p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
              <ChartNoAxesColumnIncreasing size={23} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">
                Consistency builds confidence.
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Learn the concept, solve the problem yourself, and revisit
                difficult questions. Every problem brings you closer to your
                placement goal.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-white/[0.07] pt-6 text-center text-xs text-slate-600">
          PlacementPlatform · Learn. Practice. Get Placed.
        </footer>
      </div>
    </main>
  );
}
