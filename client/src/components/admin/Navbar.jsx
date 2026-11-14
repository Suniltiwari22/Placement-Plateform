import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/api/auth/logout");

            navigate("/login");

        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="navbar">

            <h2>Admin Dashboard</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

        </header>
    );
}

export default Navbar;