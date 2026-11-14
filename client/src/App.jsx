import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


// ================= STUDENT PAGES =================

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";


// ================= DSA =================

import DSAHome from "./pages/DSA/DSAHome.jsx";
import QuestionList from "./pages/DSA/QuestionList.jsx";
import QuestionDetail from "./pages/DSA/QuestionDetails.jsx";


// ================= ADMIN PAGES =================

import Dashboard from "./pages/Dashbord.jsx";

import Categories from "./pages/admin/Categories.jsx";
import Topics from "./pages/admin/Topics.jsx";
import Companies from "./pages/admin/Companies.jsx";
import Questions from "./pages/admin/Questions.jsx";


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* ================= STUDENT ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<StudentDashboard />}
                />


                {/* ================= DSA ================= */}

                <Route
                    path="/dsa"
                    element={<DSAHome />}
                />

                <Route
                    path="/dsa/questions"
                    element={<QuestionList />}
                />

                <Route
                    path="/dsa/questions/:id"
                    element={<QuestionDetail />}
                />


                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/categories"
                    element={<Categories />}
                />

                <Route
                    path="/admin/topics"
                    element={<Topics />}
                />

                <Route
                    path="/admin/companies"
                    element={<Companies />}
                />

                <Route
                    path="/admin/questions"
                    element={<Questions />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;