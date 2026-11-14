
import mongoose from "mongoose";

const aptitudeTopicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AptitudeCategory",
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        order: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

aptitudeTopicSchema.index(
    { name: 1, category: 1 },
    { unique: true }
);

aptitudeTopicSchema.index(
    { slug: 1, category: 1 },
    { unique: true }
);

const AptitudeTopic = mongoose.model(
    "AptitudeTopic",
    aptitudeTopicSchema
);

export default AptitudeTopic;
