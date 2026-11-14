
import mongoose from "mongoose";
import AptitudeQuestion from "../models/AptitudeQuestion.js";
import AptitudeCategory from "../models/AptitudeCategory.js";
import AptitudeTopic from "../models/AptitudeTopic.js";

const publicQuestionFields =
    "title slug description category topic difficulty options tags";

export const createAptitudeQuestion = async (req, res) => {
    try {
        const {
            title,
            slug,
            description,
            category,
            topic,
            difficulty,
            options,
            correctAnswer,
            explanation,
            tags,
            source,
            isPublished
        } = req.body;

        if (
            !title || !slug || !description ||
            !category || !topic || !difficulty ||
            !options || !correctAnswer
        ) {
            return res.status(400).json({
                message: "Please provide all required question fields"
            });
        }

        const existingCategory =
            await AptitudeCategory.findById(category);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Aptitude category not found"
            });
        }

        const existingTopic = await AptitudeTopic.findById(topic);

        if (!existingTopic) {
            return res.status(404).json({
                message: "Aptitude topic not found"
            });
        }

        if (existingTopic.category.toString() !== category.toString()) {
            return res.status(400).json({
                message: "Topic does not belong to this category"
            });
        }

        const existingQuestion = await AptitudeQuestion.findOne({ slug });

        if (existingQuestion) {
            return res.status(409).json({
                message: "Question slug already exists"
            });
        }

        const question = await AptitudeQuestion.create({
            title,
            slug,
            description,
            category,
            topic,
            difficulty,
            options,
            correctAnswer,
            explanation,
            tags,
            source,
            isPublished: isPublished ?? false
        });

        res.status(201).json({
            message: "Aptitude question created successfully",
            question
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating aptitude question",
            error: error.message
        });
    }
};

// Student: get published questions without answers
export const getAptitudeQuestions = async (req, res) => {
    try {
        const {
            category,
            topic,
            difficulty,
            search,
            page = 1,
            limit = 20
        } = req.query;

        const filter = { isPublished: true };

        if (category) filter.category = category;
        if (topic) filter.topic = topic;
        if (difficulty) filter.difficulty = difficulty;

        if (search) {
            const safeSearch = search.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            filter.$or = [
                { title: { $regex: safeSearch, $options: "i" } },
                { description: { $regex: safeSearch, $options: "i" } },
                { tags: { $regex: safeSearch, $options: "i" } }
            ];
        }

        const pageNumber = Math.max(1, Number(page) || 1);
        const limitNumber = Math.min(
            100,
            Math.max(1, Number(limit) || 20)
        );

        const [questions, totalQuestions] = await Promise.all([
            AptitudeQuestion.find(filter)
                .select(publicQuestionFields)
                .populate("category", "name slug")
                .populate("topic", "name slug")
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber)
                .lean(),

            AptitudeQuestion.countDocuments(filter)
        ]);

        res.status(200).json({
            success: true,
            questions,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalQuestions,
                totalPages: Math.ceil(totalQuestions / limitNumber)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching aptitude questions",
            error: error.message
        });
    }
};

// Admin: get all questions including answers
export const getAllAptitudeQuestionsAdmin = async (req, res) => {
    try {
        const questions = await AptitudeQuestion.find()
            .populate("category", "name slug")
            .populate("topic", "name slug")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: questions.length,
            questions
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching admin questions",
            error: error.message
        });
    }
};

// Student: get one question without answer
export const getAptitudeQuestionById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid question ID"
            });
        }

        const question = await AptitudeQuestion.findOne({
            _id: req.params.id,
            isPublished: true
        })
            .select(publicQuestionFields)
            .populate("category", "name slug")
            .populate("topic", "name slug")
            .lean();

        if (!question) {
            return res.status(404).json({
                message: "Aptitude question not found"
            });
        }

        res.status(200).json({ question });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching aptitude question",
            error: error.message
        });
    }
};

// Student: submit answer and receive result
export const submitAptitudeAnswer = async (req, res) => {
    try {
        const { answer } = req.body;

        if (!["A", "B", "C", "D"].includes(answer)) {
            return res.status(400).json({
                message: "Answer must be A, B, C or D"
            });
        }

        const question = await AptitudeQuestion.findOne({
            _id: req.params.id,
            isPublished: true
        }).select("correctAnswer explanation");

        if (!question) {
            return res.status(404).json({
                message: "Aptitude question not found"
            });
        }

        const isCorrect = answer === question.correctAnswer;

        res.status(200).json({
            success: true,
            isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            message: isCorrect ? "Correct answer!" : "Incorrect answer"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error submitting answer",
            error: error.message
        });
    }
};

export const updateAptitudeQuestion = async (req, res) => {
    try {
        const {
            title,
            slug,
            description,
            category,
            topic,
            difficulty,
            options,
            correctAnswer,
            explanation,
            tags,
            source,
            isPublished
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

        if (topic) {
            const existingTopic = await AptitudeTopic.findById(topic);

            if (!existingTopic) {
                return res.status(404).json({
                    message: "Aptitude topic not found"
                });
            }

            const finalCategory = category ||
                (await AptitudeQuestion.findById(req.params.id))?.category;

            if (
                finalCategory &&
                existingTopic.category.toString() !== finalCategory.toString()
            ) {
                return res.status(400).json({
                    message: "Topic does not belong to this category"
                });
            }
        }

        const question = await AptitudeQuestion.findByIdAndUpdate(
            req.params.id,
            {
                title,
                slug,
                description,
                category,
                topic,
                difficulty,
                options,
                correctAnswer,
                explanation,
                tags,
                source,
                isPublished
            },
            { new: true, runValidators: true }
        )
            .populate("category", "name slug")
            .populate("topic", "name slug");

        if (!question) {
            return res.status(404).json({
                message: "Aptitude question not found"
            });
        }

        res.status(200).json({
            message: "Aptitude question updated successfully",
            question
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating aptitude question",
            error: error.message
        });
    }
};

export const deleteAptitudeQuestion = async (req, res) => {
    try {
        const question = await AptitudeQuestion.findByIdAndDelete(
            req.params.id
        );

        if (!question) {
            return res.status(404).json({
                message: "Aptitude question not found"
            });
        }

        res.status(200).json({
            message: "Aptitude question deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting aptitude question",
            error: error.message
        });
    }
};
