import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                Placement Platform
            </div>

            <nav>

                <NavLink to="/admin">
                    Dashboard
                </NavLink>

                <NavLink to="/admin/categories">
                    Categories
                </NavLink>

                <NavLink to="/admin/topics">
                    Topics
                </NavLink>

                <NavLink to="/admin/companies">
                    Companies
                </NavLink>

                <NavLink to="/admin/questions">
                    Questions
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;