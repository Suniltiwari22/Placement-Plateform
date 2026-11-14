import { useEffect, useState } from "react";
import api from "../../services/api";

function Topics() {
    const [topics, setTopics] = useState([]);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        description: "",
        order: 0
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await api.get("/api/categories");

            setCategories(
                response.data.categories || []
            );
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Failed to load categories");
        }
    };

    // Fetch topics
    const fetchTopics = async () => {
        try {
            const response = await api.get("/api/topics");

            setTopics(
                response.data.topics || []
            );
        } catch (error) {
            console.error("Error fetching topics:", error);
            setError("Failed to load topics");
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTopics();
    }, []);

    // Handle input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Create / Update topic
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            if (editingId) {
                await api.put(
                    `/api/topics/${editingId}`,
                    formData
                );

                setMessage("Topic updated successfully");
            } else {
                await api.post(
                    "/api/topics",
                    formData
                );

                setMessage("Topic created successfully");
            }

            resetForm();
            fetchTopics();

        } catch (error) {
            console.error("Topic error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // Edit topic
    const handleEdit = (topic) => {
        setEditingId(topic._id);

        setFormData({
            name: topic.name || "",
            slug: topic.slug || "",
            category: topic.category?._id || topic.category || "",
            description: topic.description || "",
            order: topic.order || 0
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete topic
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this topic?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/api/topics/${id}`);

            setMessage("Topic deleted successfully");

            fetchTopics();

        } catch (error) {
            console.error("Delete topic error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete topic"
            );
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            category: "",
            description: "",
            order: 0
        });

        setEditingId(null);
    };

    return (
        <div className="admin-page">

            <div className="page-header">
                <h1>Topic Management</h1>

                <p>
                    Create and manage preparation topics.
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

            {/* Topic Form */}

            <div className="admin-card">

                <h2>
                    {editingId
                        ? "Edit Topic"
                        : "Create New Topic"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        {/* Topic Name */}

                        <div className="form-group">

                            <label>
                                Topic Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Example: Arrays"
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
                                placeholder="Example: arrays"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Category */}

                        <div className="form-group">

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        {/* Order */}

                        <div className="form-group">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={formData.order}
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
                            placeholder="Enter topic description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />

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
                                    ? "Update Topic"
                                    : "Create Topic"}
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

            {/* Topics Table */}

            <div className="admin-card">

                <h2>All Topics</h2>

                {topics.length === 0 ? (

                    <p className="empty-message">
                        No topics found.
                    </p>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Category</th>
                                    <th>Order</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {topics.map((topic, index) => (

                                    <tr key={topic._id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            <strong>
                                                {topic.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {topic.slug}
                                        </td>

                                        <td>
                                            {topic.category?.name ||
                                                "N/A"}
                                        </td>

                                        <td>
                                            {topic.order}
                                        </td>

                                        <td>

                                            {topic.isActive ? (
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
                                                    handleEdit(topic)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        topic._id
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

export default Topics;