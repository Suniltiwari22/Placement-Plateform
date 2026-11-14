import Question from "../models/Questions.js";
import Category from "../models/Category.js";
import Topic from "../models/Topic.js";
import Company from "../models/Company.js";


// CREATE QUESTION
export const createQuestion = async (req, res) => {
    try {
        const {
            title,
            slug,
            description,
            category,
            topic,
            difficulty,
            companies,
            years,
            questionType,
            options,
            answer,
            explanation,
            solution,
            tags,
            source,
            sourceType,
            isFrequentlyAsked,
            isPublished
        } = req.body;


        if (
            !title ||
            !slug ||
            !description ||
            !category ||
            !topic ||
            !difficulty
        ) {
            return res.status(400).json({
                message:
                    "Title, slug, description, category, topic and difficulty are required"
            });
        }


        // CHECK CATEGORY
        const existingCategory =
            await Category.findById(category);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }


        // CHECK TOPIC
        const existingTopic =
            await Topic.findById(topic);

        if (!existingTopic) {
            return res.status(404).json({
                message: "Topic not found"
            });
        }


        // CHECK TOPIC BELONGS TO CATEGORY
        if (
            existingTopic.category.toString() !==
            category.toString()
        ) {
            return res.status(400).json({
                message:
                    "Topic does not belong to this category"
            });
        }


        // CHECK COMPANIES
        if (companies && companies.length > 0) {

            const companyCount =
                await Company.countDocuments({
                    _id: { $in: companies }
                });

            if (companyCount !== companies.length) {
                return res.status(404).json({
                    message:
                        "One or more companies not found"
                });
            }
        }


        // CHECK DUPLICATE SLUG
        const existingQuestion =
            await Question.findOne({ slug });

        if (existingQuestion) {
            return res.status(409).json({
                message: "Question already exists"
            });
        }


        // CREATE QUESTION
        const question = await Question.create({
            title,
            slug,
            description,
            category,
            topic,
            difficulty,
            companies,
            years,
            questionType,
            options,
            answer,
            explanation,
            solution,
            tags,
            source,
            sourceType,
            isFrequentlyAsked,
            isPublished:true
        });


        const populatedQuestion =
            await Question.findById(question._id)
                .populate("category", "name slug")
                .populate("topic", "name slug")
                .populate("companies", "name slug");


        res.status(201).json({
            message: "Question created successfully",
            question: populatedQuestion
        });

    } catch (error) {

        res.status(500).json({
            message: "Error creating question",
            error: error.message
        });

    }
};



// GET ALL QUESTIONS
export const getQuestions = async (req, res) => {
    try {
        const {
            difficulty,
            section,
            topic,
            company,
            category,
            search,
            page = 1,
            limit = 20
        } = req.query;

        const filter = {
            isPublished: true
        };

        if (difficulty) {
            filter.difficulty = difficulty;
        }

        if (section) {
            filter.section = section;
        }

        if (topic) {
            filter.topic = topic;
        }

        if (company) {
            filter.companies = company;
        }

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    tags: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const pageNumber = Math.max(1, Number(page));
        const limitNumber = Math.min(
            100,
            Math.max(1, Number(limit))
        );

        const skip =
            (pageNumber - 1) * limitNumber;

        const questions = await Question.find(filter)
            .populate("category", "name slug")
            .populate("section", "name slug order")
            .populate("topic", "name slug order")
            .populate(
                "companies",
                "name slug logo type"
            )
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limitNumber)
            .lean();

        const totalQuestions =
            await Question.countDocuments(filter);

        const totalPages = Math.ceil(
            totalQuestions / limitNumber
        );

        res.status(200).json({
            success: true,

            questions,

            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalQuestions,
                totalPages
            }
        });

    } catch (error) {

        console.error(
            "Get questions error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch questions"
        });
    }
};


// GET SINGLE QUESTION
export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findOne({
            _id: req.params.id,
            isPublished: true
        })
            .select("-hiddenTestCases")
            .populate("category", "name slug")
            .populate("section", "name slug order")
            .populate("topic", "name slug order")
            .populate("companies", "name slug logo type")
            .lean();

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        res.status(200).json({
            success: true,
            question
        });

    } catch (error) {
        console.error("Get question by ID error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch question",
            error: error.message
        });
    }
};


// GET QUESTIONS BY CATEGORY
export const getQuestionsByCategory = async (req, res) => {
    try {

        const questions =
            await Question.find({
                category: req.params.categoryId
            })
                .populate("category", "name slug")
                .populate("topic", "name slug")
                .populate("companies", "name slug")
                .sort({
                    createdAt: -1
                });


        res.status(200).json({
            count: questions.length,
            questions
        });

    } catch (error) {

        res.status(500).json({
            message:
                "Error fetching questions by category",
            error: error.message
        });

    }
};



// GET QUESTIONS BY TOPIC
export const getQuestionsByTopic = async (req, res) => {
    try {

        const questions =
            await Question.find({
                topic: req.params.topicId
            })
                .populate("category", "name slug")
                .populate("topic", "name slug")
                .populate("companies", "name slug")
                .sort({
                    createdAt: -1
                });


        res.status(200).json({
            count: questions.length,
            questions
        });

    } catch (error) {

        res.status(500).json({
            message:
                "Error fetching questions by topic",
            error: error.message
        });

    }
};



// UPDATE QUESTION
export const updateQuestion = async (req, res) => {
    try {

        const {
            title,
            slug,
            description,
            category,
            topic,
            difficulty,
            companies,
            years,
            questionType,
            options,
            answer,
            explanation,
            solution,
            tags,
            source,
            sourceType,
            isFrequentlyAsked,
            isPublished
        } = req.body;


        // CHECK CATEGORY
        if (category) {

            const existingCategory =
                await Category.findById(category);

            if (!existingCategory) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }
        }


        // CHECK TOPIC
        if (topic) {

            const existingTopic =
                await Topic.findById(topic);

            if (!existingTopic) {
                return res.status(404).json({
                    message: "Topic not found"
                });
            }


            if (
                category &&
                existingTopic.category.toString() !==
                category.toString()
            ) {
                return res.status(400).json({
                    message:
                        "Topic does not belong to this category"
                });
            }
        }


        // CHECK COMPANIES
        if (companies && companies.length > 0) {

            const companyCount =
                await Company.countDocuments({
                    _id: { $in: companies }
                });

            if (companyCount !== companies.length) {
                return res.status(404).json({
                    message:
                        "One or more companies not found"
                });
            }
        }


        const question =
            await Question.findByIdAndUpdate(
                req.params.id,
                {
                    title,
                    slug,
                    description,
                    category,
                    topic,
                    difficulty,
                    companies,
                    years,
                    questionType,
                    options,
                    answer,
                    explanation,
                    solution,
                    tags,
                    source,
                    sourceType,
                    isFrequentlyAsked,
                    isPublished
                },
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate("category", "name slug")
                .populate("topic", "name slug")
                .populate("companies", "name slug");


        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }


        res.status(200).json({
            message:
                "Question updated successfully",
            question
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating question",
            error: error.message
        });

    }
};



// DELETE QUESTION
export const deleteQuestion = async (req, res) => {
    try {

        const question =
            await Question.findByIdAndDelete(
                req.params.id
            );


        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }


        res.status(200).json({
            message:
                "Question deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting question",
            error: error.message
        });

    }
};