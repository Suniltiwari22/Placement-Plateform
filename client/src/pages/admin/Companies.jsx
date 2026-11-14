import { useEffect, useState } from "react";
import api from "../../services/api";

function Companies() {
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        logo: "",
        type: "other",
        description: "",
        website: "",
        hiringProcess: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch companies
    const fetchCompanies = async () => {
        try {
            const response = await api.get("/api/companies");

            setCompanies(response.data.companies || []);
        } catch (error) {
            console.error("Error fetching companies:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load companies"
            );
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Handle input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Create / Update company
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            // Convert hiring process text into array
            const hiringProcessArray = formData.hiringProcess
                .split("\n")
                .map((item) => item.trim())
                .filter((item) => item !== "");

            const companyData = {
                name: formData.name,
                slug: formData.slug,
                logo: formData.logo,
                type: formData.type,
                description: formData.description,
                website: formData.website,
                hiringProcess: hiringProcessArray
            };

            if (editingId) {
                await api.put(
                    `/api/companies/${editingId}`,
                    companyData
                );

                setMessage("Company updated successfully");
            } else {
                await api.post(
                    "/api/companies",
                    companyData
                );

                setMessage("Company created successfully");
            }

            resetForm();
            fetchCompanies();

        } catch (error) {
            console.error("Company error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // Edit company
    const handleEdit = (company) => {
        setEditingId(company._id);

        setFormData({
            name: company.name || "",
            slug: company.slug || "",
            logo: company.logo || "",
            type: company.type || "other",
            description: company.description || "",
            website: company.website || "",
            hiringProcess:
                company.hiringProcess?.join("\n") || ""
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete company
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/api/companies/${id}`);

            setMessage("Company deleted successfully");

            fetchCompanies();

        } catch (error) {
            console.error("Delete company error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete company"
            );
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            logo: "",
            type: "other",
            description: "",
            website: "",
            hiringProcess: ""
        });

        setEditingId(null);
    };

    return (
        <div className="admin-page">

            {/* Header */}

            <div className="page-header">
                <h1>Company Management</h1>

                <p>
                    Create and manage companies for placement preparation.
                </p>
            </div>

            {/* Messages */}

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

            {/* Company Form */}

            <div className="admin-card">

                <h2>
                    {editingId
                        ? "Edit Company"
                        : "Create New Company"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        {/* Name */}

                        <div className="form-group">

                            <label>
                                Company Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Example: TCS"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Slug */}

                        <div className="form-group">

                            <label>
                                Slug
                            </label>

                            <input
                                type="text"
                                name="slug"
                                placeholder="Example: tcs"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Type */}

                        <div className="form-group">

                            <label>
                                Company Type
                            </label>

                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="service">
                                    Service
                                </option>

                                <option value="product">
                                    Product
                                </option>

                                <option value="startup">
                                    Startup
                                </option>

                                <option value="other">
                                    Other
                                </option>
                            </select>

                        </div>

                        {/* Logo */}

                        <div className="form-group">

                            <label>
                                Logo URL
                            </label>

                            <input
                                type="text"
                                name="logo"
                                placeholder="https://example.com/logo.png"
                                value={formData.logo}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Website */}

                        <div className="form-group">

                            <label>
                                Website
                            </label>

                            <input
                                type="text"
                                name="website"
                                placeholder="https://example.com"
                                value={formData.website}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Description */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Enter company description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>

                    {/* Hiring Process */}

                    <div className="form-group">

                        <label>
                            Hiring Process
                        </label>

                        <textarea
                            name="hiringProcess"
                            placeholder={
                                "Enter one step per line\nExample:\nAptitude Test\nTechnical Interview\nHR Interview"
                            }
                            value={formData.hiringProcess}
                            onChange={handleChange}
                            rows="5"
                        />

                        <small>
                            Enter each hiring round on a new line.
                        </small>

                    </div>

                    {/* Buttons */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Company"
                                    : "Create Company"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>

            {/* Company Table */}

            <div className="admin-card">

                <h2>All Companies</h2>

                {companies.length === 0 ? (

                    <p className="empty-message">
                        No companies found.
                    </p>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>
                                    <th>#</th>
                                    <th>Company</th>
                                    <th>Slug</th>
                                    <th>Type</th>
                                    <th>Website</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {companies.map((company, index) => (

                                    <tr key={company._id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            <strong>
                                                {company.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {company.slug}
                                        </td>

                                        <td>
                                            {company.type}
                                        </td>

                                        <td>
                                            {company.website ? (
                                                <a
                                                    href={company.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Visit
                                                </a>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>

                                        <td>

                                            {company.isActive ? (
                                                <span className="status-active">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="status-inactive">
                                                    Inactive
                                                </span>
                                            )}

                                        </td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(company)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        company._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Companies;