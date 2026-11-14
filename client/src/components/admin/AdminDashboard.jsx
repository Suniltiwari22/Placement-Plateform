import { useEffect, useState } from "react";

import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import api from "../../services/api";

function AdminDashboard() {

    const [stats, setStats] = useState({
        categories: 0,
        topics: 0,
        companies: 0,
        questions: 0
    });

    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {

            const [
                categoriesResponse,
                topicsResponse,
                companiesResponse,
                questionsResponse
            ] = await Promise.all([
                api.get("/api/categories"),
                api.get("/api/topics"),
                api.get("/api/companies"),
                api.get("/api/questions")
            ]);

            setStats({
                categories: categoriesResponse.data.categories?.length || 0,
                topics: topicsResponse.data.topics?.length || 0,
                companies: companiesResponse.data.companies?.length || 0,
                questions: questionsResponse.data.questions?.length || 0
            });

        } catch (error) {

            console.error(
                "Error fetching dashboard statistics:",
                error
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="admin-main">

                <Navbar />

                <main className="dashboard-content">

                    <h1>Dashboard</h1>

                    <p>
                        Welcome to Placement Platform Admin Panel
                    </p>

                    {loading ? (
                        <p>Loading statistics...</p>
                    ) : (

                        <div className="stats-grid">

                            {/* Categories */}
                            <div className="stat-card">
                                <h3>Categories</h3>
                                <p>{stats.categories}</p>
                            </div>

                            {/* Topics */}
                            <div className="stat-card">
                                <h3>Topics</h3>
                                <p>{stats.topics}</p>
                            </div>

                            {/* Companies */}
                            <div className="stat-card">
                                <h3>Companies</h3>
                                <p>{stats.companies}</p>
                            </div>

                            {/* Questions */}
                            <div className="stat-card">
                                <h3>Questions</h3>
                                <p>{stats.questions}</p>
                            </div>

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
}

export default AdminDashboard;