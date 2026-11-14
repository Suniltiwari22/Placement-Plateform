import Topic from "../models/Topic.js";
import Category from "../models/Category.js";


// CREATE TOPIC
export const createTopic = async (req, res) => {
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

        const existingCategory = await Category.findById(category);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const existingTopic = await Topic.findOne({
            $or: [
                {
                    name: name,
                    category: category
                },
                {
                    slug: slug,
                    category: category
                }
            ]
        });

        if (existingTopic) {
            return res.status(409).json({
                message: "Topic already exists in this category"
            });
        }

        const topic = await Topic.create({
            name,
            slug,
            category,
            description,
            order
        });

        res.status(201).json({
            message: "Topic created successfully",
            topic
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating topic",
            error: error.message
        });
    }
};


// GET ALL TOPICS
export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find()
            .populate("category", "name slug")
            .sort({
                order: 1,
                createdAt: -1
            });

        res.status(200).json({
            count: topics.length,
            topics
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching topics",
            error: error.message
        });
    }
};


// GET TOPICS BY CATEGORY
export const getTopicsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const topics = await Topic.find({
            category: categoryId
        })
            .populate("category", "name slug")
            .sort({
                order: 1,
                createdAt: -1
            });

        res.status(200).json({
            count: topics.length,
            topics
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching topics by category",
            error: error.message
        });
    }
};


// GET SINGLE TOPIC
export const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)
            .populate("category", "name slug");

        if (!topic) {
            return res.status(404).json({
                message: "Topic not found"
            });
        }

        res.status(200).json({
            topic
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching topic",
            error: error.message
        });
    }
};


// UPDATE TOPIC
export const updateTopic = async (req, res) => {
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
            const existingCategory = await Category.findById(category);

            if (!existingCategory) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }
        }

        const topic = await Topic.findByIdAndUpdate(
            req.params.id,
            {
                name,
                slug,
                category,
                description,
                order,
                isActive
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("category", "name slug");

        if (!topic) {
            return res.status(404).json({
                message: "Topic not found"
            });
        }

        res.status(200).json({
            message: "Topic updated successfully",
            topic
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating topic",
            error: error.message
        });
    }
};


// DELETE TOPIC
export const deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(
            req.params.id
        );

        if (!topic) {
            return res.status(404).json({
                message: "Topic not found"
            });
        }

        res.status(200).json({
            message: "Topic deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting topic",
            error: error.message
        });
    }
};