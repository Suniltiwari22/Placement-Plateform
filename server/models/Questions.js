import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        // ==========================================
        // BASIC QUESTION INFORMATION
        // ==========================================

        title: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        // ==========================================
        // CATEGORY / DSA STRUCTURE
        // ==========================================

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DSASection",
            default: null
        },

        topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true
        },

        // ==========================================
        // DIFFICULTY
        // ==========================================

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true
        },

        // ==========================================
        // COMPANIES
        // ==========================================

        companies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company"
            }
        ],

        years: [
            {
                type: Number
            }
        ],

        // ==========================================
        // QUESTION TYPE
        // ==========================================

        questionType: {
            type: String,
            enum: ["mcq", "coding", "interview", "theory"],
            default: "coding"
        },
        executionMode: {
            type: String,
            enum: ["function", "stdin"],
            default: "function"
        },
        functionName: {
            type: String,
            default: ""
        },
        driverCode: {
            cpp: { type: String, default: "" },
            java: { type: String, default: "" },
            python: { type: String, default: "" },
            javascript: { type: String, default: "" }
        },
        executionMode: {
            type: String,
            enum: ["function", "stdin"],
            default: "stdin"
        },




        // ==========================================
        // MCQ
        // ==========================================

        options: [
            {
                type: String
            }
        ],

        answer: {
            type: String,
            default: ""
        },

        explanation: {
            type: String,
            default: ""
        },


        // ==========================================
        // SOLUTIONS
        // ==========================================

        solution: {
            cpp: {
                type: String,
                default: ""
            },

            java: {
                type: String,
                default: ""
            },

            python: {
                type: String,
                default: ""
            },

            javascript: {
                type: String,
                default: ""
            }
        },

        // ==========================================
        // STARTER CODE
        // ==========================================

        starterCode: {
            cpp: {
                type: String,
                default: ""
            },

            java: {
                type: String,
                default: ""
            },

            python: {
                type: String,
                default: ""
            },

            javascript: {
                type: String,
                default: ""
            }
        },
        driverCode: {
            cpp: { type: String, default: "" },
            java: { type: String, default: "" },
            python: { type: String, default: "" },
            javascript: { type: String, default: "" }
        },

        // ==========================================
        // EXAMPLES
        // ==========================================

        examples: [
            {
                input: {
                    type: String,
                    default: ""
                },

                output: {
                    type: String,
                    default: ""
                },

                explanation: {
                    type: String,
                    default: ""
                }
            }
        ],

        // ==========================================
        // CONSTRAINTS
        // ==========================================

        constraints: [
            {
                type: String
            }
        ],

        // ==========================================
        // HIDDEN TEST CASES
        // IMPORTANT:
        // These must NEVER be sent to frontend.
        // ==========================================

        hiddenTestCases: [
            {
                input: {
                    type: String,
                    required: true
                },

                output: {
                    type: String,
                    required: true
                }
            }
        ],

        // ==========================================
        // TAGS
        // ==========================================

        tags: [
            {
                type: String
            }
        ],

        // ==========================================
        // SOURCE
        // ==========================================

        source: {
            type: String,
            default: ""
        },

        sourceType: {
            type: String,
            enum: [
                "official",
                "candidate-reported",
                "curated",
                "practice"
            ],
            default: "curated"
        },

        // ==========================================
        // FREQUENTLY ASKED
        // ==========================================

        isFrequentlyAsked: {
            type: Boolean,
            default: false
        },

        // ==========================================
        // PUBLISHED
        // ==========================================

        isPublished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Question = mongoose.model(
    "Question",
    questionSchema
);

export default Question;