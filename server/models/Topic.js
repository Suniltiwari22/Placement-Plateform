import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
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
            ref: "Category",
            required: true
        },

        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DSASection",
            default: null
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
    {
        timestamps: true
    }
);

topicSchema.index(
    { name: 1, category: 1, section: 1 },
    { unique: true }
);

topicSchema.index(
    { slug: 1, category: 1, section: 1 },
    { unique: true }
);

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;