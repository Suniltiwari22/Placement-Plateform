import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../../services/api";

function QuestionList() {
    const [questions, setQuestions] = useState([]);

    const [sections, setSections] = useState([]);
    const [topics, setTopics] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    /* ==============================
       URL FILTERS
    ============================== */

    const difficulty = searchParams.get("difficulty") || "";
    const section = searchParams.get("section") || "";
    const topic = searchParams.get("topic") || "";
    const company = searchParams.get("company") || "";
    const searchFromUrl = searchParams.get("search") || "";

    const [search, setSearch] = useState(searchFromUrl);

    /* ==============================
       FETCH FILTER DATA
    ============================== */

    const fetchFilterData = async () => {
        try {
            setFilterLoading(true);

            const [
                sectionsResponse,
                topicsResponse,
                companiesResponse
            ] = await Promise.all([
                api.get("/api/dsa-sections"),
                api.get("/api/topics"),
                api.get("/api/companies")
            ]);

            setSections(
                sectionsResponse.data.sections || []
            );

            setTopics(
                topicsResponse.data.topics || []
            );

            setCompanies(
                companiesResponse.data.companies || []
            );

        } catch (error) {
            console.error(
                "Error fetching filter data:",
                error
            );
        } finally {
            setFilterLoading(false);
        }
    };

    /* ==============================
       FETCH QUESTIONS
    ============================== */

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            if (difficulty) {
                params.append(
                    "difficulty",
                    difficulty
                );
            }

            if (section) {
                params.append(
                    "section",
                    section
                );
            }

            if (topic) {
                params.append(
                    "topic",
                    topic
                );
            }

            if (company) {
                params.append(
                    "company",
                    company
                );
            }

            if (searchFromUrl) {
                params.append(
                    "search",
                    searchFromUrl
                );
            }

            params.append("page", "1");
            params.append("limit", "100");

            const response = await api.get(
                `/api/questions?${params.toString()}`
            );

            console.log(
                "Questions:",
                response.data
            );

            setQuestions(
                response.data.questions || []
            );

        } catch (error) {
            console.error(
                "Error fetching questions:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load questions"
            );

        } finally {
            setLoading(false);
        }
    };

    /* ==============================
       INITIAL LOAD
    ============================== */

    useEffect(() => {
        fetchFilterData();
    }, []);

    /* ==============================
       FETCH WHEN FILTER CHANGES
    ============================== */

    useEffect(() => {
        fetchQuestions();
    }, [
        difficulty,
        section,
        topic,
        company,
        searchFromUrl
    ]);

    /* ==============================
       SYNC SEARCH INPUT
    ============================== */

    useEffect(() => {
        setSearch(searchFromUrl);
    }, [searchFromUrl]);

    /* ==============================
       SEARCH
    ============================== */

    const handleSearch = (e) => {
        e.preventDefault();

        const newParams = new URLSearchParams(
            searchParams
        );

        if (search.trim()) {
            newParams.set(
                "search",
                search.trim()
            );
        } else {
            newParams.delete("search");
        }

        setSearchParams(newParams);
    };

    /* ==============================
       DIFFICULTY FILTER
    ============================== */

    const handleDifficultyChange = (e) => {
        const value = e.target.value;

        const newParams = new URLSearchParams(
            searchParams
        );

        if (value) {
            newParams.set(
                "difficulty",
                value
            );
        } else {
            newParams.delete("difficulty");
        }

        setSearchParams(newParams);
    };

    /* ==============================
       SECTION FILTER
    ============================== */

    const handleSectionChange = (e) => {
        const value = e.target.value;

        const newParams = new URLSearchParams(
            searchParams
        );

        if (value) {
            newParams.set(
                "section",
                value
            );
        } else {
            newParams.delete("section");
        }

        // Section change should reset topic
        newParams.delete("topic");

        setSearchParams(newParams);
    };

    /* ==============================
       TOPIC FILTER
    ============================== */

    const handleTopicChange = (e) => {
        const value = e.target.value;

        const newParams = new URLSearchParams(
            searchParams
        );

        if (value) {
            newParams.set(
                "topic",
                value
            );
        } else {
            newParams.delete("topic");
        }

        setSearchParams(newParams);
    };

    /* ==============================
       COMPANY FILTER
    ============================== */

    const handleCompanyChange = (e) => {
        const value = e.target.value;

        const newParams = new URLSearchParams(
            searchParams
        );

        if (value) {
            newParams.set(
                "company",
                value
            );
        } else {
            newParams.delete("company");
        }

        setSearchParams(newParams);
    };

    /* ==============================
       CLEAR FILTERS
    ============================== */

    const clearFilters = () => {
        setSearch("");
        setSearchParams({});
    };

    /* ==============================
       FILTER TOPICS BY SECTION
    ============================== */

    const filteredTopics = section
        ? topics.filter((item) => {
              const topicSection =
                  item.section?._id ||
                  item.section;

              return (
                  topicSection === section
              );
          })
        : topics;

    /* ==============================
       CURRENT SECTION NAME
    ============================== */

    const currentSection = sections.find(
        (item) =>
            item._id === section
    );

    /* ==============================
       CURRENT TOPIC NAME
    ============================== */

    const currentTopic = topics.find(
        (item) =>
            item._id === topic
    );

    /* ==============================
       CURRENT COMPANY NAME
    ============================== */

    const currentCompany = companies.find(
        (item) =>
            item._id === company
    );

    return (
        <div className="question-list-page">

            {/* =========================
                NAVBAR
            ========================= */}

            <header className="question-navbar">

                <div className="question-logo">
                    Placement Platform
                </div>

                <nav>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/dsa">
                        DSA
                    </Link>

                    <Link to="/technical">
                        Technical
                    </Link>

                    <Link to="/aptitude">
                        Aptitude
                    </Link>

                    <Link to="/companies">
                        Companies
                    </Link>

                </nav>

            </header>


            {/* =========================
                MAIN
            ========================= */}

            <main className="question-list-main">

                {/* PAGE HEADER */}

                <div className="question-page-header">

                    <div>

                        <p>
                            DSA PRACTICE
                        </p>

                        <h1>
                            Coding Questions
                        </h1>

                        <span>
                            {loading
                                ? "Loading..."
                                : `${questions.length} questions available`}
                        </span>

                    </div>

                    <Link
                        to="/dsa"
                        className="back-dsa-btn"
                    >
                        ← DSA Home
                    </Link>

                </div>


                {/* =========================
                    ACTIVE FILTER INFO
                ========================= */}

                {(currentSection ||
                    currentTopic ||
                    currentCompany ||
                    difficulty) && (

                    <div className="active-filter-info">

                        <span>
                            Showing:
                        </span>

                        {currentSection && (
                            <strong>
                                {currentSection.name}
                            </strong>
                        )}

                        {currentTopic && (
                            <strong>
                                {currentTopic.name}
                            </strong>
                        )}

                        {currentCompany && (
                            <strong>
                                {currentCompany.name}
                            </strong>
                        )}

                        {difficulty && (
                            <strong>
                                {difficulty}
                            </strong>
                        )}

                    </div>

                )}


                {/* =========================
                    FILTERS
                ========================= */}

                <form
                    className="question-filters"
                    onSubmit={handleSearch}
                >

                    {/* SEARCH */}

                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    {/* DIFFICULTY */}

                    <select
                        value={difficulty}
                        onChange={
                            handleDifficultyChange
                        }
                    >

                        <option value="">
                            All Difficulties
                        </option>

                        <option value="easy">
                            Easy
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="hard">
                            Hard
                        </option>

                    </select>


                    {/* SECTION */}

                    <select
                        value={section}
                        onChange={
                            handleSectionChange
                        }
                    >

                        <option value="">
                            All Sections
                        </option>

                        {sections
                            .sort(
                                (a, b) =>
                                    a.order -
                                    b.order
                            )
                            .map((item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}
                                </option>

                            ))}

                    </select>


                    {/* TOPIC */}

                    <select
                        value={topic}
                        onChange={
                            handleTopicChange
                        }
                    >

                        <option value="">
                            All Topics
                        </option>

                        {filteredTopics.map(
                            (item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}
                                </option>

                            )
                        )}

                    </select>


                    {/* COMPANY */}

                    <select
                        value={company}
                        onChange={
                            handleCompanyChange
                        }
                    >

                        <option value="">
                            All Companies
                        </option>

                        {companies.map(
                            (item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}
                                </option>

                            )
                        )}

                    </select>


                    {/* SEARCH BUTTON */}

                    <button
                        type="submit"
                        className="search-question-btn"
                    >
                        Search
                    </button>


                    {/* CLEAR */}

                    {(search ||
                        difficulty ||
                        section ||
                        topic ||
                        company) && (

                        <button
                            type="button"
                            className="clear-filter-btn"
                            onClick={
                                clearFilters
                            }
                        >
                            Clear Filters
                        </button>

                    )}

                </form>


                {/* =========================
                    ERROR
                ========================= */}

                {error && (

                    <div className="question-error">
                        {error}
                    </div>

                )}


                {/* =========================
                    LOADING
                ========================= */}

                {(loading ||
                    filterLoading) && (

                    <div className="question-loading">
                        Loading questions...
                    </div>

                )}


                {/* =========================
                    NO QUESTIONS
                ========================= */}

                {!loading &&
                    !error &&
                    questions.length === 0 && (

                        <div className="no-questions">

                            <h2>
                                No questions found
                            </h2>

                            <p>
                                Try changing your
                                search or filters.
                            </p>

                            <button
                                onClick={
                                    clearFilters
                                }
                                className="clear-filter-btn"
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}


                {/* =========================
                    QUESTIONS
                ========================= */}

                {!loading &&
                    !error &&
                    questions.length > 0 && (

                        <div className="question-grid">

                            {questions.map(
                                (question) => (

                                    <div
                                        className="question-card"
                                        key={
                                            question._id
                                        }
                                    >

                                        {/* TOP */}

                                        <div className="question-card-top">

                                            <span
                                                className={`difficulty-badge ${question.difficulty}`}
                                            >
                                                {question.difficulty}
                                            </span>

                                            {question.isFrequentlyAsked && (

                                                <span className="frequent-badge">
                                                    Frequently Asked
                                                </span>

                                            )}

                                        </div>


                                        {/* TITLE */}

                                        <h2>
                                            {question.title}
                                        </h2>


                                        {/* DESCRIPTION */}

                                        <p className="question-description">

                                            {question.description?.length >
                                            150
                                                ? question.description.substring(
                                                    0,
                                                    150
                                                ) + "..."
                                                : question.description}

                                        </p>


                                        {/* SECTION */}

                                        {question.section && (

                                            <div className="question-meta">

                                                <span>
                                                    Section:
                                                </span>

                                                <strong>
                                                    {
                                                        question
                                                            .section
                                                            .name
                                                    }
                                                </strong>

                                            </div>

                                        )}


                                        {/* TOPIC */}

                                        {question.topic && (

                                            <div className="question-meta">

                                                <span>
                                                    Topic:
                                                </span>

                                                <strong>
                                                    {
                                                        question
                                                            .topic
                                                            .name
                                                    }
                                                </strong>

                                            </div>

                                        )}


                                        {/* COMPANIES */}

                                        {question.companies?.length >
                                            0 && (

                                            <div className="question-companies">

                                                {question.companies
                                                    .slice(0, 3)
                                                    .map(
                                                        (
                                                            company
                                                        ) => (

                                                            <span
                                                                key={
                                                                    company._id
                                                                }
                                                            >
                                                                {
                                                                    company.name
                                                                }
                                                            </span>

                                                        )
                                                    )}

                                            </div>

                                        )}


                                        {/* SOLVE BUTTON */}

                                        <Link
                                            to={`/dsa/questions/${question._id}`}
                                            className="solve-question-btn"
                                        >
                                            Solve Question →
                                        </Link>

                                    </div>

                                )
                            )}

                        </div>

                    )}

            </main>

        </div>
    );
}

export default QuestionList;