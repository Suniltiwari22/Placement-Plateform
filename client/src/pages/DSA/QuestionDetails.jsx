import "./QuestionList.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import api from "../../services/api";

function QuestionDetail() {
    const { id } = useParams();

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [language, setLanguage] = useState("cpp");
    const [code, setCode] = useState("");

    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const languageMap = {
        cpp: "cpp",
        java: "java",
        python: "python",
        javascript: "javascript"
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/api/questions/${id}`);

                console.log("Question Detail:", response.data);

                const data = response.data.question;

                setQuestion(data);

                // Load starter code
                setCode(data?.starterCode?.[language] || "");
            } catch (error) {
                console.error("Error fetching question:", error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load question"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);

        if (question) {
            setCode(
                question.starterCode?.[newLanguage] || ""
            );
        }

        setOutput("");
    };

    const handleEditorChange = (value) => {
        setCode(value || "");
    };

    const handleRunCode = async () => {
        try {
            setRunning(true);
            setOutput("Running code...");
            const response = await api.post("/api/code/run",
                { sourceCode: code, language, input: "" });
            console.log("Run Code Response:", response.data);
            const result = response.data.result; if (response.data.success && result) { let resultText = ""; if (result.stdout) { resultText += result.stdout; } if (result.stderr) { resultText += `\nError:\n${result.stderr}`; } if (result.compileOutput) { resultText += `\nCompilation Error:\n${result.compileOutput}`; } if (!resultText.trim()) { resultText = result.status === "Accepted" ? "Code executed successfully, but produced no output." : `Status: ${result.status}`; } resultText += `\n\nStatus: ${result.status}`; if (result.time != null) { resultText += `\nRuntime: ${result.time} seconds`; } if (result.memory != null) { resultText += `\nMemory: ${result.memory} KB`; } setOutput(resultText); } else { setOutput(response.data.message || "Execution failed"); }
        } catch (error) { console.error("Run code error:", error.response?.data || error.message); setOutput(error.response?.data?.message || "Code execution failed"); } finally { setRunning(false); }
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            setOutput("Submitting solution...");

            const response = await api.post("/api/code/submit", {
                questionId: question._id,
                language,
                sourceCode: code
            });

            const result = response.data;

            if (result.accepted) {
                setOutput(
                    `Accepted\n\nTime: ${result.time || "N/A"
                    }\nMemory: ${result.memory || "N/A"
                    }`
                );
            } else {
                setOutput(
                    result.message ||
                    result.failedResult?.stderr ||
                    "Wrong Answer"
                );
            }
        } catch (error) {
            console.error("Submit error:", error);

            setOutput(
                error.response?.data?.message ||
                "Submission failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.center}>
                Loading question...
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.center}>
                <h2>{error}</h2>

                <Link to="/dsa/questions">
                    ← Back to Questions
                </Link>
            </div>
        );
    }

    if (!question) {
        return (
            <div style={styles.center}>
                Question not found.
            </div>
        );
    }

    return (
        <div style={styles.page}>

            {/* ================= HEADER ================= */}

            <header style={styles.header}>

                <Link
                    to="/dsa/questions"
                    style={styles.backButton}
                >
                    ← Back
                </Link>

                <span
                    style={{
                        ...styles.badge,
                        ...styles.easy
                    }}
                >
                    {question.difficulty}
                </span>

                <span style={styles.badge}>
                    {question.questionType}
                </span>

                <span style={styles.badge}>
                    {question.sourceType}
                </span>

            </header>

            {/* ================= MAIN ================= */}

            <div style={styles.main}>

                {/* ================= LEFT ================= */}

                <div style={styles.problemPanel}>

                    <h1 style={styles.title}>
                        {question.title}
                    </h1>

                    {/* Breadcrumb */}

                    <div style={styles.breadcrumb}>

                        {question.category?.name || "DSA"}

                        {" → "}

                        {question.section?.name || ""}

                        {" → "}

                        {question.topic?.name || ""}

                    </div>

                    <hr />

                    {/* Problem */}

                    <h2 style={styles.heading}>
                        Problem
                    </h2>

                    <div style={styles.description}>
                        {question.description}
                    </div>

                    {/* Examples */}

                    {question.examples &&
                        question.examples.length > 0 && (

                            <section style={styles.section}>

                                <h2 style={styles.heading}>
                                    Examples
                                </h2>

                                {question.examples.map(
                                    (example, index) => (

                                        <div
                                            key={index}
                                            style={styles.example}
                                        >

                                            <h3>
                                                Example {index + 1}
                                            </h3>

                                            <div>
                                                <strong>
                                                    Input:
                                                </strong>

                                                <pre style={styles.codeBlock}>
                                                    {example.input}
                                                </pre>
                                            </div>

                                            <div>
                                                <strong>
                                                    Output:
                                                </strong>

                                                <pre style={styles.codeBlock}>
                                                    {example.output}
                                                </pre>
                                            </div>

                                            {example.explanation && (
                                                <div style={styles.exampleExplanation}>
                                                    <strong>
                                                        Explanation:
                                                    </strong>

                                                    <p>
                                                        {example.explanation}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    ))}

                            </section>
                        )}

                    {/* Constraints */}

                    {question.constraints &&
                        question.constraints.length > 0 && (

                            <section style={styles.section}>

                                <h2 style={styles.heading}>
                                    Constraints
                                </h2>

                                <ul style={styles.constraints}>

                                    {question.constraints.map(
                                        (constraint, index) => (

                                            <li key={index}>
                                                {constraint}
                                            </li>

                                        ))}

                                </ul>

                            </section>
                        )}

                    {/* Tags */}

                    {question.tags &&
                        question.tags.length > 0 && (

                            <section style={styles.section}>

                                <h2 style={styles.heading}>
                                    Topics & Tags
                                </h2>

                                <div style={styles.tags}>

                                    {question.tags.map(
                                        (tag, index) => (

                                            <span
                                                key={index}
                                                style={styles.tag}
                                            >
                                                {tag}
                                            </span>

                                        ))}

                                </div>

                            </section>
                        )}

                    {/* Companies */}

                    {question.companies &&
                        question.companies.length > 0 && (

                            <section style={styles.section}>

                                <h2 style={styles.heading}>
                                    Companies
                                </h2>

                                <div style={styles.tags}>

                                    {question.companies.map(
                                        (company) => (

                                            <span
                                                key={company._id}
                                                style={styles.companyTag}
                                            >
                                                {company.name}
                                            </span>

                                        ))}

                                </div>

                            </section>
                        )}

                </div>

                {/* ================= RIGHT ================= */}

                <div style={styles.editorPanel}>

                    {/* Language */}

                    <div style={styles.editorHeader}>

                        <select
                            value={language}
                            onChange={(e) =>
                                handleLanguageChange(
                                    e.target.value
                                )
                            }
                            style={styles.select}
                        >

                            <option value="cpp">
                                C++
                            </option>

                            <option value="java">
                                Java
                            </option>

                            <option value="python">
                                Python
                            </option>

                            <option value="javascript">
                                JavaScript
                            </option>

                        </select>

                    </div>

                    {/* Monaco */}

                    <div style={styles.editor}>

                        <Editor
                            height="100%"
                            language={
                                languageMap[language]
                            }
                            theme="vs-dark"
                            value={code}
                            onChange={
                                handleEditorChange
                            }
                            options={{
                                fontSize: 15,
                                minimap: {
                                    enabled: false
                                },
                                automaticLayout: true,
                                wordWrap: "on",
                                padding: {
                                    top: 15
                                }
                            }}
                        />

                    </div>

                    {/* Buttons */}

                    <div style={styles.actions}>

                        <button
                            onClick={handleRunCode}
                            disabled={running}
                            style={styles.runButton}
                        >
                            {running
                                ? "Running..."
                                : "▶ Run Code"}
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={styles.submitButton}
                        >
                            {submitting
                                ? "Submitting..."
                                : "✓ Submit"}
                        </button>

                    </div>

                    {/* Output */}

                    <div style={styles.outputPanel}>

                        <h3>
                            Output
                        </h3>

                        <pre style={styles.output}>
                            {output ||
                                "Run your code to see the output here."}
                        </pre>

                    </div>

                </div>

            </div>
        </div>
    );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {

    page: {
        minHeight: "100vh",
        background: "#ffffff",
        color: "#1f2937"
    },

    header: {
        height: "70px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "0 30px",
        position: "sticky",
        top: 0,
        background: "#ffffff",
        zIndex: 10
    },

    backButton: {
        textDecoration: "none",
        color: "#2563eb",
        fontWeight: "600",
        fontSize: "16px",
        marginRight: "15px"
    },

    badge: {
        padding: "7px 12px",
        borderRadius: "8px",
        background: "#f1f5f9",
        fontSize: "14px",
        fontWeight: "600",
        textTransform: "capitalize"
    },

    easy: {
        background: "#dcfce7",
        color: "#15803d"
    },

    main: {
        display: "grid",
        gridTemplateColumns: "44% 56%",
        minHeight: "calc(100vh - 70px)"
    },

    problemPanel: {
        padding: "35px 40px",
        overflowY: "auto",
        maxHeight: "calc(100vh - 70px)",
        borderRight: "1px solid #e5e7eb"
    },

    title: {
        fontSize: "30px",
        marginBottom: "10px",
        color: "#111827"
    },

    breadcrumb: {
        color: "#64748b",
        marginBottom: "25px",
        fontSize: "15px"
    },

    heading: {
        fontSize: "22px",
        marginTop: "20px",
        marginBottom: "12px",
        color: "#111827"
    },

    description: {
        fontSize: "16px",
        lineHeight: "1.7",
        whiteSpace: "pre-wrap"
    },

    section: {
        marginTop: "25px"
    },

    example: {
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px"
    },

    codeBlock: {
        background: "#f1f5f9",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        padding: "12px",
        overflowX: "auto",
        fontSize: "14px",
        marginTop: "7px"
    },

    exampleExplanation: {
        marginTop: "12px",
        lineHeight: "1.6"
    },

    constraints: {
        paddingLeft: "25px",
        lineHeight: "1.8"
    },

    tags: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
    },

    tag: {
        background: "#e0f2fe",
        color: "#0369a1",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "14px"
    },

    companyTag: {
        background: "#f1f5f9",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "14px"
    },

    editorPanel: {
        background: "#1e1e1e",
        display: "flex",
        flexDirection: "column",
        minWidth: 0
    },

    editorHeader: {
        height: "60px",
        background: "#252526",
        display: "flex",
        alignItems: "center",
        padding: "0 18px"
    },

    select: {
        background: "#3a3a3a",
        color: "#ffffff",
        border: "1px solid #555",
        borderRadius: "6px",
        padding: "9px 35px 9px 12px",
        fontSize: "14px"
    },

    editor: {
        flex: 1,
        minHeight: "500px"
    },

    actions: {
        display: "flex",
        gap: "10px",
        padding: "14px 18px",
        background: "#252526",
        borderTop: "1px solid #333"
    },

    runButton: {
        background: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "11px 22px",
        fontWeight: "600",
        cursor: "pointer"
    },

    submitButton: {
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "11px 22px",
        fontWeight: "600",
        cursor: "pointer"
    },

    outputPanel: {
        background: "#111827",
        color: "#ffffff",
        minHeight: "150px",
        padding: "15px 18px"
    },

    output: {
        whiteSpace: "pre-wrap",
        color: "#d1d5db",
        fontSize: "14px",
        margin: 0
    },

    center: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px"
    }
};

export default QuestionDetail;