import "./StudentDashboard.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentDashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [stats] = useState({
        questionsSolved: 0,
        dsaProgress: 0,
        testsCompleted: 0,
        bookmarks: 0
    });

    const getUser = async () => {

        try {

            /*
             * We don't have a /me API yet.
             * So for now the dashboard works even
             * without fetching user details.
             */

            setUser({
                name: "Student"
            });

        } catch (error) {

            console.error(
                "Error loading dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        getUser();
    }, []);


    const handleLogout = async () => {

        try {

            await api.post("/api/auth/logout");

            navigate("/login");

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    };


    if (loading) {

        return (
            <div className="student-loading">
                Loading Dashboard...
            </div>
        );

    }


    return (

        <div className="student-dashboard">

            {/* =================================
                NAVBAR
            ================================= */}

            <header className="dashboard-navbar">

                <div className="dashboard-logo">

                    Placement Platform

                </div>


                <nav className="dashboard-nav">

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


                <button
                    className="dashboard-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <main className="dashboard-main">


                {/* =================================
                    WELCOME
                ================================= */}

                <section className="welcome-section">

                    <div>

                        <p className="welcome-label">
                            STUDENT DASHBOARD
                        </p>

                        <h1>
                            Welcome back, {user?.name} 👋
                        </h1>

                        <p>
                            Continue your placement preparation
                            and improve your skills every day.
                        </p>

                    </div>


                    <Link
                        to="/dsa"
                        className="start-practice-btn"
                    >
                        Start Practicing
                    </Link>

                </section>


                {/* =================================
                    STATISTICS
                ================================= */}

                <section className="dashboard-stats">


                    {/* QUESTIONS */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            💻
                        </div>

                        <div>

                            <h3>
                                {stats.questionsSolved}
                            </h3>

                            <p>
                                Questions Solved
                            </p>

                        </div>

                    </div>


                    {/* DSA */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            📊
                        </div>

                        <div>

                            <h3>
                                {stats.dsaProgress}%
                            </h3>

                            <p>
                                DSA Progress
                            </p>

                        </div>

                    </div>


                    {/* TESTS */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            📝
                        </div>

                        <div>

                            <h3>
                                {stats.testsCompleted}
                            </h3>

                            <p>
                                Tests Completed
                            </p>

                        </div>

                    </div>


                    {/* BOOKMARKS */}

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            🔖
                        </div>

                        <div>

                            <h3>
                                {stats.bookmarks}
                            </h3>

                            <p>
                                Bookmarks
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================
                    CONTINUE PREPARATION
                ================================= */}

                <section className="dashboard-section">

                    <div className="dashboard-section-header">

                        <div>

                            <h2>
                                Continue Preparation
                            </h2>

                            <p>
                                Choose a section and start practicing.
                            </p>

                        </div>

                    </div>


                    <div className="preparation-grid">


                        {/* DSA */}

                        <div className="preparation-card">

                            <div className="preparation-icon">
                                💻
                            </div>

                            <h3>
                                Data Structures & Algorithms
                            </h3>

                            <p>
                                Practice coding problems from
                                Easy, Medium and Hard levels.
                            </p>

                            <div className="progress-container">

                                <div className="progress-info">

                                    <span>
                                        Progress
                                    </span>

                                    <span>
                                        {stats.dsaProgress}%
                                    </span>

                                </div>

                                <div className="progress-bar">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width:
                                                `${stats.dsaProgress}%`
                                        }}
                                    />

                                </div>

                            </div>

                            <Link
                                to="/dsa"
                                className="preparation-btn"
                            >
                                Practice DSA →
                            </Link>

                        </div>


                        {/* TECHNICAL */}

                        <div className="preparation-card">

                            <div className="preparation-icon">
                                📚
                            </div>

                            <h3>
                                Technical
                            </h3>

                            <p>
                                Prepare DBMS, OS, CN, OOP,
                                SQL and programming concepts.
                            </p>

                            <div className="progress-container">

                                <div className="progress-info">

                                    <span>
                                        Progress
                                    </span>

                                    <span>
                                        0%
                                    </span>

                                </div>

                                <div className="progress-bar">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: "0%"
                                        }}
                                    />

                                </div>

                            </div>

                            <Link
                                to="/technical"
                                className="preparation-btn"
                            >
                                Study Technical →
                            </Link>

                        </div>


                        {/* APTITUDE */}

                        <div className="preparation-card">

                            <div className="preparation-icon">
                                🧠
                            </div>

                            <h3>
                                Aptitude
                            </h3>

                            <p>
                                Practice Quantitative,
                                Logical and Verbal questions.
                            </p>

                            <div className="progress-container">

                                <div className="progress-info">

                                    <span>
                                        Progress
                                    </span>

                                    <span>
                                        0%
                                    </span>

                                </div>

                                <div className="progress-bar">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: "0%"
                                        }}
                                    />

                                </div>

                            </div>

                            <Link
                                to="/aptitude"
                                className="preparation-btn"
                            >
                                Practice Aptitude →
                            </Link>

                        </div>

                    </div>

                </section>


                {/* =================================
                    TARGET COMPANIES
                ================================= */}

                <section className="dashboard-section">

                    <div className="dashboard-section-header">

                        <div>

                            <h2>
                                Target Companies
                            </h2>

                            <p>
                                Prepare company-specific questions
                                and interview topics.
                            </p>

                        </div>

                        <Link
                            to="/companies"
                            className="view-all-link"
                        >
                            View All →
                        </Link>

                    </div>


                    <div className="target-company-grid">

                        <div className="target-company-card">
                            <h3>TCS</h3>
                            <p>Service Based</p>
                        </div>

                        <div className="target-company-card">
                            <h3>Infosys</h3>
                            <p>Service Based</p>
                        </div>

                        <div className="target-company-card">
                            <h3>Accenture</h3>
                            <p>Service Based</p>
                        </div>

                        <div className="target-company-card">
                            <h3>Wipro</h3>
                            <p>Service Based</p>
                        </div>

                        <div className="target-company-card">
                            <h3>Amazon</h3>
                            <p>Product Based</p>
                        </div>

                        <div className="target-company-card">
                            <h3>Microsoft</h3>
                            <p>Product Based</p>
                        </div>

                    </div>

                </section>


                {/* =================================
                    QUICK ACTIONS
                ================================= */}

                <section className="dashboard-section">

                    <div className="dashboard-section-header">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Jump directly to your preparation.
                            </p>

                        </div>

                    </div>


                    <div className="quick-actions">


                        <Link
                            to="/dsa"
                            className="quick-action-card"
                        >

                            <span>
                                💻
                            </span>

                            <div>

                                <h3>
                                    Practice Questions
                                </h3>

                                <p>
                                    Solve coding and technical questions.
                                </p>

                            </div>

                        </Link>


                        <Link
                            to="/tests"
                            className="quick-action-card"
                        >

                            <span>
                                📝
                            </span>

                            <div>

                                <h3>
                                    Mock Tests
                                </h3>

                                <p>
                                    Test your preparation.
                                </p>

                            </div>

                        </Link>


                        <Link
                            to="/bookmarks"
                            className="quick-action-card"
                        >

                            <span>
                                🔖
                            </span>

                            <div>

                                <h3>
                                    Bookmarks
                                </h3>

                                <p>
                                    Revise your saved questions.
                                </p>

                            </div>

                        </Link>

                    </div>

                </section>

            </main>


            {/* =================================
                FOOTER
            ================================= */}

            <footer className="dashboard-footer">

                <div>

                    <h3>
                        Placement Platform
                    </h3>

                    <p>
                        Stop Searching. Start Preparing.
                    </p>

                </div>

                <p>
                    © 2026 Placement Platform
                </p>

            </footer>

        </div>

    );
}

export default StudentDashboard;