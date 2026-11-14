import DSASection from "../models/DSASection.js";

// GET all DSA sections
export const getDSASections = async (req, res) => {
    try {
        const sections = await DSASection.find({
            isActive: true
        })
            .populate("category", "name slug")
            .sort({ order: 1 });

        res.status(200).json({
            success: true,
            sections
        });
    } catch (error) {
        console.error("Get DSA sections error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch DSA sections"
        });
    }
};


// GET single DSA section
export const getDSASectionById = async (req, res) => {
    try {
        const section = await DSASection.findById(req.params.id)
            .populate("category", "name slug");

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "DSA section not found"
            });
        }

        res.status(200).json({
            success: true,
            section
        });
    } catch (error) {
        console.error("Get DSA section error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch DSA section"
        });
    }
};


// CREATE DSA section
export const createDSASection = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            order,
            category
        } = req.body;

        if (!name || !slug || order === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, slug, order and category are required"
            });
        }

        const existingSection = await DSASection.findOne({
            slug
        });

        if (existingSection) {
            return res.status(400).json({
                success: false,
                message: "DSA section already exists"
            });
        }

        const section = await DSASection.create({
            name,
            slug,
            description,
            order,
            category
        });

        res.status(201).json({
            success: true,
            message: "DSA section created successfully",
            section
        });
    } catch (error) {
        console.error("Create DSA section error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create DSA section"
        });
    }
};


// UPDATE DSA section
export const updateDSASection = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            order,
            category,
            isActive
        } = req.body;

        const section = await DSASection.findById(req.params.id);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "DSA section not found"
            });
        }

        section.name = name ?? section.name;
        section.slug = slug ?? section.slug;
        section.description = description ?? section.description;
        section.order = order ?? section.order;
        section.category = category ?? section.category;
        section.isActive = isActive ?? section.isActive;

        await section.save();

        res.status(200).json({
            success: true,
            message: "DSA section updated successfully",
            section
        });
    } catch (error) {
        console.error("Update DSA section error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update DSA section"
        });
    }
};


// DELETE DSA section
export const deleteDSASection = async (req, res) => {
    try {
        const section = await DSASection.findById(req.params.id);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "DSA section not found"
            });
        }

        await DSASection.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "DSA section deleted successfully"
        });
    } catch (error) {
        console.error("Delete DSA section error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete DSA section"
        });
    }
};