
import mongoose from "mongoose";

const aptitudeQuestionSchema = new mongoose.Schema(
    {
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
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AptitudeCategory",
            required: true
        },
        topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AptitudeTopic",
            required: true
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true
        },
        options: [
            {
                key: {
                    type: String,
                    enum: ["A", "B", "C", "D"],
                    required: true
                },
                text: {
                    type: String,
                    required: true,
                    trim: true
                }
            }
        ],
        correctAnswer: {
            type: String,
            enum: ["A", "B", "C", "D"],
            required: true
        },
        explanation: {
            type: String,
            default: ""
        },
        tags: [
            {
                type: String,
                trim: true
            }
        ],
        source: {
            type: String,
            default: ""
        },
        isPublished: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

aptitudeQuestionSchema.path("options").validate(
    function (options) {
        return (
            options.length === 4 &&
            new Set(options.map(option => option.key)).size === 4 &&
            ["A", "B", "C", "D"].every(key =>
                options.some(option => option.key === key)
            )
        );
    },
    "Exactly four options with keys A, B, C and D are required"
);

const AptitudeQuestion = mongoose.model(
    "AptitudeQuestion",
    aptitudeQuestionSchema
);

export default AptitudeQuestion;
