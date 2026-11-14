import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setFetching(true);

            const response = await api.get("/api/categories");

            setCategories(response.data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Reset form
    const resetForm = () => {
        setName("");
        setSlug("");
        setDescription("");
        setIcon("");
        setEditingId(null);
        setError("");
    };

    // Add or update category
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const categoryData = {
                name,
                slug,
                description,
                icon
            };

            if (editingId) {
                // Update category
                await api.put(
                    `/api/categories/${editingId}`,
                    categoryData
                );

                setSuccess("Category updated successfully.");
            } else {
                // Create category
                await api.post(
                    "/api/categories",
                    categoryData
                );

                setSuccess("Category created successfully.");
            }

            resetForm();
            fetchCategories();

        } catch (error) {
            console.error("Category error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // Edit category
    const handleEdit = (category) => {
        setEditingId(category._id);

        setName(category.name);
        setSlug(category.slug);
        setDescription(category.description || "");
        setIcon(category.icon || "");

        setError("");
        setSuccess("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete category
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await api.delete(`/api/categories/${id}`);

            setSuccess("Category deleted successfully.");

            fetchCategories();

        } catch (error) {
            console.error("Delete category error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete category"
            );
        }
    };

    return (
        <div className="category-page">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>Category Management</h1>

                    <p>
                        Create and manage placement preparation categories.
                    </p>
                </div>
            </div>


            {/* Success Message */}
            {success && (
                <div className="success-message">
                    {success}
                </div>
            )}


            {/* Error Message */}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {/* Add / Edit Form */}
            <div className="category-form-card">

                <h2>
                    {editingId
                        ? "Edit Category"
                        : "Add New Category"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        {/* Name */}
                        <div className="form-group">
                            <label>Category Name</label>

                            <input
                                type="text"
                                placeholder="Example: DSA"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />
                        </div>


                        {/* Slug */}
                        <div className="form-group">
                            <label>Slug</label>

                            <input
                                type="text"
                                placeholder="Example: dsa"
                                value={slug}
                                onChange={(e) =>
                                    setSlug(e.target.value)
                                }
                                required
                            />
                        </div>


                        {/* Icon */}
                        <div className="form-group">
                            <label>Icon</label>

                            <input
                                type="text"
                                placeholder="Example: code"
                                value={icon}
                                onChange={(e) =>
                                    setIcon(e.target.value)
                                }
                            />
                        </div>


                        {/* Description */}
                        <div className="form-group">
                            <label>Description</label>

                            <input
                                type="text"
                                placeholder="Category description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>

                    </div>


                    {/* Buttons */}
                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : editingId
                                ? "Update Category"
                                : "Add Category"}
                        </button>


                        {editingId && (
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>
            </div>


            {/* Category List */}
            <div className="category-table-card">

                <div className="table-header">
                    <h2>All Categories</h2>

                    <span>
                        Total: {categories.length}
                    </span>
                </div>


                {fetching ? (
                    <p className="loading-text">
                        Loading categories...
                    </p>
                ) : categories.length === 0 ? (
                    <p className="empty-text">
                        No categories found.
                    </p>
                ) : (
                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>


                            <tbody>

                                {categories.map((category) => (
                                    <tr key={category._id}>

                                        <td>
                                            <strong>
                                                {category.name}
                                            </strong>
                                        </td>

                                        <td>
                                            {category.slug}
                                        </td>

                                        <td>
                                            {category.description ||
                                                "No description"}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    category.isActive
                                                        ? "status-active"
                                                        : "status-inactive"
                                                }
                                            >
                                                {category.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        handleEdit(category)
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            category._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

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

export default Categories;