import { useEffect, useState } from "react";
import api from "../../services/api";

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sections, setSections] = useState([]);
    const [topics, setTopics] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",

        category: "",
        section: "",
        topic: "",

        difficulty: "easy",

        companies: [],
        years: "",

        questionType: "coding",
        options: "",
        answer: "",
        explanation: "",

        cpp: "",
        java: "",
        python: "",
        javascript: "",

        tags: "",
        source: "",
        sourceType: "curated",

        isFrequentlyAsked: false,
        isPublished: false
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // FETCH QUESTIONS
    // ==========================================

    const fetchQuestions = async () => {
        try {
            const response = await api.get("/api/questions");

            setQuestions(response.data.questions || []);
        } catch (error) {
            console.error(
                "Error fetching questions:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load questions"
            );
        }
    };

    // ==========================================
    // FETCH CATEGORIES
    // ==========================================

    const fetchCategories = async () => {
        try {
            const response = await api.get(
                "/api/categories"
            );

            setCategories(
                response.data.categories || []
            );
        } catch (error) {
            console.error(
                "Error fetching categories:",
                error
            );
        }
    };

    // ==========================================
    // FETCH DSA SECTIONS
    // ==========================================

    const fetchSections = async () => {
        try {
            const response = await api.get(
                "/api/dsa-sections"
            );

            setSections(
                response.data.sections || []
            );
        } catch (error) {
            console.error(
                "Error fetching DSA sections:",
                error
            );
        }
    };

    // ==========================================
    // FETCH TOPICS
    // ==========================================

    const fetchTopics = async () => {
        try {
            const response = await api.get(
                "/api/topics"
            );

            setTopics(
                response.data.topics || []
            );
        } catch (error) {
            console.error(
                "Error fetching topics:",
                error
            );
        }
    };

    // ==========================================
    // FETCH COMPANIES
    // ==========================================

    const fetchCompanies = async () => {
        try {
            const response = await api.get(
                "/api/companies"
            );

            setCompanies(
                response.data.companies || []
            );
        } catch (error) {
            console.error(
                "Error fetching companies:",
                error
            );
        }
    };

    // ==========================================
    // INITIAL DATA LOAD
    // ==========================================

    useEffect(() => {
        fetchQuestions();
        fetchCategories();
        fetchSections();
        fetchTopics();
        fetchCompanies();
    }, []);

    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };

    // ==========================================
    // HANDLE CATEGORY CHANGE
    // ==========================================

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;

        setFormData((previous) => ({
            ...previous,
            category: categoryId,
            section: "",
            topic: ""
        }));
    };

    // ==========================================
    // HANDLE SECTION CHANGE
    // ==========================================

    const handleSectionChange = (e) => {
        const sectionId = e.target.value;

        setFormData((previous) => ({
            ...previous,
            section: sectionId,
            topic: ""
        }));
    };

    // ==========================================
    // COMPANY SELECT
    // ==========================================

    const handleCompanyChange = (e) => {
        const selectedOptions = Array.from(
            e.target.selectedOptions
        );

        const selectedCompanies =
            selectedOptions.map(
                (option) => option.value
            );

        setFormData((previous) => ({
            ...previous,
            companies: selectedCompanies
        }));
    };

    // ==========================================
    // CHECK WHETHER CATEGORY IS DSA
    // ==========================================

    const selectedCategory = categories.find(
        (category) =>
            category._id === formData.category
    );

    const isDSA =
        selectedCategory?.slug === "dsa";

    // ==========================================
    // FILTER SECTIONS
    // ==========================================

    const filteredSections = sections.filter(
        (section) => {
            if (!formData.category) {
                return false;
            }

            const sectionCategory =
                section.category?._id ||
                section.category;

            return (
                sectionCategory ===
                formData.category
            );
        }
    );

    // ==========================================
    // FILTER TOPICS
    // ==========================================

    const filteredTopics = topics.filter(
        (topic) => {
            if (!formData.category) {
                return false;
            }

            const topicCategory =
                topic.category?._id ||
                topic.category;

            if (
                topicCategory !==
                formData.category
            ) {
                return false;
            }

            // For DSA, topic must belong
            // to selected section
            if (isDSA) {
                if (!formData.section) {
                    return false;
                }

                const topicSection =
                    topic.section?._id ||
                    topic.section;

                return (
                    topicSection ===
                    formData.section
                );
            }

            // For non-DSA categories
            return true;
        }
    );

    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            // Convert years
            const yearsArray =
                formData.years
                    .split(",")
                    .map((year) =>
                        Number(year.trim())
                    )
                    .filter(
                        (year) =>
                            !isNaN(year)
                    );

            // Convert options
            const optionsArray =
                formData.options
                    .split("\n")
                    .map((option) =>
                        option.trim()
                    )
                    .filter(
                        (option) =>
                            option !== ""
                    );

            // Convert tags
            const tagsArray =
                formData.tags
                    .split(",")
                    .map((tag) =>
                        tag.trim()
                    )
                    .filter(
                        (tag) =>
                            tag !== ""
                    );

            const questionData = {
                title: formData.title,

                slug: formData.slug,

                description:
                    formData.description,

                category:
                    formData.category,

                // Section only for DSA
                section:
                    isDSA
                        ? formData.section
                        : null,

                topic:
                    formData.topic,

                difficulty:
                    formData.difficulty,

                companies:
                    formData.companies,

                years: yearsArray,

                questionType:
                    formData.questionType,

                options:
                    optionsArray,

                answer:
                    formData.answer,

                explanation:
                    formData.explanation,

                solution: {
                    cpp: formData.cpp,

                    java: formData.java,

                    python:
                        formData.python,

                    javascript:
                        formData.javascript
                },

                tags: tagsArray,

                source:
                    formData.source,

                sourceType:
                    formData.sourceType,

                isFrequentlyAsked:
                    formData.isFrequentlyAsked,

                isPublished:
                    formData.isPublished
            };

            if (editingId) {
                await api.put(
                    `/api/questions/${editingId}`,
                    questionData
                );

                setMessage(
                    "Question updated successfully"
                );
            } else {
                await api.post(
                    "/api/questions",
                    questionData
                );

                setMessage(
                    "Question created successfully"
                );
            }

            resetForm();

            await fetchQuestions();

        } catch (error) {
            console.error(
                "Question submit error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // EDIT
    // ==========================================

    const handleEdit = (question) => {
        setEditingId(question._id);

        setFormData({
            title:
                question.title || "",

            slug:
                question.slug || "",

            description:
                question.description || "",

            category:
                question.category?._id ||
                question.category ||
                "",

            section:
                question.section?._id ||
                question.section ||
                "",

            topic:
                question.topic?._id ||
                question.topic ||
                "",

            difficulty:
                question.difficulty ||
                "easy",

            companies:
                question.companies
                    ? question.companies.map(
                        (company) =>
                            company._id ||
                            company
                    )
                    : [],

            years:
                question.years
                    ? question.years.join(", ")
                    : "",

            questionType:
                question.questionType ||
                "coding",

            options:
                question.options
                    ? question.options.join(
                        "\n"
                    )
                    : "",

            answer:
                question.answer || "",

            explanation:
                question.explanation || "",

            cpp:
                question.solution?.cpp ||
                "",

            java:
                question.solution?.java ||
                "",

            python:
                question.solution?.python ||
                "",

            javascript:
                question.solution?.javascript ||
                "",

            tags:
                question.tags
                    ? question.tags.join(
                        ", "
                    )
                    : "",

            source:
                question.source || "",

            sourceType:
                question.sourceType ||
                "curated",

            isFrequentlyAsked:
                question.isFrequentlyAsked ||
                false,

            isPublished:
                question.isPublished ||
                false
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = async (id) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this question?"
            );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(
                `/api/questions/${id}`
            );

            setMessage(
                "Question deleted successfully"
            );

            await fetchQuestions();

        } catch (error) {
            console.error(
                "Delete question error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete question"
            );
        }
    };

    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            description: "",

            category: "",
            section: "",
            topic: "",

            difficulty: "easy",

            companies: [],
            years: "",

            questionType: "coding",
            options: "",
            answer: "",
            explanation: "",

            cpp: "",
            java: "",
            python: "",
            javascript: "",

            tags: "",
            source: "",
            sourceType: "curated",

            isFrequentlyAsked: false,
            isPublished: false
        });

        setEditingId(null);
    };

    return (
        <div className="admin-page">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="page-header">

                <h1>
                    Question Management
                </h1>

                <p>
                    Create and manage placement
                    preparation questions.
                </p>

            </div>

            {/* ================================= */}
            {/* MESSAGES */}
            {/* ================================= */}

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {/* ================================= */}
            {/* QUESTION FORM */}
            {/* ================================= */}

            <div className="admin-card">

                <h2>
                    {editingId
                        ? "Edit Question"
                        : "Create New Question"}
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* ================================= */}
                    {/* BASIC INFORMATION */}
                    {/* ================================= */}

                    <h3>
                        Basic Information
                    </h3>

                    <div className="form-grid">

                        {/* TITLE */}

                        <div className="form-group">

                            <label>
                                Question Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Example: Two Sum"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>

                        {/* SLUG */}

                        <div className="form-group">

                            <label>
                                Slug
                            </label>

                            <input
                                type="text"
                                name="slug"
                                placeholder="two-sum"
                                value={
                                    formData.slug
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Question Description
                        </label>

                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Enter complete question..."
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>

                    {/* ================================= */}
                    {/* CATEGORY / SECTION / TOPIC */}
                    {/* ================================= */}

                    <h3>
                        Question Classification
                    </h3>

                    <div className="form-grid">

                        {/* CATEGORY */}

                        <div className="form-group">

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleCategoryChange
                                }
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map(
                                    (category) => (
                                        <option
                                            key={
                                                category._id
                                            }
                                            value={
                                                category._id
                                            }
                                        >
                                            {
                                                category.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* SECTION */}

                        <div className="form-group">

                            <label>
                                DSA Section
                            </label>

                            <select
                                name="section"
                                value={
                                    formData.section
                                }
                                onChange={
                                    handleSectionChange
                                }
                                disabled={
                                    !isDSA
                                }
                                required={
                                    isDSA
                                }
                            >

                                <option value="">
                                    {isDSA
                                        ? "Select DSA Section"
                                        : "Only required for DSA"}
                                </option>

                                {filteredSections.map(
                                    (section) => (
                                        <option
                                            key={
                                                section._id
                                            }
                                            value={
                                                section._id
                                            }
                                        >
                                            {
                                                section.order
                                            }.{" "}
                                            {
                                                section.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* TOPIC */}

                        <div className="form-group">

                            <label>
                                Topic
                            </label>

                            <select
                                name="topic"
                                value={
                                    formData.topic
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                disabled={
                                    isDSA
                                        ? !formData.section
                                        : !formData.category
                                }
                            >

                                <option value="">
                                    Select Topic
                                </option>

                                {filteredTopics.map(
                                    (topic) => (
                                        <option
                                            key={
                                                topic._id
                                            }
                                            value={
                                                topic._id
                                            }
                                        >
                                            {
                                                topic.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                    </div>

                    {/* ================================= */}
                    {/* DIFFICULTY / TYPE */}
                    {/* ================================= */}

                    <div className="form-grid">

                        {/* DIFFICULTY */}

                        <div className="form-group">

                            <label>
                                Difficulty
                            </label>

                            <select
                                name="difficulty"
                                value={
                                    formData.difficulty
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

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

                        </div>

                        {/* QUESTION TYPE */}

                        <div className="form-group">

                            <label>
                                Question Type
                            </label>

                            <select
                                name="questionType"
                                value={
                                    formData.questionType
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="coding">
                                    Coding
                                </option>

                                <option value="mcq">
                                    MCQ
                                </option>

                                <option value="interview">
                                    Interview
                                </option>

                                <option value="theory">
                                    Theory
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* ================================= */}
                    {/* COMPANIES */}
                    {/* ================================= */}

                    <div className="form-group">

                        <label>
                            Companies
                        </label>

                        <select
                            multiple
                            value={
                                formData.companies
                            }
                            onChange={
                                handleCompanyChange
                            }
                            size="6"
                        >

                            {companies.map(
                                (company) => (
                                    <option
                                        key={
                                            company._id
                                        }
                                        value={
                                            company._id
                                        }
                                    >
                                        {
                                            company.name
                                        }
                                    </option>
                                )
                            )}

                        </select>

                        <small>
                            Hold Ctrl and select
                            multiple companies.
                        </small>

                    </div>

                    {/* ================================= */}
                    {/* YEARS */}
                    {/* ================================= */}

                    <div className="form-group">

                        <label>
                            Years
                        </label>

                        <input
                            type="text"
                            name="years"
                            placeholder="Example: 2024, 2025, 2026"
                            value={
                                formData.years
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    {/* ================================= */}
                    {/* MCQ OPTIONS */}
                    {/* ================================= */}

                    {formData.questionType ===
                        "mcq" && (
                        <div className="form-group">

                            <label>
                                MCQ Options
                            </label>

                            <textarea
                                name="options"
                                rows="5"
                                placeholder={
                                    "Enter one option per line\nOption A\nOption B\nOption C\nOption D"
                                }
                                value={
                                    formData.options
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>
                    )}

                    {/* ================================= */}
                    {/* ANSWER */}
                    {/* ================================= */}

                    <div className="form-group">

                        <label>
                            Answer
                        </label>

                        <textarea
                            name="answer"
                            rows="3"
                            placeholder="Enter answer"
                            value={
                                formData.answer
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    {/* ================================= */}
                    {/* EXPLANATION */}
                    {/* ================================= */}

                    <div className="form-group">

                        <label>
                            Explanation
                        </label>

                        <textarea
                            name="explanation"
                            rows="5"
                            placeholder="Explain the answer..."
                            value={
                                formData.explanation
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    {/* ================================= */}
                    {/* SOLUTIONS */}
                    {/* ================================= */}

                    <h3>
                        Solutions
                    </h3>

                    {/* C++ */}

                    <div className="form-group">

                        <label>
                            C++ Solution
                        </label>

                        <textarea
                            name="cpp"
                            rows="8"
                            placeholder="Enter C++ solution"
                            value={
                                formData.cpp
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    {/* JAVA */}

                    <div className="form-group">

                        <label>
                            Java Solution
                        </label>

                        <textarea
                            name="java"
                            rows="8"
                            placeholder="Enter Java solution"
                            value={
                                formData.java
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    {/* PYTHON */}

                    <div className="form-group">

                        <label>
                            Python Solution
                        </label>

                        <textarea
                            name="python"
                            rows="8"
                            placeholder="Enter Python solution"
                            value={
                                formData.python
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    {/* JAVASCRIPT */}

                    <div className="form-group">

                        <label>
                            JavaScript Solution
                        </label>

                        <textarea
                            name="javascript"
                            rows="8"
                            placeholder="Enter JavaScript solution"
                            value={
                                formData.javascript
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                    {/* ================================= */}
                    {/* TAGS */}
                    {/* ================================= */}

                    <div className="form-group">

                        <label>
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            placeholder="array, hashmap, two-pointer"
                            value={
                                formData.tags
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <small>
                            Separate tags using
                            commas.
                        </small>

                    </div>

                    {/* ================================= */}
                    {/* SOURCE */}
                    {/* ================================= */}

                    <div className="form-grid">

                        {/* SOURCE */}

                        <div className="form-group">

                            <label>
                                Source
                            </label>

                            <input
                                type="text"
                                name="source"
                                placeholder="Source URL or reference"
                                value={
                                    formData.source
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                        {/* SOURCE TYPE */}

                        <div className="form-group">

                            <label>
                                Source Type
                            </label>

                            <select
                                name="sourceType"
                                value={
                                    formData.sourceType
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="official">
                                    Official
                                </option>

                                <option value="candidate-reported">
                                    Candidate Reported
                                </option>

                                <option value="curated">
                                    Curated
                                </option>

                                <option value="practice">
                                    Practice
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* ================================= */}
                    {/* CHECKBOXES */}
                    {/* ================================= */}

                    <div className="checkbox-group">

                        <label>

                            <input
                                type="checkbox"
                                name="isFrequentlyAsked"
                                checked={
                                    formData.isFrequentlyAsked
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            Frequently Asked

                        </label>

                        <label>

                            <input
                                type="checkbox"
                                name="isPublished"
                                checked={
                                    formData.isPublished
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            Publish Question

                        </label>

                    </div>

                    {/* ================================= */}
                    {/* BUTTONS */}
                    {/* ================================= */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Question"
                                    : "Create Question"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={
                                    resetForm
                                }
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>

            {/* ================================= */}
            {/* QUESTIONS TABLE */}
            {/* ================================= */}

            <div className="admin-card">

                <h2>
                    All Questions
                </h2>

                {questions.length === 0 ? (

                    <p className="empty-message">
                        No questions found.
                    </p>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Title
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Section
                                    </th>

                                    <th>
                                        Topic
                                    </th>

                                    <th>
                                        Difficulty
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {questions.map(
                                    (
                                        question,
                                        index
                                    ) => (

                                        <tr
                                            key={
                                                question._id
                                            }
                                        >

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>
                                                <strong>
                                                    {
                                                        question.title
                                                    }
                                                </strong>
                                            </td>

                                            <td>
                                                {
                                                    question
                                                        .category
                                                        ?.name ||
                                                    "N/A"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    question
                                                        .section
                                                        ?.name ||
                                                    "N/A"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    question
                                                        .topic
                                                        ?.name ||
                                                    "N/A"
                                                }
                                            </td>

                                            <td>
                                                <span>
                                                    {
                                                        question.difficulty
                                                    }
                                                </span>
                                            </td>

                                            <td>
                                                {
                                                    question
                                                        .questionType
                                                }
                                            </td>

                                            <td>

                                                {question.isPublished ? (

                                                    <span className="status-active">
                                                        Published
                                                    </span>

                                                ) : (

                                                    <span className="status-inactive">
                                                        Draft
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(
                                                            question
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            question._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Questions;