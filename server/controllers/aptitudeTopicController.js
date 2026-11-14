
import AptitudeTopic from "../models/AptitudeTopic.js";
import AptitudeCategory from "../models/AptitudeCategory.js";

export const createAptitudeTopic = async (req, res) => {
    try {
        const {
            name,
            slug,
            category,
            description,
            order
        } = req.body;

        if (!name || !slug || !category) {
            return res.status(400).json({
                message: "Name, slug and category are required"
            });
        }

        const existingCategory = await AptitudeCategory.findById(category);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Aptitude category not found"
            });
        }

        const existingTopic = await AptitudeTopic.findOne({
            category,
            $or: [{ name }, { slug }]
        });

        if (existingTopic) {
            return res.status(409).json({
                message: "Topic already exists in this category"
            });
        }

        const topic = await AptitudeTopic.create({
            name,
            slug,
            category,
            description,
            order
        });

        res.status(201).json({
            message: "Aptitude topic created successfully",
            topic
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating aptitude topic",
            error: error.message
        });
    }
};

export const getAptitudeTopics = async (req, res) => {
    try {
        const filter = { isActive: true };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const topics = await AptitudeTopic.find(filter)
            .populate("category", "name slug")
            .sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            count: topics.length,
            topics
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching aptitude topics",
            error: error.message
        });
    }
};

export const getAptitudeTopicById = async (req, res) => {
    try {
        const topic = await AptitudeTopic.findById(req.params.id)
            .populate("category", "name slug");

        if (!topic) {
            return res.status(404).json({
                message: "Aptitude topic not found"
            });
        }

        res.status(200).json({ topic });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching aptitude topic",
            error: error.message
        });
    }
};

export const updateAptitudeTopic = async (req, res) => {
    try {
        const {
            name,
            slug,
            category,
            description,
            order,
            isActive
        } = req.body;

        if (category) {
            const existingCategory =
                await AptitudeCategory.findById(category);

            if (!existingCategory) {
                return res.status(404).json({
                    message: "Aptitude category not found"
                });
            }
        }

        const topic = await AptitudeTopic.findByIdAndUpdate(
            req.params.id,
            { name, slug, category, description, order, isActive },
            { new: true, runValidators: true }
        ).populate("category", "name slug");

        if (!topic) {
            return res.status(404).json({
                message: "Aptitude topic not found"
            });
        }

        res.status(200).json({
            message: "Aptitude topic updated successfully",
            topic
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating aptitude topic",
            error: error.message
        });
    }
};

export const deleteAptitudeTopic = async (req, res) => {
    try {
        const topic = await AptitudeTopic.findByIdAndDelete(
            req.params.id
        );

        if (!topic) {
            return res.status(404).json({
                message: "Aptitude topic not found"
            });
        }

        res.status(200).json({
            message: "Aptitude topic deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting aptitude topic",
            error: error.message
        });
    }
};
