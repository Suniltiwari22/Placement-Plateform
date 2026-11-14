
import AptitudeCategory from "../models/AptitudeCategory.js";

export const createAptitudeCategory = async (req, res) => {
    try {
        const { name, slug, description, icon } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                message: "Name and slug are required"
            });
        }

        const existing = await AptitudeCategory.findOne({
            $or: [{ name }, { slug }]
        });

        if (existing) {
            return res.status(409).json({
                message: "Aptitude category already exists"
            });
        }

        const category = await AptitudeCategory.create({
            name,
            slug,
            description,
            icon
        });

        res.status(201).json({
            message: "Aptitude category created successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating aptitude category",
            error: error.message
        });
    }
};

export const getAptitudeCategories = async (req, res) => {
    try {
        const categories = await AptitudeCategory.find({
            isActive: true
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: categories.length,
            categories
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching aptitude categories",
            error: error.message
        });
    }
};

export const getAptitudeCategoryById = async (req, res) => {
    try {
        const category = await AptitudeCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Aptitude category not found"
            });
        }

        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching aptitude category",
            error: error.message
        });
    }
};

export const updateAptitudeCategory = async (req, res) => {
    try {
        const { name, slug, description, icon, isActive } = req.body;

        const category = await AptitudeCategory.findByIdAndUpdate(
            req.params.id,
            { name, slug, description, icon, isActive },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Aptitude category not found"
            });
        }

        res.status(200).json({
            message: "Aptitude category updated successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating aptitude category",
            error: error.message
        });
    }
};

export const deleteAptitudeCategory = async (req, res) => {
    try {
        const category = await AptitudeCategory.findByIdAndDelete(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                message: "Aptitude category not found"
            });
        }

        res.status(200).json({
            message: "Aptitude category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting aptitude category",
            error: error.message
        });
    }
};
