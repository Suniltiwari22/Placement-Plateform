
import { useState } from "react";
import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import api from "../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post(
                "/api/auth/login",
                { email, password }
            );

            const user = response.data.user;

            if (!user) {
                throw new Error("User details not received.");
            }

            if (user.role === "admin") {
                navigate("/admin", { replace: true });
            } else {
                const requestedPath =
                    location.state?.from?.pathname;

                navigate(
                    requestedPath || "/dashboard",
                    { replace: true }
                );
            }

        } catch (error) {
            console.error("Login error:", error);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Login failed. Please check your credentials."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-visual-page">

            <div className="login-glass-card">

                <div className="login-brand">
                    <div className="login-brand-icon">P</div>
                    <span>Placement Platform</span>
                </div>

                <div className="login-heading">
                    <h1>Login Account</h1>

                    <p>
                        Welcome back! Continue your placement
                        preparation journey.
                    </p>
                </div>

                <form onSubmit={handleLogin}>

                    <div className="login-input-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="login-input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <div className="login-options">
                        <span>
                            <span className="login-status-dot"></span>
                            Secure Login
                        </span>

                        <Link to="/register">
                            Create Account?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="login-glass-button"
                        disabled={loading}
                    >
                        {loading ? "PLEASE WAIT..." : "LOGIN"}
                    </button>

                </form>

                <div className="login-bottom-text">
                    <p>
                        Don't have an account?
                        <Link to="/register">
                            Register Now
                        </Link>
                    </p>

                    <Link to="/" className="login-back-home">
                        ← Back to Home
                    </Link>
                </div>

            </div>

            <div className="login-copyright">
                © 2026 Placement Platform. All rights reserved.
            </div>

        </div>
    );
}

export default Login;
