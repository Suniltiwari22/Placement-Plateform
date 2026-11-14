
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post(
                "/api/auth/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            );

            console.log("Registration response:", response.data);

            // Registration successful
            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("Registration error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-visual-page">

            <div className="register-glass-card">

                {/* BRAND */}

                <div className="register-brand">
                    <div className="register-brand-icon">P</div>
                    <span>Placement Platform</span>
                </div>

                {/* HEADING */}

                <div className="register-heading">

                    <h1>Create Account</h1>

                    <p>
                        Start your placement preparation journey
                    </p>

                </div>

                {/* FORM */}

                <form onSubmit={handleRegister}>

                    <div className="register-input-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-input-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />
                    </div>

                    <div className="register-input-group">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* ERROR */}

                    {error && (
                        <div className="register-error">
                            {error}
                        </div>
                    )}

                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="register-glass-button"
                        disabled={loading}
                    >
                        {loading
                            ? "CREATING ACCOUNT..."
                            : "CREATE ACCOUNT"
                        }
                    </button>

                </form>

                {/* LOGIN LINK */}

                <div className="register-bottom-text">

                    <p>
                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                    <Link to="/" className="register-back-home">
                        ← Back to Home
                    </Link>

                </div>

            </div>

            <div className="register-copyright">
                © 2026 Placement Platform. All rights reserved.
            </div>

        </div>
    );
}

export default Register;
